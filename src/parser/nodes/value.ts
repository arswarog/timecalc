import { PositionalError } from '../common';
import { Token, TokenType } from '../lexer';

import { AbstractNode, NodeType } from './abstract';
import { Value, ValueType } from './value.type';

const unitMap: Partial<Record<TokenType, number>> = {
    [TokenType.SecondLiteral]: 1,
    [TokenType.MinuteLiteral]: 60,
    [TokenType.HourLiteral]: 60 * 60,
};

export class ValueNode extends AbstractNode {
    public readonly type = NodeType.Value;
    public readonly value: Value;

    constructor(valueTokens: Token[], unitToken?: Token) {
        super();

        const firstToken = valueTokens[0];
        const lastToken = valueTokens[valueTokens.length - 1];
        let text = valueTokens.map((token) => token.text).join('');

        if (text.startsWith('.')) {
            text = '0' + text;
        }

        const value = parseFloat(text);

        if (!Number.isFinite(value)) {
            throw new PositionalError(`Invalid number "${text}"`, firstToken);
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

            this.start = firstToken.start;
            this.end = unitToken.end;
        } else {
            this.value = {
                type: ValueType.Number,
                value,
            };

            this.start = firstToken.start;
            this.end = lastToken.end;
        }
    }

    public evaluate(): Value {
        return this.value;
    }
}
