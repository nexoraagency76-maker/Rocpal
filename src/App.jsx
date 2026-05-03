import { useState, useEffect } from 'react';
import GlobalHeader from './components/GlobalHeader';
import LandingPage from './components/LandingPage';
import QuoteCalculator from './components/QuoteCalculator';
import StarBackground from './components/StarBackground';
import { regularData } from './data/inventory';

function App() {
  const [mode, setMode] = useState('landing');
  const [regLineItems, setRegLineItems]     = useState([]);
  const [regCustomItems, setRegCustomItems] = useState([]);
  const [laborHours, setLaborHours]         = useState(0);
  const [marginPercent, setMarginPercent]   = useState(30);

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem('rocpal_v2') || '{}');
      if (p.regLineItems)   setRegLineItems(p.regLineItems);
      if (p.regCustomItems) setRegCustomItems(p.regCustomItems);
      if (p.laborHours)     setLaborHours(p.laborHours);
      if (p.marginPercent)  setMarginPercent(p.marginPercent);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('rocpal_v2', JSON.stringify({ regLineItems, regCustomItems, laborHours, marginPercent }));
  }, [regLineItems, regCustomItems, laborHours, marginPercent]);

  return (
    <>
      {/* Stars sit at z-index -1, permanently behind everything */}
      <StarBackground />

      {/* All page content is normal stacking order (z-index auto) */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader mode={mode} onHome={() => setMode('landing')} />

        {mode === 'landing' && (
          <LandingPage onSelectMode={setMode} />
        )}

        {mode === 'regular' && (
          <QuoteCalculator
            db={regularData}
            lineItems={regLineItems}     setLineItems={setRegLineItems}
            customItems={regCustomItems} setCustomItems={setRegCustomItems}
            laborHours={laborHours}      setLaborHours={setLaborHours}
            marginPercent={marginPercent} setMarginPercent={setMarginPercent}
          />
        )}
      </div>
    </>
  );
}

export default App;
