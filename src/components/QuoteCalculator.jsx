import React from 'react';
import { Settings, Trash2, Plus, Minus, Calculator as CalcIcon } from 'lucide-react';
import { formatCurrency, calculateGrandTotal } from '../utils/calculator';
import InventoryManager from './InventoryManager';

const QuoteCalculator = ({ 
  lineItems, 
  customItems, 
  laborHours, 
  shopRate, 
  marginPercent,
  setLineItems,
  setCustomItems,
  setLaborHours,
  setShopRate,
  setMarginPercent,
  onReset
}) => {

  const handleAddItem = (item) => {
    setLineItems(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleAddCustom = (customItem) => {
    setCustomItems(prev => [...prev, customItem]);
  };

  const updateLineItemQty = (id, newQty) => {
    if (newQty < 1) return;
    setLineItems(prev => prev.map(i => i.item.id === id ? { ...i, qty: newQty } : i));
  };

  const removeLineItem = (id) => {
    setLineItems(prev => prev.filter(i => i.item.id !== id));
  };

  const removeCustomItem = (id) => {
    setCustomItems(prev => prev.filter(i => i.id !== id));
  };

  const totals = calculateGrandTotal(lineItems, customItems, laborHours, shopRate, marginPercent);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <CalcIcon className="text-wood-400" size={32} />
            Quote Generator
          </h1>
          <p className="text-slate-400 mt-1">Professional Custom Cabinetry Estimator</p>
        </div>
        <button 
          onClick={onReset}
          className="btn-secondary text-sm"
        >
          <Trash2 size={16} /> New Quote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inventory Search & Labor/Margin */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="h-[400px]">
            <InventoryManager onAddItem={handleAddItem} onAddCustom={handleAddCustom} />
          </div>

          <div className="glass-panel rounded-xl p-5 border-l-4 border-l-wood-500">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings size={18} className="text-wood-400" />
              Labor & Shop Rates
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Labor Hours</label>
                  <input 
                    type="number" min="0" 
                    value={laborHours} 
                    onChange={e => setLaborHours(parseFloat(e.target.value) || 0)}
                    className="input-field" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Shop Rate ($/hr)</label>
                  <input 
                    type="number" min="0" 
                    value={shopRate} 
                    onChange={e => setShopRate(parseFloat(e.target.value) || 0)}
                    className="input-field" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 flex justify-between">
                  <span>Profit Margin (%)</span>
                  <span className="text-wood-400 font-medium">{marginPercent}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" step="1"
                  value={marginPercent} 
                  onChange={e => setMarginPercent(parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-wood-500" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Line Items and Totals */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-700 bg-slate-800/80">
              <h2 className="text-xl font-semibold text-white">Current Quote</h2>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              
              {/* Standard Database Items */}
              {lineItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Database Items</h3>
                  <div className="space-y-2">
                    {lineItems.map(({ item, qty }) => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-900/50 border border-slate-700/50 p-3 rounded-lg group">
                        <div className="flex-1">
                          <p className="font-medium text-slate-200">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.category} • {formatCurrency(item.price)} / {item.unit}</p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-md p-1">
                            <button onClick={() => updateLineItemQty(item.id, qty - 1)} className="p-1 hover:text-wood-400 text-slate-400 transition-colors"><Minus size={14}/></button>
                            <span className="w-12 text-center text-sm font-medium text-white">{qty} {item.unit === 'sqft' ? 'sqft' : item.unit === 'sheet' ? 'sht' : item.unit}</span>
                            <button onClick={() => updateLineItemQty(item.id, qty + 1)} className="p-1 hover:text-wood-400 text-slate-400 transition-colors"><Plus size={14}/></button>
                          </div>
                          <div className="w-24 text-right font-medium text-white">
                            {formatCurrency(item.price * qty)}
                          </div>
                          <button onClick={() => removeLineItem(item.id)} className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Overrides */}
              {customItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Custom Additions</h3>
                  <div className="space-y-2">
                    {customItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-wood-900/10 border border-wood-900/30 p-3 rounded-lg group">
                        <div className="flex-1">
                          <p className="font-medium text-slate-200">{item.name}</p>
                          <p className="text-xs text-slate-500">Manual Entry • {formatCurrency(item.price)} ea</p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-sm font-medium text-slate-300 w-20 text-center">
                            Qty: {item.qty}
                          </div>
                          <div className="w-24 text-right font-medium text-white">
                            {formatCurrency(item.price * item.qty)}
                          </div>
                          <button onClick={() => removeCustomItem(item.id)} className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lineItems.length === 0 && customItems.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
                  <CalcIcon size={48} className="mb-4 text-slate-700" />
                  <p>Your quote is empty.</p>
                  <p className="text-sm">Search the inventory or add custom items to begin.</p>
                </div>
              )}
            </div>

            {/* Total Footer */}
            <div className="bg-slate-950 p-6 border-t border-slate-700">
              <div className="max-w-md ml-auto space-y-3">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Materials & Custom:</span>
                  <span>{formatCurrency(totals.materialsTotal + totals.customTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Labor ({laborHours} hrs @ {formatCurrency(shopRate)}/hr):</span>
                  <span>{formatCurrency(totals.laborTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm border-t border-slate-800 pt-3">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(totals.subTotal)}</span>
                </div>
                <div className="flex justify-between text-wood-400 text-sm">
                  <span>Dad Margin ({marginPercent}%):</span>
                  <span>+{formatCurrency(totals.marginAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-white text-2xl font-bold border-t border-slate-800 pt-3 mt-3">
                  <span>Grand Total:</span>
                  <span className="text-wood-400">{formatCurrency(totals.grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
