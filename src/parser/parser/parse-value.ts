import { PositionalError } from '../common';
import { TokenType } from '../lexer';
import { ValueNode } from '../nodes';

import { ParserContext } from './context';
import { Parser } from './parser.type.ts';

export function createParseValue(_parser: Parser) {
    return (ctx: ParserContext): ValueNode => {
        const value = ctx.getCurrentToken();

        if (value.type !== TokenType.NumericLiteral) {
            throw new PositionalError(`Expected value, got "${value.text}"`, value);
        }

        ctx.next();

        const unit = ctx.getCurrentToken();

        if (
            [TokenType.SecondLiteral, TokenType.MinuteLiteral, TokenType.HourLiteral].includes(
                unit.type,
            )
        ) {
            ctx.next();
            return new ValueNode(value, unit);
        } else {
            return new ValueNode(value);
        }
    };
}
