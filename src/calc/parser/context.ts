import { Token } from '../lexer';

export interface SyntaxContext {
    index: number;
    getCurrentToken(): Token;
    next(): void;
    isEnd(): boolean;
    getText(): string;
}

export function createContext(tokens: Token[]): SyntaxContext {
    let index = 0;
    return {
        get index() {
            return index;
        },
        getCurrentToken() {
            return tokens[index];
        },
        next() {
            index++;
        },
        isEnd(): boolean {
            return index >= tokens.length;
        },
        getText() {
            return tokens.map((t) => t.text).join('');
        },
    };
}
