import { describe, expect, it } from 'vitest';

import { createToken, TokenType, ValueType } from '@src/parser';

import { ValueNode } from './value';

describe('Nodes / Value', () => {
    describe('number', () => {
        it('integer', () => {
            const node = new ValueNode({
                integer: createToken(TokenType.NumericLiteral, '12', 0),
            });

            expect(node.value).toEqual({
                type: ValueType.Number,
                value: 12,
            });
            expect(node).toMatchObject({
                start: 0,
                end: 2,
            });
        });
        it('long integer', () => {
            const node = new ValueNode({
                integer: createToken(TokenType.NumericLiteral, '123456789', 10),
            });

            expect(node.value).toEqual({
                type: ValueType.Number,
                value: 123456789,
            });
            expect(node).toMatchObject({
                start: 10,
                end: 19,
            });
        });
        it('with fractional part', () => {
            const node = new ValueNode({
                integer: createToken(TokenType.NumericLiteral, '3', 10),
                fractional: createToken(TokenType.NumericLiteral, '014', 12),
            });

            expect(node.value).toEqual({
                type: ValueType.Number,
                value: 3.014,
            });
            expect(node).toMatchObject({
                start: 10,
                end: 15,
            });
        });
        it('invalid value', () => {
            expect(
                () =>
                    new ValueNode({
                        integer: createToken(TokenType.NumericLiteral, 'b', 3),
                        fractional: createToken(TokenType.NumericLiteral, '52', 5),
                    }),
            ).toThrowError('Invalid number "b.52" at position 3');
        });
    });
    describe('Time', () => {
        it('hours', () => {
            const node = new ValueNode({
                hours: createToken(TokenType.NumericLiteral, '12', 0),
            });

            expect(node.value).toEqual({
                type: ValueType.Time,
                value: 12 * 3600,
            });
            expect(node).toMatchObject({
                start: 0,
                end: 2,
            });
        });
        it('minutes', () => {
            const node = new ValueNode({
                minutes: createToken(TokenType.NumericLiteral, '47', 0),
            });

            expect(node.value).toEqual({
                type: ValueType.Time,
                value: 47 * 60,
            });
            expect(node).toMatchObject({
                start: 0,
                end: 2,
            });
        });
        it('seconds', () => {
            const node = new ValueNode({
                seconds: createToken(TokenType.NumericLiteral, '72', 0),
            });

            expect(node.value).toEqual({
                type: ValueType.Time,
                value: 72,
            });
            expect(node).toMatchObject({
                start: 0,
                end: 2,
            });
        });
        it('milliseconds', () => {
            const node = new ValueNode({
                milliseconds: createToken(TokenType.NumericLiteral, '07', 0),
            });

            expect(node.value).toEqual({
                type: ValueType.Time,
                value: 0.07,
            });
            expect(node).toMatchObject({
                start: 0,
                end: 2,
            });
        });
        it('complex', () => {
            const node = new ValueNode({
                hours: createToken(TokenType.NumericLiteral, '14', 0),
                minutes: createToken(TokenType.NumericLiteral, '08', 3),
                seconds: createToken(TokenType.NumericLiteral, '33', 6),
                milliseconds: createToken(TokenType.NumericLiteral, '01', 9),
            });

            expect(node.value).toEqual({
                type: ValueType.Time,
                value: 14 * 3600 + 8 * 60 + 33.01,
            });
            expect(node).toMatchObject({
                start: 0,
                end: 11,
            });
        });
    });
});
