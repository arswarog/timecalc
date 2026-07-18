import { PositionalError } from '../common';
import { Token, TokenType } from '../lexer';
import { ValueNode } from '../nodes';

import { ParserContext } from './context';
import { Parser } from './parser.type.ts';

export function createParseValue(_parser: Parser) {
    return (ctx: ParserContext): ValueNode => {
        let token = ctx.getCurrentToken();

        if (token.type !== TokenType.NumericLiteral && token.type !== TokenType.Dot) {
            throw new PositionalError(`Expected value, got "${token.text}"`, token);
        }

        let beforeDot: Token | undefined = undefined;
        let dot: Token | undefined = undefined;
        let afterDot: Token | undefined = undefined;

        if (token.type === TokenType.NumericLiteral) {
            beforeDot = token;

            ctx.next();
            token = ctx.getCurrentToken();
        }

        if (token.type === TokenType.Dot) {
            dot = token;

            ctx.next();
            token = ctx.getCurrentToken();
        }

        if (token.type === TokenType.NumericLiteral) {
            afterDot = token;

            ctx.next();
        }

        const tokens = [beforeDot, dot, afterDot].filter((token): token is Token => !!token);

        const unit = ctx.getCurrentToken();

        if (
            [TokenType.SecondLiteral, TokenType.MinuteLiteral, TokenType.HourLiteral].includes(
                unit.type,
            )
        ) {
            ctx.next();
            return new ValueNode(tokens, unit);
        } else {
            return new ValueNode(tokens);
        }
    };
}
