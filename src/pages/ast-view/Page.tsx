import block from 'bem-css-modules';

import { Screen } from '@src/widgets/calc-screen';

import styles from './Page.module.scss';
const b = block(styles, 'AstViewPage');

export function AstViewPage() {
    return (
        <div className={b()}>
            <h1 className={b('title')}>Просмотр AST</h1>
            <div className={b('display')}>
                <Screen />
            </div>
            <div className={b('ast')}>
                <pre className={b('ast-text')}>
                    Здесь будет AST
                    {/* <AstView /> */}
                </pre>
            </div>
        </div>
    );
}
