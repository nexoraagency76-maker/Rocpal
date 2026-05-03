import { useState, useEffect } from 'react';
import GlobalHeader from './components/GlobalHeader';
import LandingPage from './components/LandingPage';
import QuoteCalculator from './components/QuoteCalculator';
import { regularData } from './data/inventory';

function App() {
  const [mode, setMode] = useState('landing');
  const [regLineItems, setRegLineItems] = useState([]);
  const [regCustomItems, setRegCustomItems] = useState([]);
  const [laborHours, setLaborHours] = useState(0);
  const [shopRate] = useState(85);
  const [marginPercent, setMarginPercent] = useState(30);

  useEffect(() => {
    const saved = localStorage.getItem('rocpal_quoteState');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.regLineItems) setRegLineItems(p.regLineItems);
        if (p.regCustomItems) setRegCustomItems(p.regCustomItems);
        if (p.laborHours) setLaborHours(p.laborHours);
        if (p.marginPercent) setMarginPercent(p.marginPercent);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rocpal_quoteState', JSON.stringify({
      regLineItems, regCustomItems, laborHours, marginPercent,
    }));
  }, [regLineItems, regCustomItems, laborHours, marginPercent]);

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalHeader mode={mode} onHome={() => setMode('landing')} />
      {mode === 'landing' && <LandingPage onSelectMode={setMode} />}
      {mode === 'regular' && (
        <QuoteCalculator
          db={regularData}
          lineItems={regLineItems} setLineItems={setRegLineItems}
          customItems={regCustomItems} setCustomItems={setRegCustomItems}
          laborHours={laborHours} setLaborHours={setLaborHours}
          shopRate={shopRate}
          marginPercent={marginPercent} setMarginPercent={setMarginPercent}
        />
      )}
    </div>
  );
}

export default App;
