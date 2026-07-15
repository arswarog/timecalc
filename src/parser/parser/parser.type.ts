import {
    BinaryExpressionNode,
    BracketedExpressionNode,
    ParserContext,
    ValueNode,
} from '@src/parser';

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
