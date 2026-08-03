import { getPositionFromTokens, parseNumberString } from '@src/parser/nodes/value.utils';

import { PositionalError } from '../common';
import { Token } from '../lexer';

import { AbstractNode, NodeType } from './abstract';
import { Value, ValueType } from './value.type';

interface NumberValue {
    integer: Token;
    fractional?: Token;
    additional?: (Token | undefined)[];
}

interface TimeValue {
    hours?: Token | ValueNode;
    minutes?: Token | ValueNode;
    seconds?: Token | ValueNode;
    milliseconds?: Token | ValueNode;
    additional?: (Token | undefined)[];
}

export class ValueNode extends AbstractNode {
    public readonly type = NodeType.Value;
    public readonly value: Value;

    constructor(tokens: NumberValue);
    constructor(tokens: TimeValue);
    constructor(tokens: NumberValue | TimeValue) {
        super();

        const additionalTokens = tokens.additional || [];

        if (isNumberValue(tokens)) {
            if (!tokens.integer) {
                throw new Error('Value must have an integer part');
            }

            [this.start, this.end] = getPositionFromTokens(
                tokens.integer,
                tokens.fractional,
                ...additionalTokens,
            );

            let stringValue = tokens.integer.text;

            if (tokens.fractional) {
                stringValue += '.' + tokens.fractional.text;
            }

            try {
                const value = parseNumberString(stringValue);

                this.value = {
                    type: ValueType.Number,
                    value,
                };
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new PositionalError(error, this);
                }

                if (typeof error === 'string') {
                    throw new PositionalError(error, this);
                }

                throw new PositionalError('Unknown error', this);
            }

            return;
        }

        if (isTimeValue(tokens)) {
            [this.start, this.end] = getPositionFromTokens(
                tokens.hours,
                tokens.minutes,
                tokens.seconds,
                tokens.milliseconds,
                ...additionalTokens,
            );

            try {
                const hours =
                    tokens.hours instanceof ValueNode
                        ? tokens.hours.value.value
                        : parseNumberString(tokens.hours?.text || '0');
                const minutes =
                    tokens.minutes instanceof ValueNode
                        ? tokens.minutes.value.value
                        : parseNumberString(tokens.minutes?.text || '0');
                const seconds =
                    tokens.seconds instanceof ValueNode
                        ? tokens.seconds.value.value
                        : parseNumberString(tokens.seconds?.text || '0');
                const milliseconds =
                    tokens.milliseconds instanceof ValueNode
                        ? tokens.milliseconds.value.value
                        : parseNumberString(`0.${tokens.milliseconds?.text || '0'}`);

                const value = hours * 3600 + minutes * 60 + seconds + milliseconds;

                this.value = {
                    type: ValueType.Time,
                    value,
                };
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new PositionalError(error, this);
                }

                if (typeof error === 'string') {
                    throw new PositionalError(error, this);
                }

                throw new PositionalError('Unknown error', this);
            }

            return;
        }

        throw new Error('Value must have a valid value');
    }

    public evaluate(): Value {
        return this.value;
    }
}

function isNumberValue(tokens: NumberValue | TimeValue): tokens is NumberValue {
    return 'integer' in tokens || 'fractional' in tokens;
}

function isTimeValue(tokens: NumberValue | TimeValue): tokens is TimeValue {
    return (
        'hours' in tokens || 'minutes' in tokens || 'seconds' in tokens || 'milliseconds' in tokens
    );
}
