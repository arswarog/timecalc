import { PositionalError } from '../common';
import { Token, TokenType } from '../lexer';

import { AbstractNode, NodeType } from './abstract';
import { Value, ValueType } from './value.type';

type Operation = (left: Value, right: Value) => Value;

const operationMap: Partial<Record<TokenType, Operation>> = {
    [TokenType.PlusOperation]: plusOperation,
    [TokenType.MinusOperation]: minusOperation,
    [TokenType.MultiplyOperation]: multiplyOperation,
    [TokenType.DivideOperation]: divideOperation,
};

export class BinaryExpressionNode extends AbstractNode {
    public readonly type = NodeType.BinaryExpression;

    constructor(
        public operator: Token,
        public left: AbstractNode,
        public right: AbstractNode,
    ) {
        super();

        this.start = left.start;
        this.end = right.end;
    }

    public evaluate(): Value {
        const leftValue = this.left.evaluate();
        const rightValue = this.right.evaluate();

        try {
            const operation = operationMap[this.operator.type];

            if (!operation) {
                throw new Error(`Unexpected operator "${this.operator.text}"`);
            }

            return operation(leftValue, rightValue);
        } catch (error) {
            if (error instanceof Error) {
                throw new PositionalError(error, this);
            }

            throw new PositionalError('Unknown error', this.operator);
        }
    }
}

function plusOperation(left: Value, right: Value): Value {
    if (left.type !== ValueType.Number || right.type !== ValueType.Number) {
        throw new Error(
            `Cannot add values of different types: ${ValueType[left.type]} and ${ValueType[right.type]}`,
        );
    }

    return {
        type: ValueType.Number,
        value: left.value + right.value,
    };
}

function minusOperation(left: Value, right: Value): Value {
    if (left.type !== right.type) {
        throw new Error('Нельзя вычитать время из числа или число из времени');
    }

    return {
        type: left.type,
        value: left.value - right.value,
    };
}

function multiplyOperation(left: Value, right: Value): Value {
    if (left.type === ValueType.Time && right.type === ValueType.Time) {
        // Умножение времени на время не имеет смысла
        throw new Error('Нельзя умножать время на время');
    }

    return {
        type:
            left.type === ValueType.Time || right.type === ValueType.Time
                ? ValueType.Time
                : ValueType.Number,
        value: left.value * right.value,
    };
}

function divideOperation(left: Value, right: Value): Value {
    if (right.value === 0) {
        throw new Error('Деление на ноль недопустимо');
    }

    if (left.type === ValueType.Number) {
        if (right.type === ValueType.Number) {
            // Оба значения - числа, просто делим
            return {
                type: ValueType.Number,
                value: left.value / right.value,
            };
        } else {
            // Делить число на время нельзя
            throw new Error('Нельзя делить число на время');
        }
    } else {
        if (right.type === ValueType.Number) {
            // Делим время на число, результат будет временем
            return {
                type: ValueType.Time,
                value: left.value / right.value,
            };
        } else {
            // Делим время на время, результат будет число
            return {
                type: ValueType.Number,
                value: left.value / right.value,
            };
        }
    }
}
