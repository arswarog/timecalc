export enum ValueType {
    Number,
    Time,
}

interface BaseValue {
    type: ValueType;
    value: unknown;
}

export interface NumberValue extends BaseValue {
    type: ValueType.Number;
    value: number;
}

export interface TimeValue extends BaseValue {
    type: ValueType.Time;
    // Время в секундах
    value: number;
}

export type Value = NumberValue | TimeValue;
