import { useAction } from '@reatom/npm-react';

import { KeyboardComponent } from '../components';
import { pressKeyAction } from '../model';

export function Keyboard() {
    const handleClick = useAction(pressKeyAction);

    return <KeyboardComponent onClick={handleClick} />;
}
