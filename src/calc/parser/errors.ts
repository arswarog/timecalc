import { SyntaxContext } from './context';

export class ParserError extends Error {
    constructor(
        public readonly error: string,
        public readonly source: string,
        public readonly position: number,
    ) {
        super(makePointedError(error, source, position));
    }

    static fromCtx(error: string, ctx: SyntaxContext): ParserError {
        const source = ctx.getText();
        const position = ctx.getCurrentToken().start;

        return new ParserError(error, source, position);
    }
}

export function makePointedError(error: string, source: string, position: number): string {
    const prefix = 'Line: ';

    const line = source;
    const pointer = ' '.repeat(position + prefix.length) + '^';

    return `${error}\n${prefix}${line}\n${pointer}`;
}
