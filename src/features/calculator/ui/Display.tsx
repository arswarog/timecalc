import { useAction, useAtom } from '@reatom/npm-react';

import { DisplayComponent } from '../components';
import { changeExpressionAction, displayAtom } from '../model';

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
