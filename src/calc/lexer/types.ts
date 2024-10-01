export enum TokenType {
    NewLine = 1,
    Space,
    DecimalValue,
    Symbol,
    Operator,
}

export interface Positionable {
    start: number;
    end: number;
    fullEnd: number;
}

export interface Token {
    type: TokenType;
    text: string;
}
