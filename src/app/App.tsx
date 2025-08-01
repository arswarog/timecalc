import { Route, Routes } from 'react-router';

import { AstViewPage } from '@src/pages/ast-view';
import { CalculatorPage } from '@src/pages/calculator';
import { DevLayout } from '@src/pages/dev-layout';
import { TokensViewPage } from '@src/pages/tokens-view';

import './App.css';

export function App() {
    return (
        <Routes>
            <Route element={<DevLayout />}>
                <Route
                    path="ast"
                    element={<AstViewPage />}
                />
                <Route
                    path="tokens"
                    element={<TokensViewPage />}
                />
            </Route>
            <Route
                path="*"
                element={<CalculatorPage />}
            />
        </Routes>
    );
}
