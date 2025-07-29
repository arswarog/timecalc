import { Token } from '@src/features/evaluate';

interface TokensViewProps {
    tokens: Token[];
}

export function TokensView({ tokens }: TokensViewProps) {
    return <pre>{JSON.stringify(tokens, null, 4)}</pre>;
}
