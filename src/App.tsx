import './App.css';
import { SiteTitle } from './components/SiteTitle.tsx';
import { CalculatorUI } from './components/CalculatorUI.tsx';

function App() {
    return (
        <>
            <SiteTitle />
            <CalculatorUI display={{ value: 'Hello world!' }} />
        </>
    );
}

export default App;
