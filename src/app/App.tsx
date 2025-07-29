import { Route, Routes } from 'react-router';

import { AstViewPage } from '@src/pages/ast-view';
import { CalculatorPage } from '@src/pages/calculator';
import { TokensViewPage } from '@src/pages/tokens-view';

import './App.css';

export function App() {
    return (
        <Routes>
            <Route
                path="ast"
                element={<AstViewPage />}
            />
            <Route
                path="tokens"
                element={<TokensViewPage />}
            />
            <Route
                path="*"
                element={<CalculatorPage />}
            />
        </Routes>
    );
}
