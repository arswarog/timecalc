import { PositionalError } from '../common';
import { TokenType } from '../lexer';
import { BinaryExpressionNode, BracketedExpressionNode, ValueNode } from '../nodes';

import { ParserContext } from './context';
import { Parser } from './parser.type.ts';

export function createParseBracketedExpression(parser: Parser) {
    return (ctx: ParserContext): BracketedExpressionNode | BinaryExpressionNode | ValueNode => {
        if (ctx.getCurrentToken().type === TokenType.Space) {
            ctx.next();
        }

        if (ctx.getCurrentToken().type !== TokenType.OpeningBracket) {
            return parser.binaryExpression(ctx);
        }

        const openingBracket = ctx.getCurrentToken();

        ctx.next();

        if (ctx.getCurrentToken().type === TokenType.Space) {
            ctx.next();
        }

        const expression = parser.binaryExpression(ctx);

        if (ctx.getCurrentToken().type === TokenType.Space) {
            ctx.next();
        }

        const closingBracket = ctx.getCurrentToken();

        if (closingBracket.type !== TokenType.ClosingBracket) {
            throw new PositionalError(
                `Expected closing bracket, got "${ctx.getCurrentToken().text}"`,
                ctx.getCurrentToken(),
            );
        }

        ctx.next();

        return new BracketedExpressionNode(expression, openingBracket, closingBracket);
    };
}
