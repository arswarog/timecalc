import { useAtom } from '@reatom/npm-react';

import { astParsingErrorAtom, tokensAtom } from '@src/features/evaluate';
import { DevLayout } from '@src/pages/dev-layout';
import { ErrorView } from '@src/widgets/error-view';
import { TokensView } from '@src/widgets/tokens-view';

export function TokensViewPage() {
    const [tokens] = useAtom(tokensAtom);
    const [error] = useAtom(astParsingErrorAtom);

    return (
        <DevLayout title="Просмотр токенов">
            {error && <ErrorView error={error} />}
            {tokens ? <TokensView tokens={tokens} /> : 'Ошибка парсинга выражения'}
        </DevLayout>
    );
}
