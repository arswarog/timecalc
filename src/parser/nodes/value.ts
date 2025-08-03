import { PositionalError } from '../common';
import { Token, TokenType } from '../lexer';

import { AbstractNode, NodeType } from './abstract';
import { Value, ValueType } from './value.type';

/**
 * Список констант для единиц измерения времени.
 */
const unitMap: Partial<Record<TokenType, number>> = {
    [TokenType.SecondLiteral]: 1,
    [TokenType.MinuteLiteral]: 60,
    [TokenType.HourLiteral]: 60 * 60,
};

export class ValueNode extends AbstractNode {
    public readonly type = NodeType.Value;
    public readonly value: Value;

    constructor(valueToken: Token, unitToken?: Token) {
        super();

        const value = parseInt(valueToken.text);

        if (!Number.isFinite(value)) {
            throw new PositionalError(`Invalid number "${valueToken.text}"`, valueToken);
        }

        if (unitToken) {
            const unit = unitMap[unitToken.type];

            if (!unit) {
                throw new PositionalError(`Invalid unit "${unitToken.text}"`, unitToken);
            }

            this.value = {
                type: ValueType.Time,
                value: value * unit,
            };

            this.start = valueToken.start;
            this.end = unitToken.end;
        } else {
            this.value = {
                type: ValueType.Number,
                value: parseInt(valueToken.text),
            };

            this.start = valueToken.start;
            this.end = valueToken.end;
        }
    }

    public evaluate(): Value {
        return this.value;
    }
}
