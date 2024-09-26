import styles from './CalculatorUI.module.scss';
import block from 'bem-css-modules';
import { Display } from './Display.tsx';
import { IDisplayData, ButtonCode } from '../types';
import { Keyboard } from './Keyboard.tsx';

export interface ICalculatorUIProps {
    display: IDisplayData;
    onClick?: (value: ButtonCode) => void;
}

const b = block(styles, 'CalculatorUI');

export function CalculatorUI({ display, onClick }: ICalculatorUIProps) {
    return (
        <div className={b()}>
            <Display data={display} />
            <Keyboard onClick={onClick} />
        </div>
    );
}
