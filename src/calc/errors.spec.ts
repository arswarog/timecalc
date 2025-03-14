import { describe, expect, it } from 'vitest';

import { HighlightedError, PositionalError } from './errors';
import { analyzeCode } from './lexer';
import { createContext } from './parser/context';

describe('Errors', () => {
    describe('PositionalError', () => {
        it('в середине выражения', () => {
            expect(() => {
                throw new PositionalError('Unexpected token', { start: 3, end: 4, fullEnd: 4 });
            }).throws('Unexpected token at position 3');
        });
    });
    describe('HighlightedError', () => {
        it('в середине выражения', () => {
            const error = new PositionalError('Unexpected token', { start: 4, end: 6, fullEnd: 7 });

            expect(() => {
                throw new HighlightedError(error, '1 + 23 + 5');
            }).throws('Unexpected token\n' + 'Line: 1 + 23 + 5\n' + '          ~~');
        });
        it('в первом символе', () => {
            const error = new PositionalError('Unexpected token', { start: 0, end: 2, fullEnd: 3 });

            expect(() => {
                throw new HighlightedError(error, '12 + 3 + 5');
            }).throws('Unexpected token\n' + 'Line: 12 + 3 + 5\n' + '      ~~');
        });
    });
    describe('использование', () => {
        it('ошибка из токена', () => {
            const source = '1 + 23 + 5';
            const tokens = analyzeCode(source);
            const ctx = createContext(tokens);

            ctx.next();
            ctx.next();
            ctx.next();
            ctx.next();

            const error = new PositionalError('Unexpected token', ctx.getCurrentToken());

            expect(() => {
                throw new HighlightedError(error, source);
            }).throws('Unexpected token\n' + 'Line: 1 + 23 + 5\n' + '          ~~');
        });
    });
});
