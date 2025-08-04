import { Positionable } from './types';

export class PositionalError extends Error {
    public readonly originalMessage: string;

    constructor(
        public readonly error: string | Error | PositionalError,
        public readonly position: Positionable,
    ) {
        const message =
            typeof error === 'string'
                ? error
                : 'originalMessage' in error
                  ? error.originalMessage
                  : error.message;

        super(`${message} at position ${position.start}`);

        this.originalMessage = message;

        if (error instanceof Error) {
            this.cause = error;
        }
    }
}

export class HighlightedError extends Error {
    public readonly originalMessage: string;

    constructor(
        public readonly error: PositionalError,
        public readonly source: string,
    ) {
        const prefix = 'Line: ';
        const { start, end } = error.position;

        const line = source;
        const pointer = ' '.repeat(start + prefix.length) + '~'.repeat(Math.max(1, end - start));

        const message = `${error.originalMessage}\n${prefix}${line}\n${pointer}`;

        super(message);

        this.originalMessage = error.originalMessage;
        this.cause = error;
    }
}
