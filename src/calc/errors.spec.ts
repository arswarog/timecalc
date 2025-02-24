import { beforeEach, describe, expect, it } from 'vitest';

import { ParserError } from './errors';
import { analyzeCode } from './lexer';
import { createContext, SyntaxContext } from './parser/context';

describe('Errors', () => {
    describe('ParserError', () => {
        const tokens = analyzeCode('12 + 3 + 5');
        let ctx: SyntaxContext;

        beforeEach(() => {
            ctx = createContext(tokens);
        });

        it('отображение места ошибки в первом символе', () => {
            expect(() => {
                throw new ParserError('Unexpected token', ctx, ctx.getCurrentToken());
            }).throws('Unexpected token\n' + 'Line: 12 + 3 + 5\n' + '      ^');
        });
        it('отображение места ошибки в середине выражения', () => {
            ctx.next();
            ctx.next();
            ctx.next();

            expect(() => {
                throw new ParserError('Unexpected token', ctx, ctx.getCurrentToken());
            }).throws('Unexpected token\n' + 'Line: 12 + 3 + 5\n' + '          ^');
        });
    });
});
