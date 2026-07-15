import { describe, expect, it } from 'vitest';

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
                new RootNode(new ValueNode(createToken(TokenType.NumericLiteral, '12', 0)), source),
            );
        });
    });
    describe('time', () => {
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
