import { describe, expect, it } from 'vitest';

import { HighlightedError, PositionalError } from '../common';
import { createToken, TokenType } from '../lexer';
import { BinaryExpressionNode, BracketedExpressionNode, RootNode, ValueNode } from '../nodes';
import { parse } from '../parser';

describe('Parser / BracketedExpression', () => {
    it('bracketed expression', () => {
        // Arrange
        const source = '5× ( 12+34)';

        // Act
        const ast = parse(source);

        // Assert
        expect(ast).toEqual(
            new RootNode(
                new BinaryExpressionNode(
                    createToken(TokenType.MultiplyOperation, '×', 1),
                    new ValueNode(createToken(TokenType.NumericLiteral, '5', 0)),
                    new BracketedExpressionNode(
                        new BinaryExpressionNode(
                            createToken(TokenType.PlusOperation, '+', 7),
                            new ValueNode(createToken(TokenType.NumericLiteral, '12', 5)),
                            new ValueNode(createToken(TokenType.NumericLiteral, '34', 8)),
                        ),
                        createToken(TokenType.OpeningBracket, '(', 3),
                        createToken(TokenType.ClosingBracket, ')', 10),
                    ),
                ),
                source,
            ),
        );
    });
    it('nested brackets', () => {
        // Arrange
        const source = ' (12+(34×5 ))';

        // Act
        const ast = parse(source);

        // Assert
        expect(ast).toEqual(
            new RootNode(
                new BracketedExpressionNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.PlusOperation, '+', 4),
                        new ValueNode(createToken(TokenType.NumericLiteral, '12', 2)),
                        new BracketedExpressionNode(
                            new BinaryExpressionNode(
                                createToken(TokenType.MultiplyOperation, '×', 8),
                                new ValueNode(createToken(TokenType.NumericLiteral, '34', 6)),
                                new ValueNode(createToken(TokenType.NumericLiteral, '5', 9)),
                            ),
                            createToken(TokenType.OpeningBracket, '(', 5),
                            createToken(TokenType.ClosingBracket, ')', 11),
                        ),
                    ),
                    createToken(TokenType.OpeningBracket, '(', 1),
                    createToken(TokenType.ClosingBracket, ')', 12),
                ),

                source,
            ),
        );
    });
    it('single bracketed expression', () => {
        // Arrange
        const source = '(12)';

        // Act
        const ast = parse(source);

        // Assert
        expect(ast).toEqual(
            new RootNode(
                new BracketedExpressionNode(
                    new ValueNode(createToken(TokenType.NumericLiteral, '12', 1)),
                    createToken(TokenType.OpeningBracket, '(', 0),
                    createToken(TokenType.ClosingBracket, ')', 3),
                ),
                source,
            ),
        );
    });
    it('brackets expression as a first operand', () => {
        // Arrange
        const source = ' ( 1 + 1 ) × 5';

        // Act
        const ast = parse(source);

        // Assert
        expect(ast).toEqual(
            new RootNode(
                new BinaryExpressionNode(
                    createToken(TokenType.MultiplyOperation, '×', 11),
                    new BracketedExpressionNode(
                        new BinaryExpressionNode(
                            createToken(TokenType.PlusOperation, '+', 5),
                            new ValueNode(createToken(TokenType.NumericLiteral, '1', 3)),
                            new ValueNode(createToken(TokenType.NumericLiteral, '1', 7)),
                        ),
                        createToken(TokenType.OpeningBracket, '(', 1),
                        createToken(TokenType.ClosingBracket, ')', 9),
                    ),
                    new ValueNode(createToken(TokenType.NumericLiteral, '5', 13)),
                ),
                source,
            ),
        );
    });
    it('failed: expected closing bracket', () => {
        // Arrange
        const source = '(12+34×5';

        // Act & Assert
        expect(() => parse(source)).toThrowError(
            new HighlightedError(
                new PositionalError('Expected closing bracket, got "[EOF]"', {
                    start: 8,
                    end: 8,
                }),
                source,
            ),
        );
    });
    it('failed: unexpected closing bracket', () => {
        // Arrange
        const source = '(12+34×5))';

        // Act & Assert
        expect(() => parse(source)).toThrowError(
            new HighlightedError(
                new PositionalError('Unexpected token ")" (ClosingBracket)', {
                    start: 9,
                    end: 10,
                }),
                source,
            ),
        );
    });
});
