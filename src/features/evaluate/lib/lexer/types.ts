import { Positionable } from '../common';

export enum TokenType {
    EndOfFile = -1,
    UnknownSymbol = 0,
    Space,
    NumericLiteral,
    PlusOperation,
    MinusOperation,
    MultiplyOperation,
    DivideOperation,
    HourLiteral,
    MinuteLiteral,
    SecondLiteral,
}

export interface Token extends Positionable {
    type: TokenType;
    text: string;
}
