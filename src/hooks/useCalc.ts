import { IDisplayData } from '../types';
import { useMemo, useState } from 'react';
import { parse } from '../calc/parser';

export interface UseCalc {
    display: IDisplayData;
    onChange: (code: string) => void;
}

export function useCalc(): UseCalc {
    const [display, setDisplay] = useState<IDisplayData>({
        code: '',
        result: '',
    });

    const actions = useMemo(() => {
        let code = '6д + 2:00';

        setDisplay({
            code,
            result: '6д 2ч 12м',
        });

        const handleChange = (newCode: string) => {
            code = newCode;

            try {
                const root = parse(code);
                const result = root.evaluate();

                setDisplay({
                    code,
                    result: result.value.toString(),
                });
            } catch (_) {
                setDisplay((state) => ({
                    ...state,
                    code,
                }));
            }
        };

        return {
            onChange: handleChange,
        };
    }, []);

    return {
        display,
        ...actions,
    };
}
