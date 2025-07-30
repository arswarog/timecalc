import { ReactNode } from 'react';

import block from 'bem-css-modules';

import { Screen } from '@src/widgets/calc-screen';
import { Navbar } from '@src/widgets/navbar';

import styles from './Layout.module.scss';
const b = block(styles, 'DevLayout');

export interface DevLayoutProps {
    title: string;
    children?: ReactNode;
}

export function DevLayout({ title, children }: DevLayoutProps) {
    return (
        <div className={b()}>
            <h1 className={b('title')}>{title}</h1>
            <div className={b('display')}>
                <Screen />
            </div>
            <Navbar />
            <div className={b('page')}>{children}</div>
        </div>
    );
}
