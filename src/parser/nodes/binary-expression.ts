import { PositionalError } from '../common';
import { Token, TokenType } from '../lexer';

import { AbstractNode, NodeType } from './abstract';
import { NumberValue, Value, ValueType } from './value.type';

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
            return evaluateNumberExpression(
                leftValue as NumberValue,
                this.operator,
                rightValue as NumberValue,
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new PositionalError(error, this);
            }

            throw new PositionalError('Unknown error', this.operator);
        }
    }
}

function evaluateNumberExpression(
    left: NumberValue,
    operator: Token,
    right: NumberValue,
): NumberValue {
    if (left.type !== right.type) {
        throw new Error(
            `Cannot evaluate binary expression with different types: ${ValueType[left.type]} and ${ValueType[right.type]}`,
        );
    }

    if (left.type !== ValueType.Number) {
        throw new Error(`Unsupported value type for binary expression: ${ValueType[left.type]}`);
    }
    switch (operator.type) {
        case TokenType.PlusOperation:
            return {
                type: ValueType.Number,
                value: left.value + right.value,
            };
        case TokenType.MinusOperation:
            return {
                type: ValueType.Number,
                value: left.value - right.value,
            };
        case TokenType.MultiplyOperation:
            return {
                type: ValueType.Number,
                value: left.value * right.value,
            };
        case TokenType.DivideOperation:
            if (right.value === 0) {
                throw new PositionalError('Деление на ноль', operator);
            }

            return {
                type: ValueType.Number,
                value: left.value / right.value,
            };
        default:
            throw new PositionalError(`Unexpected operator "${operator.text}"`, operator);
    }
}
