import { IDisplayData } from '../types/display.ts';

import styles from './Display.module.scss';
import block from 'bem-css-modules';

const b = block(styles, 'Display');

export interface IDisplayProps {
    data: IDisplayData;
}

export function Display({ data }: IDisplayProps) {
    const { value } = data;
    return <div className={b()}>{value}</div>;
}
