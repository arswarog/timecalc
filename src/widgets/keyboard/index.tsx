import { useAction } from '@reatom/npm-react';

import { pressKeyAction } from '@src/features/calculator';

import { KeyboardComponent } from './component';

export function Keyboard() {
    const handleClick = useAction(pressKeyAction);

    return <KeyboardComponent onClick={handleClick} />;
}
