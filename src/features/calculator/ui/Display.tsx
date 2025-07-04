import { useAction, useAtom } from '@reatom/npm-react';

import { changeExpressionAction } from '@src/state';

import { DisplayComponent } from '../components';
import { displayAtom } from '../model';

export function Display() {
    const [data] = useAtom(displayAtom);

    const handleChange = useAction(changeExpressionAction);

    return (
        <DisplayComponent
            data={data}
            onChange={handleChange}
        />
    );
}
