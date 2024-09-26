import styles from './CalculatorUI.module.scss';
import block from 'bem-css-modules';
import { Display } from './Display.tsx';
import { IDisplayData } from '../types/display.ts';

export interface ICalculatorUIProps {
    display: IDisplayData;
    onClick?: (value: string) => void;
}

const b = block(styles, 'CalculatorUI');

export function CalculatorUI({ display }: ICalculatorUIProps) {
    return (
        <div className={b()}>
            <Display data={display} />
        </div>
    );
}
