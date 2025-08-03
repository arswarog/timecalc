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
    if (left.type !== ValueType.Number || right.type !== ValueType.Number) {
        throw new Error(
            `Cannot subtract values of different types: ${ValueType[left.type]} and ${ValueType[right.type]}`,
        );
    }

    return {
        type: ValueType.Number,
        value: left.value - right.value,
    };
}

function multiplyOperation(left: Value, right: Value): Value {
    if (left.type !== ValueType.Number || right.type !== ValueType.Number) {
        throw new Error(
            `Cannot multiply values of different types: ${ValueType[left.type]} and ${ValueType[right.type]}`,
        );
    }

    return {
        type: ValueType.Number,
        value: left.value * right.value,
    };
}

function divideOperation(left: Value, right: Value): Value {
    if (left.type !== ValueType.Number || right.type !== ValueType.Number) {
        throw new Error(
            `Cannot divide values of different types: ${ValueType[left.type]} and ${ValueType[right.type]}`,
        );
    }

    if (right.value === 0) {
        throw new Error('Деление на ноль');
    }

    return {
        type: ValueType.Number,
        value: left.value / right.value,
    };
}
