import { PositionalError } from '../common';
import { TokenType } from '../lexer';
import { ValueNode } from '../nodes';

import { ParserContext } from './context';
import { Parser } from './parser.type.ts';

export function createParseValue(_parser: Parser) {
    return (ctx: ParserContext): ValueNode => {
        return parseSingleValue(ctx);
    };
}

function parseNumericValue(ctx: ParserContext): ValueNode {
    const valueToken = ctx.getCurrentToken();

    if (valueToken.type !== TokenType.NumericLiteral) {
        throw new PositionalError(`Expected value, got "${valueToken.text}"`, valueToken);
    }

    ctx.next();

    return new ValueNode({
        integer: valueToken,
    });
}

function parseSingleValue(ctx: ParserContext): ValueNode {
    const numericValue = parseNumericValue(ctx);

    if (ctx.getCurrentTokenIfTypeAndNext(TokenType.HourLiteral)) {
        return new ValueNode({
            hours: numericValue,
            additional: [ctx.getNext(-1)],
        });
    }

    if (ctx.getCurrentTokenIfTypeAndNext(TokenType.MinuteLiteral)) {
        return new ValueNode({
            minutes: numericValue,
            additional: [ctx.getNext(-1)],
        });
    }

    if (ctx.getCurrentTokenIfTypeAndNext(TokenType.SecondLiteral)) {
        return new ValueNode({
            seconds: numericValue,
            additional: [ctx.getNext(-1)],
        });
    }

    return numericValue;
}
