import block from 'bem-css-modules';

import { IDisplayData } from '../types';

import styles from './Display.module.scss';

const b = block(styles, 'Display');

export interface IDisplayProps {
    data: IDisplayData;
    onChange?: (code: string) => void;
}

export function Display({ data, onChange }: IDisplayProps) {
    const { code, result, error } = data;
    return (
        <div className={b()}>
            <input
                className={b('code')}
                defaultValue={code}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <div className={b('result', { error })}>{result}</div>
        </div>
    );
}
