import { HighlightedError, PositionalError } from '../common';
import { analyzeCode, Token, TokenType } from '../lexer';
import { RootNode } from '../nodes';

import { createContext } from './context';
import { createParseBinaryExpression } from './parse-binary-expression.ts';
import { createParseBracketedExpression } from './parse-bracketed-expression.ts';
import { createParseValue } from './parse-value.ts';
import { Parser } from './parser.type.ts';

const parser = {} as Parser;

parser.value = createParseValue(parser);
parser.bracketedExpression = createParseBracketedExpression(parser);
parser.binaryExpression = createParseBinaryExpression(parser);

export function parse(source: string): RootNode {
    try {
        return parseTokens(analyzeCode(source), source);
    } catch (e) {
        if (e instanceof PositionalError) {
            throw new HighlightedError(e, source);
        } else {
            throw e;
        }
    }
}

export function parseTokens(tokens: Token[], source: string): RootNode {
    // так как дальше мы будем мутировать массив токенов, клонируем его
    tokens = [...tokens];

    const ctx = createContext(tokens);

    const root = new RootNode(parser.binaryExpression(ctx), source);

    if (!ctx.isEnd()) {
        throw new PositionalError(
            `Unexpected token "${ctx.getCurrentToken().text}" (${TokenType[ctx.getCurrentToken().type]})`,
            ctx.getCurrentToken(),
        );
    }

    return root;
}
