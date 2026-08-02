import { Token } from '@src/parser';

export function parseNumberString(str: string): number {
    const value = parseFloat(str);

    if (!Number.isFinite(value)) {
        throw new Error(`Invalid number "${str}"`);
    }

    return value;
}

export function getPositionFromTokens(
    ...tokens: (Token | undefined)[]
): [start: number, end: number] {
    const validTokens = tokens.filter((item): item is Token => !!item);

    if (!validTokens.length) {
        throw new Error(`Invalid tokens []`);
    }

    validTokens.sort((a, b) => a.start - b.start);

    const firstToken = validTokens[0];
    const lastToken = validTokens[validTokens.length - 1];

    return [firstToken.start, lastToken.end];
}
