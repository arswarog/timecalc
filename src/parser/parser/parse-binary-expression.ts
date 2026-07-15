import { Token, TokenType } from '../lexer';
import { BinaryExpressionNode, BracketedExpressionNode, ValueNode } from '../nodes';

import { ParserContext } from './context';
import { Parser } from './parser.type.ts';

export function createParseBinaryExpression(parser: Parser) {
    return (
        ctx: ParserContext,
        precedence = 0,
    ): BracketedExpressionNode | BinaryExpressionNode | ValueNode => {
        if (ctx.getCurrentToken().type === TokenType.Space) {
            ctx.next();
        }

        let left =
            ctx.getCurrentToken().type === TokenType.OpeningBracket
                ? parser.bracketedExpression(ctx)
                : parser.value(ctx);

        if (ctx.getCurrentToken().type === TokenType.Space) {
            ctx.next();
        }

        while (!ctx.isEnd()) {
            const operator = ctx.getCurrentToken();

            if (
                ![
                    TokenType.PlusOperation,
                    TokenType.MinusOperation,
                    TokenType.MultiplyOperation,
                    TokenType.DivideOperation,
                ].includes(operator.type)
            ) {
                break;
            }

            const operatorPrecedence = getPrecedence(operator);
            if (operatorPrecedence < precedence) break;

            ctx.next();

            if (ctx.getCurrentToken().type === TokenType.Space) {
                ctx.next();
            }

            const right = parser.binaryExpression(ctx, operatorPrecedence + 1);

            left = new BinaryExpressionNode(operator, left, right);
        }

        return left;
    };
}

function getPrecedence(operator: Token): number {
    switch (operator.type) {
        case TokenType.PlusOperation:
        case TokenType.MinusOperation:
            return 1;
        case TokenType.MultiplyOperation:
        case TokenType.DivideOperation:
            return 2;
        default:
            throw new Error(`Expected operation, got "${operator.type}"`);
    }
}
