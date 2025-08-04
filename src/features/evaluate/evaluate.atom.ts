import { atom } from '@reatom/framework';

import { expressionAtom } from '@src/entities/expression';
import { analyzeCode, HighlightedError, parse, PositionalError } from '@src/parser';

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
    const expression = ctx.spy(expressionAtom);
    const ast = ctx.spy(astAtom);
    if (!ast) {
        return null;
    }
    try {
        const result = ast.evaluate();

        evaluationErrorAtom(ctx, null);

        return {
            value: result,
            expression: ctx.spy(expressionAtom),
        };
    } catch (error) {
        evaluationErrorAtom(
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
        return null;
    }
}, 'evaluationAtom');

let lastResult: string = '';

export const resultAtom = atom((ctx) => {
    const evaluation = ctx.spy(evaluateAtom);
    if (evaluation === null) {
        return {
            result: lastResult,
            error: true,
        };
    }

    lastResult = evaluation.value.toString();
    return {
        result: lastResult,
        error: false,
    };
}, 'resultAtom');
