import { describe, expect, it } from 'vitest';

import { parse } from '../../parser';
import { ValueType } from '../value.type';

describe('Evaluate', () => {
    describe('простые значения', () => {
        it('12', () => {
            // Arrange
            const root = parse('12');

            // Act
            const result = root.evaluate();

            // Assert
            expect(result).toEqual({
                type: ValueType.Number,
                value: 12,
            });
        });
    });
    describe('операции', () => {
        describe('сложение', () => {
            describe('number + number', () => {
                it('12 + 35', () => {
                    // Arrange
                    const root = parse('12 + 35');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: 47,
                    });
                });
            });
        });
        describe('вычитание', () => {
            describe('number - number', () => {
                it('35 - 12', () => {
                    // Arrange
                    const root = parse('35 - 12');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: 23,
                    });
                });
                it('12 - 35', () => {
                    // Arrange
                    const root = parse('12 - 35');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: -23,
                    });
                });
            });
        });
        describe('умножение', () => {
            describe('number * number', () => {
                it('12 * 3', () => {
                    // Arrange
                    const root = parse('12 * 3');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: 36,
                    });
                });
                it('12 * 0', () => {
                    // Arrange
                    const root = parse('12 * 0');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: 0,
                    });
                });
            });
        });
        describe('деление', () => {
            describe('number / number', () => {
                it('36 / 3', () => {
                    // Arrange
                    const root = parse('36 / 3');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: 12,
                    });
                });
                it('12 / 0', () => {
                    // Arrange
                    const root = parse('12 / 0');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow('Деление на ноль');
                });
            });
        });
    });
    describe('приоритет операций', () => {
        it('3+512÷8', () => {
            // Arrange
            const root = parse('3+512÷8');

            // Act
            const result = root.evaluate();

            // Assert
            expect(result).toEqual({
                type: ValueType.Number,
                value: 67,
            });
        });
    });
});
