import { describe, expect, it } from 'vitest';

import { HighlightedError, PositionalError } from '../common';
import { createToken, TokenType } from '../lexer';
import { RootNode, ValueNode, ValueType } from '../nodes';

import { parse } from './parser';

describe('Parser / Value', () => {
    describe('number', () => {
        it('12', () => {
            // Arrange
            const source = '12';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new ValueNode({
                        integer: createToken(TokenType.NumericLiteral, '12', 0),
                    }),
                    source,
                ),
            );
        });
        it('3.14', () => {
            // Arrange
            const source = '3.14';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new ValueNode({
                        integer: createToken(TokenType.NumericLiteral, '3', 0),
                        fractional: createToken(TokenType.NumericLiteral, '14', 2),
                    }),
                    source,
                ),
            );
        });
        it('42.', () => {
            // Arrange
            const source = '42.';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new ValueNode({
                        integer: createToken(TokenType.NumericLiteral, '42', 0),
                        additional: [createToken(TokenType.Dot, '.', 2)],
                    }),
                    source,
                ),
            );
            expect(ast.expression).toMatchObject({
                start: 0,
                end: 3,
            });
        });
        it('789.0', () => {
            // Arrange
            const root = parse('789.0');

            // Act
            const result = root.evaluate();

            // Assert
            expect(result).toEqual({
                type: ValueType.Number,
                value: 789,
            });
        });
        it('failed: лишние точки в дробном числе с целой частью', () => {
            // Arrange
            const source = '12.0.0';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Unexpected token "." (Dot)', {
                        start: 4,
                        end: 4,
                    }),
                    source,
                ),
            );
        });
        it('failed: лишние точки в дробном числе', () => {
            // Arrange
            const source = '0..';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Unexpected token "." (Dot)', {
                        start: 2,
                        end: 2,
                    }),
                    source,
                ),
            );
        });
        it('failed: первая точка', () => {
            // Arrange
            const source = '.0';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Expected value\nExpected token NumericLiteral, got Dot', {
                        start: 0,
                        end: 1,
                    }),
                    source,
                ),
            );
        });
    });
    describe('time', () => {
        describe('single values', () => {
            it('23s', () => {
                // Arrange
                const source = '23s';

                // Act
                const ast = parse(source);
                const result = ast.evaluate();

                // Assert
                expect(ast).toEqual(
                    new RootNode(
                        new ValueNode({
                            seconds: createToken(TokenType.NumericLiteral, '23', 0),
                            additional: [createToken(TokenType.SecondLiteral, 's', 2)],
                        }),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 23,
                });
            });
            it('23.12s', () => {
                // Arrange
                const source = '23.12s';

                // Act
                const ast = parse(source);
                const result = ast.evaluate();

                // Assert
                expect(ast).toEqual(
                    new RootNode(
                        new ValueNode({
                            seconds: new ValueNode({
                                integer: createToken(TokenType.NumericLiteral, '23', 0),
                                fractional: createToken(TokenType.NumericLiteral, '12', 3),
                            }),
                            additional: [createToken(TokenType.SecondLiteral, 's', 5)],
                        }),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 23.12,
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
                        new ValueNode({
                            minutes: createToken(TokenType.NumericLiteral, '2', 0),
                            additional: [createToken(TokenType.MinuteLiteral, 'm', 1)],
                        }),
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
                        new ValueNode({
                            hours: createToken(TokenType.NumericLiteral, '3', 0),
                            additional: [createToken(TokenType.HourLiteral, 'h', 1)],
                        }),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 10800,
                });
            });
            it('3.6h', () => {
                // Arrange
                const source = '3.6h';

                // Act
                const ast = parse(source);
                const result = ast.evaluate();

                // Assert
                expect(ast).toEqual(
                    new RootNode(
                        new ValueNode({
                            hours: new ValueNode({
                                integer: createToken(TokenType.NumericLiteral, '3', 0),
                                fractional: createToken(TokenType.NumericLiteral, '6', 2),
                            }),
                            additional: [createToken(TokenType.HourLiteral, 'h', 3)],
                        }),
                        source,
                    ),
                );
                expect(result).toEqual({
                    type: ValueType.Time,
                    value: 12960,
                });
            });
        });
    });
});
