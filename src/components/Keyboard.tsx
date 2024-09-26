import { ButtonCode } from '../types';
import styles from './Keyboard.module.scss';
import block from 'bem-css-modules';

const b = block(styles, 'Keyboard');

export interface IKeyboardProps {
    onClick?: (value: ButtonCode) => void;
}

export function Keyboard({ onClick }: IKeyboardProps) {
    return (
        <div className={b()}>
            <button
                className={b('button', { operator: true })}
                onClick={() => onClick?.(ButtonCode.Plus)}
                style={{ gridArea: 'plus' }}
            >
                +
            </button>
            <button
                className={b('button', { operator: true })}
                onClick={() => onClick?.(ButtonCode.Minus)}
                style={{ gridArea: 'minus' }}
            >
                -
            </button>
            <button
                className={b('button', { operator: true })}
                onClick={() => onClick?.(ButtonCode.Multiply)}
                style={{ gridArea: 'multiply' }}
            >
                &times;
            </button>
            <button
                className={b('button', { operator: true })}
                onClick={() => onClick?.(ButtonCode.Divide)}
                style={{ gridArea: 'divide' }}
            >
                ÷
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol7)}
                style={{ gridArea: 'symbol7' }}
            >
                7
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol8)}
                style={{ gridArea: 'symbol8' }}
            >
                8
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol9)}
                style={{ gridArea: 'symbol9' }}
            >
                9
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol4)}
                style={{ gridArea: 'symbol4' }}
            >
                4
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol5)}
                style={{ gridArea: 'symbol5' }}
            >
                5
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol6)}
                style={{ gridArea: 'symbol6' }}
            >
                6
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol1)}
                style={{ gridArea: 'symbol1' }}
            >
                1
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol2)}
                style={{ gridArea: 'symbol2' }}
            >
                2
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol3)}
                style={{ gridArea: 'symbol3' }}
            >
                3
            </button>
            <button
                className={b('button')}
                onClick={() => onClick?.(ButtonCode.Symbol0)}
                style={{ gridArea: 'symbol0' }}
            >
                0
            </button>
            <button
                className={b('button', { secondary: true })}
                onClick={() => onClick?.(ButtonCode.SymbolDot)}
                style={{ gridArea: 'symbolDot' }}
            >
                .
            </button>
            <button
                className={b('button', { operator: true })}
                style={{ gridArea: 'clear' }}
            >
                AC
            </button>
            <button
                className={b('button', { enter: true })}
                onClick={() => onClick?.(ButtonCode.Enter)}
                style={{ gridArea: 'enter' }}
            >
                =
            </button>
        </div>
    );
}
