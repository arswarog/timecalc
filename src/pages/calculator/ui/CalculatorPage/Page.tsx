import block from 'bem-css-modules';

import { KeyboardWidget } from '@src/components/Keyboard.widget';
import { Display } from '@src/features/calculator';

import styles from './Page.module.scss';
const b = block(styles, 'CalculatorPage');

export function CalculatorPage() {
    return (
        <div className={b()}>
            <Display />
            <KeyboardWidget />
        </div>
    );
}
