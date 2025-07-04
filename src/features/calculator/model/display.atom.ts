import { atom } from '@reatom/framework';

import { expressionAtom, resultAtom } from '@src/state';

export interface DisplayAtom {
    code: string;
    result: string;
    error: boolean;
}

export const displayAtom = atom<DisplayAtom>((ctx) => {
    const code = ctx.spy(expressionAtom);
    const result = ctx.spy(resultAtom);

    return {
        code,
        result: result.result,
        error: result.error,
    };
});
