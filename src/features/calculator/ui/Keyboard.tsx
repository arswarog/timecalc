import { useAction } from '@reatom/npm-react';

import { pressKeyAction } from '@src/state';

import { KeyboardComponent } from '../components';

export function Keyboard() {
    const handleClick = useAction(pressKeyAction);

    return <KeyboardComponent onClick={handleClick} />;
}
