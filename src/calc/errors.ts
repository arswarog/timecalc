import { Positionable, Token } from './lexer';
import { AbstractNode, RootNode } from './nodes';
import { SyntaxContext } from './parser/context';

export class ParserError extends Error {
    constructor(
        public readonly error: string,
        public readonly source: string,
        public readonly position: number,
    ) {
        const message = source
            ? makePointedError(error, source, position)
            : error + ' at position ' + position;

        super(message);
    }

    static fromCtx(error: string, ctx: SyntaxContext): ParserError {
        const source = ctx.getText();
        const position = ctx.getCurrentToken().start;

        return new ParserError(error, source, position);
    }

    static fromNode(error: string, token: Positionable): ParserError {
        return new ParserError(error, '', token.start);
    }

    static addSource(error: ParserError, source: string): ParserError {
        const newError = new ParserError(error.error, source, error.position);
        // @ts-expect-error in fact, cause exists in Error
        newError.cause = error;
        return newError;
    }
}

export function makePointedError(error: string, source: string, position: number): string {
    const prefix = 'Line: ';

    const line = source;
    const pointer = ' '.repeat(position + prefix.length) + '^';

    return `${error}\n${prefix}${line}\n${pointer}`;
}
