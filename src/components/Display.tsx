import { IDisplayData } from '../types';

import styles from './Display.module.scss';
import block from 'bem-css-modules';

const b = block(styles, 'Display');

export interface IDisplayProps {
    data: IDisplayData;
}

export function Display({ data }: IDisplayProps) {
    const { code, result } = data;
    return (
        <div className={b()}>
            <input
                className={b('code')}
                defaultValue={code}
            />
            <div className={b('result')}>{result}</div>
        </div>
    );
}
