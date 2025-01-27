import { Token, TokenType } from '../lexer';
import { BinaryExpressionNode, RootNode, ValueNode } from '../nodes';

export function parse(tokens: Token[], source: string): RootNode {
    // так как дальше мы будем мутировать массив токенов, клонируем его
    tokens = [...tokens];

    const ctx = createContext(tokens);

    return new RootNode(parseBinaryExpression(ctx), source);
}

interface Context {
    getCurrentToken(): Token;
    next(): void;
    isEnd(): boolean;
}

function createContext(tokens: Token[]): Context {
    let index = 0;
    return {
        getCurrentToken() {
            return tokens[index];
        },
        next() {
            index++;
        },
        isEnd(): boolean {
            return index >= tokens.length;
        },
    };
}

function parseBinaryExpression(ctx: Context): BinaryExpressionNode | ValueNode {
    let left = parseValue(ctx);

    while (!ctx.isEnd()) {
        const operator = ctx.getCurrentToken();

        if (operator.type !== TokenType.Operation) {
            break;
        }

        ctx.next();

        const right = parseValue(ctx);

        left = new BinaryExpressionNode(operator, left, right);
    }

    return left;
}

function parseValue(ctx: Context): BinaryExpressionNode | ValueNode {
    const value = ctx.getCurrentToken();

    if (value.type === TokenType.DecimalValue) {
        ctx.next();
        return new ValueNode(value.text);
    }

    throw new Error(`Expected value, got "${value.text}"`);
}
