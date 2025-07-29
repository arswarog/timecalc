import { useAtom } from '@reatom/npm-react';
import block from 'bem-css-modules';

import { astParsingErrorAtom, tokensAtom } from '@src/features/evaluate';
import { Screen } from '@src/widgets/calc-screen';
import { ErrorView } from '@src/widgets/error-view';
import { TokensView } from '@src/widgets/tokens-view';

import styles from './Page.module.scss';
const b = block(styles, 'TokensViewPage');

export function TokensViewPage() {
    const [tokens] = useAtom(tokensAtom);
    const [error] = useAtom(astParsingErrorAtom);

    return (
        <div className={b()}>
            <h1 className={b('title')}>Просмотр AST</h1>
            <div className={b('display')}>
                <Screen />
            </div>
            <div className={b('ast')}>
                {error && <ErrorView error={error} />}
                {tokens ? <TokensView tokens={tokens} /> : 'Ошибка парсинга выражения'}
            </div>
        </div>
    );
}
