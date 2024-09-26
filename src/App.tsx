import './App.css';
import { SiteTitle } from './components/SiteTitle.tsx';
import { CalculatorUI } from './components/CalculatorUI.tsx';

function App() {
    return (
        <>
            <SiteTitle />
            <CalculatorUI display={{ code: '6д + 2:00', result: '6д 2ч 12м' }} />
        </>
    );
}

export default App;
