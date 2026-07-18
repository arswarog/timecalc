import { BinaryExpressionNode, BracketedExpressionNode, ValueNode } from '../nodes';

import { ParserContext } from './context';

export interface Parser {
    value(ctx: ParserContext): BinaryExpressionNode | ValueNode;
    bracketedExpression(
        ctx: ParserContext,
    ): BracketedExpressionNode | BinaryExpressionNode | ValueNode;
    binaryExpression(
        ctx: ParserContext,
        precedence?: number,
    ): BracketedExpressionNode | BinaryExpressionNode | ValueNode;
}
