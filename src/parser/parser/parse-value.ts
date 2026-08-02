import { PositionalError } from '../common';
import { TokenType } from '../lexer';
import { ValueNode } from '../nodes';

import { ParserContext } from './context';
import { Parser } from './parser.type.ts';

export function createParseValue(_parser: Parser) {
    return (ctx: ParserContext): ValueNode => {
        const valueToken = ctx.getCurrentToken();

        if (valueToken.type !== TokenType.NumericLiteral) {
            throw new PositionalError(`Expected value, got "${valueToken.text}"`, valueToken);
        }

        ctx.next();

        const unitToken = ctx.getCurrentToken();

        if (unitToken.type === TokenType.HourLiteral) {
            ctx.next();

            return new ValueNode({
                hours: valueToken,
            });
        }

        if (unitToken.type === TokenType.MinuteLiteral) {
            ctx.next();

            return new ValueNode({
                minutes: valueToken,
            });
        }

        if (unitToken.type === TokenType.SecondLiteral) {
            ctx.next();

            return new ValueNode({
                seconds: valueToken,
            });
        }

        return new ValueNode({
            integer: valueToken,
        });
    };
}
