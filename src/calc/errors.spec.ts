import { beforeEach, describe, expect, it } from 'vitest';

import { ParserError } from './errors';
import { analyzeCode } from './lexer';
import { BinaryExpressionNode } from './nodes';
import { parse } from './parser';
import { createContext, SyntaxContext } from './parser/context';

describe('Errors', () => {
    describe('ParserError', () => {
        describe('fromCtx', () => {
            const tokens = analyzeCode('12 + 3 + 5');
            let ctx: SyntaxContext;

            beforeEach(() => {
                ctx = createContext(tokens);
            });

            it('отображение места ошибки в первом символе', () => {
                expect(() => {
                    throw ParserError.fromCtx('Unexpected token', ctx);
                }).throws('Unexpected token\n' + 'Line: 12 + 3 + 5\n' + '      ^');
            });
            it('отображение места ошибки в середине выражения', () => {
                ctx.next();
                ctx.next();
                ctx.next();

                expect(() => {
                    throw ParserError.fromCtx('Unexpected token', ctx);
                }).throws('Unexpected token\n' + 'Line: 12 + 3 + 5\n' + '          ^');
            });
        });
        describe('fromNode', () => {
            it('BinaryExpressionNode.operator', () => {
                const source = '15+5';

                const ast = parse(source);

                const node = ast.expression as BinaryExpressionNode;

                expect(() => {
                    throw ParserError.addSource(
                        ParserError.fromNode('Unexpected token', node.operator),
                        source,
                    );
                }).throws('Unexpected token\n' + 'Line: 15+5\n' + '        ^');
            });
            it('BinaryExpressionNode.right', () => {
                const source = '15+5';

                const ast = parse(source);

                const node = ast.expression as BinaryExpressionNode;

                expect(() => {
                    throw ParserError.addSource(
                        ParserError.fromNode('Unexpected token', node.operator),
                        source,
                    );
                }).throws('Unexpected token\n' + 'Line: 15+5\n' + '        ^');
            });
        });
    });
});
