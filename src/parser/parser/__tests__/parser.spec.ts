import { describe, expect, it } from 'vitest';

import { HighlightedError, PositionalError } from '../../common';
import { createToken, TokenType } from '../../lexer';
import {
    BinaryExpressionNode,
    BracketedExpressionNode,
    RootNode,
    ValueNode,
    ValueType,
} from '../../nodes';
import { parse } from '../parser';

describe('Parser', () => {
    describe('calc', () => {
        it('12', () => {
            // Arrange
            const source = '12';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(new ValueNode(createToken(TokenType.NumericLiteral, '12', 0)), source),
            );
        });
        it('12+34', () => {
            // Arrange
            const source = '12+34';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.PlusOperation, '+', 2),
                        new ValueNode(createToken(TokenType.NumericLiteral, '12', 0)),
                        new ValueNode(createToken(TokenType.NumericLiteral, '34', 3)),
                    ),
                    source,
                ),
            );
        });
        it('12-5+34', () => {
            // Arrange
            const source = '12-5+34';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.PlusOperation, '+', 4),
                        new BinaryExpressionNode(
                            createToken(TokenType.MinusOperation, '-', 2),
                            new ValueNode(createToken(TokenType.NumericLiteral, '12', 0)),
                            new ValueNode(createToken(TokenType.NumericLiteral, '5', 3)),
                        ),
                        new ValueNode(createToken(TokenType.NumericLiteral, '34', 5)),
                    ),
                    source,
                ),
            );
        });
        it('12×5+34', () => {
            // Arrange
            const source = '12×5+34';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.PlusOperation, '+', 4),
                        new BinaryExpressionNode(
                            createToken(TokenType.MultiplyOperation, '×', 2),
                            new ValueNode(createToken(TokenType.NumericLiteral, '12', 0)),
                            new ValueNode(createToken(TokenType.NumericLiteral, '5', 3)),
                        ),
                        new ValueNode(createToken(TokenType.NumericLiteral, '34', 5)),
                    ),
                    source,
                ),
            );
        });
        it('12+35/5', () => {
            // Arrange
            const source = '12+35/5';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.PlusOperation, '+', 2),
                        new ValueNode(createToken(TokenType.NumericLiteral, '12', 0)),
                        new BinaryExpressionNode(
                            createToken(TokenType.DivideOperation, '/', 5),
                            new ValueNode(createToken(TokenType.NumericLiteral, '35', 3)),
                            new ValueNode(createToken(TokenType.NumericLiteral, '5', 6)),
                        ),
                    ),
                    source,
                ),
            );
        });
        it('failed: expected value', () => {
            // Arrange
            const source = '12+35/x';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Expected value, got "x"', {
                        start: 6,
                        end: 7,
                    }),
                    source,
                ),
            );
        });
        it('failed: unexpected token', () => {
            // Arrange
            const source = '12+35xx';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Unexpected token "xx" (UnknownSymbol)', {
                        start: 5,
                        end: 7,
                    }),
                    source,
                ),
            );
        });
        it('failed: unexpected end of file', () => {
            // Arrange
            const source = '12+35/';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Expected value, got "[EOF]"', {
                        start: 6,
                        end: 6,
                    }),
                    source,
                ),
            );
        });
    });
    describe('time', () => {
        describe('values', () => {
            it('23s', () => {
                // Arrange
                const source = '23s';

                // Act
                const ast = parse(source);
                const result = ast.evaluate();

                // Assert
                expect(ast).toEqual(
                    new RootNode(
                        new ValueNode(
                            createToken(TokenType.NumericLiteral, '23', 0),
                            createToken(TokenType.SecondLiteral, 's', 2),
                        ),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 23,
                });
            });
            it('2m', () => {
                // Arrange
                const source = '2m';

                // Act
                const ast = parse(source);
                const result = ast.evaluate();

                // Assert
                expect(ast).toEqual(
                    new RootNode(
                        new ValueNode(
                            createToken(TokenType.NumericLiteral, '2', 0),
                            createToken(TokenType.MinuteLiteral, 'm', 1),
                        ),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 120,
                });
            });
            it('3h', () => {
                // Arrange
                const source = '3h';

                // Act
                const ast = parse(source);
                const result = ast.evaluate();

                // Assert
                expect(ast).toEqual(
                    new RootNode(
                        new ValueNode(
                            createToken(TokenType.NumericLiteral, '3', 0),
                            createToken(TokenType.HourLiteral, 'h', 1),
                        ),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 10800,
                });
            });
        });
    });
    describe('spaces', () => {
        it('spaces in the middle', () => {
            // Arrange
            const source = ' 12 + 35 / 5 ';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.PlusOperation, '+', 4),
                        new ValueNode(createToken(TokenType.NumericLiteral, '12', 1)),
                        new BinaryExpressionNode(
                            createToken(TokenType.DivideOperation, '/', 9),
                            new ValueNode(createToken(TokenType.NumericLiteral, '35', 6)),
                            new ValueNode(createToken(TokenType.NumericLiteral, '5', 11)),
                        ),
                    ),
                    source,
                ),
            );
        });
    });
    describe('brackets', () => {
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
});
