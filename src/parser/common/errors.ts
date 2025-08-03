import { Positionable } from './types';

export class PositionalError extends Error {
    constructor(
        public readonly error: string | Error,
        public readonly position: Positionable,
    ) {
        const message = typeof error === 'string' ? error : error.message;

        super(`${message} at position ${position.start}`);

        if (error instanceof Error) {
            // @ts-expect-error Error.cause is available in modern environments but not in TypeScript definitions
            this.cause = error;
        }
    }
}

export class HighlightedError extends Error {
    constructor(
        public readonly error: PositionalError,
        public readonly source: string,
    ) {
        const prefix = 'Line: ';
        const { start, end } = error.position;

        const line = source;
        const pointer = ' '.repeat(start + prefix.length) + '~'.repeat(Math.max(1, end - start));

        const message = `${error.message}\n${prefix}${line}\n${pointer}`;
        super(message);
        // @ts-expect-error Error.cause is available in modern environments but not in TypeScript definitions
        this.cause = error;
    }
}
