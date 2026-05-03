import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import QuoteCalculator from './components/QuoteCalculator';

function App() {
  const [started, setStarted] = useState(false);
  
  // State for Quoting
  const [lineItems, setLineItems] = useState([]);
  const [customItems, setCustomItems] = useState([]);
  const [laborHours, setLaborHours] = useState(0);
  const [shopRate, setShopRate] = useState(85);
  const [marginPercent, setMarginPercent] = useState(30);

  // Load from localStorage on initial mount
  useEffect(() => {
    const savedQuote = localStorage.getItem('cabinetryQuoteState');
    if (savedQuote) {
      try {
        const parsed = JSON.parse(savedQuote);
        setLineItems(parsed.lineItems || []);
        setCustomItems(parsed.customItems || []);
        setLaborHours(parsed.laborHours || 0);
        setShopRate(parsed.shopRate || 85);
        setMarginPercent(parsed.marginPercent || 30);
        setStarted(parsed.started || false);
      } catch (e) {
        console.error("Failed to load saved quote data", e);
      }
    }
  }, []);

  // Save to localStorage whenever quote state changes
  useEffect(() => {
    const stateToSave = {
      started,
      lineItems,
      customItems,
      laborHours,
      shopRate,
      marginPercent
    };
    localStorage.setItem('cabinetryQuoteState', JSON.stringify(stateToSave));
  }, [started, lineItems, customItems, laborHours, shopRate, marginPercent]);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to start a new quote? This will clear all current items.")) {
      setLineItems([]);
      setCustomItems([]);
      setLaborHours(0);
      setMarginPercent(30);
      // Keep shop rate as it's usually consistent
    }
  };

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return (
    <div className="min-h-screen">
      <QuoteCalculator 
        lineItems={lineItems}
        setLineItems={setLineItems}
        customItems={customItems}
        setCustomItems={setCustomItems}
        laborHours={laborHours}
        setLaborHours={setLaborHours}
        shopRate={shopRate}
        setShopRate={setShopRate}
        marginPercent={marginPercent}
        setMarginPercent={setMarginPercent}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
