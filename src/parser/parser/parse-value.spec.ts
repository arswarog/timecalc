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
                    new ValueNode([createToken(TokenType.NumericLiteral, '12', 0)]),
                    source,
                ),
            );
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
            const source = '.0.';

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
        it('failed: точки подряд', () => {
            // Arrange
            const source = '..';

            // Act & Assert
            expect(() => parse(source)).toThrowError(
                new HighlightedError(
                    new PositionalError('Unexpected token "." (Dot)', {
                        start: 1,
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
                        new ValueNode(
                            [createToken(TokenType.NumericLiteral, '23', 0)],
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
                            [createToken(TokenType.NumericLiteral, '2', 0)],
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
                            [createToken(TokenType.NumericLiteral, '3', 0)],
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
});
