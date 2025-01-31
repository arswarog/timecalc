import './App.css';
import { reatomContext } from '@reatom/npm-react';

import { CalculatorUI } from './components/CalculatorUI';
import { SiteTitle } from './components/SiteTitle';
import { useCalc } from './hooks/useCalc';
import { ctx } from './state';

export function App() {
    const { display, onChange } = useCalc();
    return (
        <reatomContext.Provider value={ctx}>
            <SiteTitle />
            <CalculatorUI
                display={display}
                onChange={onChange}
            />
        </reatomContext.Provider>
    );
}
