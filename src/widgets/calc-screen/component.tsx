import block from 'bem-css-modules';

import { ScreenAtom } from './atom';
import styles from './component.module.scss';

const b = block(styles, 'Screen');

export interface IScreenProps {
    data: ScreenAtom;
    onChange?: (code: string) => void;
}

export function ScreenComponent({ data, onChange }: IScreenProps) {
    const { code, result, invalidExpression, runtimeError } = data;

    return (
        <div className={b()}>
            <input
                className={b('code')}
                value={code}
                onChange={(e) => onChange?.(e.target.value)}
                autoFocus
            />
            <div
                className={b('result', {
                    invalidExpression,
                    runtimeError: !!runtimeError,
                })}
            >
                &nbsp;{runtimeError ? runtimeError : result}
            </div>
        </div>
    );
}
