import { describe, expect, it } from 'vitest';
import { analyzeCode, TokenType } from '../../lexer';
import { parse } from '../parser';
import { BinaryExpressionNode, RootNode, ValueNode } from '../../nodes';
import { createToken } from '../../lexer';

describe('Parser', () => {
    describe('common', () => {
        it('12', () => {
            // Arrange
            const source = '12';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(new RootNode(new ValueNode('12'), source));
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
                        createToken(TokenType.Operation, '+', 2),
                        new ValueNode('12'),
                        new ValueNode('34'),
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
                        createToken(TokenType.Operation, '+', 4),
                        new BinaryExpressionNode(
                            createToken(TokenType.Operation, '-', 2),
                            new ValueNode('12'),
                            new ValueNode('5'),
                        ),
                        new ValueNode('34'),
                    ),
                    source,
                ),
            );
        });
        it('12*5+34', () => {
            // Arrange
            const source = '12*5+34';

            // Act
            const ast = parse(source);

            // Assert
            expect(ast).toEqual(
                new RootNode(
                    new BinaryExpressionNode(
                        createToken(TokenType.Operation, '+', 4),
                        new BinaryExpressionNode(
                            createToken(TokenType.Operation, '*', 2),
                            new ValueNode('12'),
                            new ValueNode('5'),
                        ),
                        new ValueNode('34'),
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
                        createToken(TokenType.Operation, '+', 2),
                        new ValueNode('12'),
                        new BinaryExpressionNode(
                            createToken(TokenType.Operation, '/', 5),
                            new ValueNode('35'),
                            new ValueNode('5'),
                        ),
                    ),
                    source,
                ),
            );
        });
        it('failed: expected value', () => {
            // Arrange
            const source = '12+35/d';

            // Act & Assert
            expect(() => parse(source)).toThrowError(/Expected value, got "d"/);
        });
        it('failed: unexpected token', () => {
            // Arrange
            const source = '12+35d';

            // Act & Assert
            expect(() => parse(source)).toThrowError(/Unexpected token: "d"/);
        });
    });
});
