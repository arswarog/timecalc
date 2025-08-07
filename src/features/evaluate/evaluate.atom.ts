import { atom } from '@reatom/framework';

import { expressionAtom } from '@src/entities/expression';
import { analyzeCode, HighlightedError, parse, PositionalError, ValueType } from '@src/parser';

import { timeValueToText } from './time-value-to-text';

export const astParsingErrorAtom = atom<HighlightedError | null>(null, 'astParsingErrorAtom');
export const evaluationErrorAtom = atom<HighlightedError | null>(null, 'evaluationErrorAtom');

export const tokensAtom = atom((ctx) => {
    const expression = ctx.spy(expressionAtom);

    return analyzeCode(expression);
}, 'tokensAtom');

export const astAtom = atom((ctx) => {
    const expression = ctx.spy(expressionAtom);
    try {
        const ast = parse(expression);
        astParsingErrorAtom(ctx, null);
        return ast;
    } catch (error) {
        if (error instanceof HighlightedError) {
            astParsingErrorAtom(ctx, error);
        } else {
            astParsingErrorAtom(
                ctx,
                new HighlightedError(
                    new PositionalError(
                        error &&
                        typeof error === 'object' &&
                        'message' in error &&
                        typeof error.message === 'string'
                            ? error.message
                            : 'Unknown error',
                        {
                            start: 0,
                            end: expression.length,
                        },
                    ),
                    expression,
                ),
            );
            console.error(error);
        }
        return null;
    }
}, 'astAtom');

export const evaluateAtom = atom((ctx) => {
    const ast = ctx.spy(astAtom);
    if (!ast) {
        return null;
    }
    try {
        const result = ast.evaluate();

        evaluationErrorAtom(ctx, null);

        return {
            ...result,
            expression: ctx.spy(expressionAtom),
        };
    } catch (error) {
        if (error instanceof HighlightedError) {
            evaluationErrorAtom(ctx, error);
            console.error(error);
            return null;
        }
        return null;
    }
}, 'evaluationAtom');

let lastOutput: string = '';

export interface ResultAtom {
    result: string;
    invalidExpression: boolean;
    runtimeError: string;
}

export const resultAtom = atom<ResultAtom>((ctx) => {
    const evaluation = ctx.spy(evaluateAtom);
    const astParsingError = ctx.spy(astParsingErrorAtom);
    const evaluationError = ctx.spy(evaluationErrorAtom);

    if (evaluation === null) {
        return {
            result: lastOutput,
            invalidExpression: !!astParsingError,
            runtimeError: evaluationError ? evaluationError.originalMessage : '',
        };
    }

    let output = evaluation.value.toString();

    if (evaluation.type === ValueType.Time) {
        output = timeValueToText(evaluation.value);
    }

    lastOutput = output;
    return {
        result: lastOutput,
        invalidExpression: false,
        runtimeError: '',
    };
}, 'resultAtom');
