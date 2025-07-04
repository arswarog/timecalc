import block from 'bem-css-modules';

import { DisplayWidget } from '@src/components/Display.widget';
import { KeyboardWidget } from '@src/components/Keyboard.widget';

import styles from './Page.module.scss';
const b = block(styles, 'CalculatorPage');

export function CalculatorPage() {
    return (
        <div className={b()}>
            <DisplayWidget />
            <KeyboardWidget />
        </div>
    );
}
