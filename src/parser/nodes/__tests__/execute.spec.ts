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
            describe('number - time', () => {
                it('12 - 3s', () => {
                    // Arrange
                    const root = parse('12 - 3s');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow(
                        'Нельзя вычитать время из числа или число из времени',
                    );
                });
            });
            describe('time - number', () => {
                it('3m - 12', () => {
                    // Arrange
                    const root = parse('3m - 12');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow(
                        'Нельзя вычитать время из числа или число из времени',
                    );
                });
            });
            describe('time - time', () => {
                it('3m - 2m', () => {
                    // Arrange
                    const root = parse('3m - 2m');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 60, // 1 minute
                    });
                });
                it('12h - 0h', () => {
                    // Arrange
                    const root = parse('12h - 0h');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 43200, // 12 hours in seconds
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
            describe('number * time', () => {
                it('12 * 3s', () => {
                    // Arrange
                    const root = parse('12 * 3s');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 36, // 36 seconds
                    });
                });
                it('12 * 0s', () => {
                    // Arrange
                    const root = parse('12 * 0s');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 0, // 0 seconds
                    });
                });
            });
            describe('time * number', () => {
                it('3m * 12', () => {
                    // Arrange
                    const root = parse('3m * 12');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 2160, // 36 minutes
                    });
                });
                it('0s * 12', () => {
                    // Arrange
                    const root = parse('0s * 12');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 0, // 0 seconds
                    });
                });
            });
            describe('time * time', () => {
                it('3m * 2m', () => {
                    // Arrange
                    const root = parse('3m * 2m');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow('Нельзя умножать время на время');
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
                    expect(() => root.evaluate()).toThrow('Деление на ноль недопустимо');
                });
            });
            describe('number / time', () => {
                it('12 / 3s', () => {
                    // Arrange
                    const root = parse('12 / 3s');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow('Нельзя делить число на время');
                });
                it('12 / 0s', () => {
                    // Arrange
                    const root = parse('12 / 0s');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow('Деление на ноль недопустимо');
                });
            });
            describe('time / number', () => {
                it('3m / 12', () => {
                    // Arrange
                    const root = parse('3m / 12');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Time,
                        value: 15, // 15 seconds
                    });
                });
                it('10h / 0', () => {
                    // Arrange
                    const root = parse('10h / 0');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow('Деление на ноль недопустимо');
                });
            });
            describe('time / time', () => {
                it('3m / 2m', () => {
                    // Arrange
                    const root = parse('3m / 2m');

                    // Act
                    const result = root.evaluate();

                    // Assert
                    expect(result).toEqual({
                        type: ValueType.Number,
                        value: 1.5,
                    });
                });
                it('12h / 0h', () => {
                    // Arrange
                    const root = parse('12h / 0h');

                    // Act & Assert
                    expect(() => root.evaluate()).toThrow('Деление на ноль недопустимо');
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
