import './App.css';
import { CalculatorUI } from './components/CalculatorUI.tsx';
import { SiteTitle } from './components/SiteTitle.tsx';
import { useCalc } from './hooks/useCalc.ts';

export function App() {
    const { display, onChange } = useCalc();
    return (
        <>
            <SiteTitle />
            <CalculatorUI
                display={display}
                onChange={onChange}
            />
        </>
    );
}
