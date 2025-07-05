import { atom } from '@reatom/framework';

import { expressionAtom, resultAtom } from '@src/features/calculator';

export interface ScreenAtom {
    code: string;
    result: string;
    error: boolean;
}

export const screenAtom = atom<ScreenAtom>((ctx) => {
    const code = ctx.spy(expressionAtom);
    const result = ctx.spy(resultAtom);

    return {
        code,
        result: result.result,
        error: result.error,
    };
});
