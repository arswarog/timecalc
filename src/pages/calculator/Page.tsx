import block from 'bem-css-modules';

import { Keyboard } from '@src/features/calculator';
import { Screen } from '@src/widgets/calc-screen';

import styles from './Page.module.scss';
const b = block(styles, 'CalculatorPage');

export function CalculatorPage() {
    return (
        <div className={b()}>
            <Screen />
            <Keyboard />
        </div>
    );
}
