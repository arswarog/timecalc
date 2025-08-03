import { TokenType } from '@src/parser';
import { SyntaxTheme, SyntaxThemeItem } from '@src/shared/syntax-theme';

export const tokensMap: { [key in TokenType]: SyntaxThemeItem } = {
    [TokenType.UnknownSymbol]: SyntaxTheme.Error,
    [TokenType.EndOfFile]: SyntaxTheme.Regular,
    [TokenType.Space]: SyntaxTheme.Regular,
    [TokenType.NumericLiteral]: SyntaxTheme.Number,
    [TokenType.PlusOperation]: SyntaxTheme.Regular,
    [TokenType.MinusOperation]: SyntaxTheme.Regular,
    [TokenType.MultiplyOperation]: SyntaxTheme.Regular,
    [TokenType.DivideOperation]: SyntaxTheme.Regular,
    [TokenType.HourLiteral]: SyntaxTheme.Method,
    [TokenType.MinuteLiteral]: SyntaxTheme.Method,
    [TokenType.SecondLiteral]: SyntaxTheme.Method,
};
