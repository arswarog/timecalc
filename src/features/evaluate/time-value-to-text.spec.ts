import { describe, expect, it } from 'vitest';

import { timeValueToText } from './time-value-to-text';

describe('timeValueToText', () => {
    describe('zero', () => {
        it('0', () => {
            // todo
        });
    });
    describe('seconds', () => {
        it.each([
            [38, '38с'],
            [60, '1м'],
            [127, '2м 7с'],
        ])('%i should return %i', (value, expected) => {
            expect(timeValueToText(value)).toBe(expected);
        });
    });
    describe('minutes', () => {
        it.each([
            [420, '7м'],
            [3720, '1ч 2м'],
        ])('%i should return %i', (value, expected) => {
            expect(timeValueToText(value)).toBe(expected);
        });
    });
    describe('hours', () => {
        it.each([
            [7200, '2ч'],
            [259200, '72ч'],
        ])('%i should return %i', (value, expected) => {
            expect(timeValueToText(value)).toBe(expected);
        });
    });
});
