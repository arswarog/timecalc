import { createToken } from './create-token';
import { Token, TokenType } from './types';

export function analyzeCode(code: string): Token[] {
    const tokens: Token[] = [];

    if (!code.length) {
        return tokens;
    }

    let index = 0;
    let buffer = '';
    let tokenType = TokenType.NumericLiteral;

    do {
        const char = code[index];
        const charType = getCharType(char);

        if (!buffer.length) {
            buffer = char;
            tokenType = charType;
            index++;
            continue;
        }

        if (charType === tokenType) {
            buffer += char;
            index++;
            continue;
        }

        tokens.push(createToken(tokenType, buffer, index - buffer.length));
        buffer = char;
        tokenType = charType;
        index++;
    } while (index < code.length);

    if (buffer.length) {
        tokens.push(createToken(tokenType, buffer, index - buffer.length));
    }

    return tokens;
}

function getCharType(char: string): TokenType {
    for (const { chars, type } of tokenDeclarations) {
        if (chars.includes(char)) {
            return type;
        }
    }

    return TokenType.UnknownSymbol;
}

const tokenDeclarations: { type: TokenType; chars: string }[] = [
    {
        type: TokenType.Space,
        chars: ' ',
    },
    {
        type: TokenType.NumericLiteral,
        chars: '0123456789',
    },
    {
        type: TokenType.PlusOperation,
        chars: '+',
    },
    {
        type: TokenType.MinusOperation,
        chars: '-',
    },
    {
        type: TokenType.MultiplyOperation,
        chars: '*×',
    },
    {
        type: TokenType.DivideOperation,
        chars: '/÷',
    },
    {
        type: TokenType.HourLiteral,
        chars: 'hHчЧ',
    },
    {
        type: TokenType.MinuteLiteral,
        chars: 'mMмМ',
    },
    {
        type: TokenType.SecondLiteral,
        chars: 'sSсС',
    },
];
