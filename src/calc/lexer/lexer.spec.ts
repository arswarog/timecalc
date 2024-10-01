import { it, describe, expect } from 'vitest';
import { analyzeCode } from './lexer.ts';

describe('Lexer', () => {
    describe('TokenTypes', () => {
        describe('DecimalValue', () => {
            it('validates a decimal value', () => {
                expect(analyzeCode('3')).toBe({
                    tokens: [{ type: 1, text: '3', fullText: '3' }],
                });
            });
        });
    });
});
