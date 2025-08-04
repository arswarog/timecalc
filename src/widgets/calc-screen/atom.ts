import { atom } from '@reatom/framework';

import { expressionAtom } from '@src/entities/expression';
import { resultAtom } from '@src/features/evaluate';

export interface ScreenAtom {
    code: string;
    result: string;
    invalidExpression: boolean;
    runtimeError: string;
}

export const screenAtom = atom<ScreenAtom>((ctx) => {
    const code = ctx.spy(expressionAtom);
    const result = ctx.spy(resultAtom);

    return {
        code,
        result: result.result,
        invalidExpression: result.invalidExpression,
        runtimeError: result.runtimeError,
    };
});
