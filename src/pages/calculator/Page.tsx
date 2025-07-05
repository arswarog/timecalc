import block from 'bem-css-modules';

import { Display, Keyboard } from '@src/features/calculator';

import styles from './Page.module.scss';
const b = block(styles, 'CalculatorPage');

export function CalculatorPage() {
    return (
        <div className={b()}>
            <Display />
            <Keyboard />
        </div>
    );
}
