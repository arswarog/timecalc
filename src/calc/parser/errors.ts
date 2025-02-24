import { Token } from '../lexer';

import { SyntaxContext } from './context';

export class ParserError extends Error {
    constructor(message: string, ctx: SyntaxContext, token: Token) {
        super(ParserError.makeErrorMessage(message, ctx.getText(), token.start));
    }

    static makeErrorMessage(message: string, source: string, position: number): string {
        const prefix = 'Line: ';

        const line = source;
        const pointer = ' '.repeat(position + prefix.length) + '^';

        return `${message}\n${prefix}${line}\n${pointer}`;
    }
}
