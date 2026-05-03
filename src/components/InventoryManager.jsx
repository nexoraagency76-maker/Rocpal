import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { allInventory } from '../data/inventory';
import { formatCurrency } from '../utils/calculator';

const InventoryManager = ({ onAddItem, onAddCustom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomMode, setShowCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customQty, setCustomQty] = useState(1);

  const filteredItems = searchTerm 
    ? allInventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName || !customPrice) return;
    
    onAddCustom({
      id: `custom-${Date.now()}`,
      name: customName,
      price: parseFloat(customPrice),
      qty: parseInt(customQty) || 1
    });
    
    setCustomName('');
    setCustomPrice('');
    setCustomQty(1);
    setShowCustomMode(false);
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Inventory Search</h2>
        <button 
          onClick={() => setShowCustomMode(!showCustomMode)}
          className={`text-xs px-3 py-1.5 rounded flex items-center gap-1 transition-colors ${showCustomMode ? 'bg-slate-700 text-white' : 'bg-wood-600/20 text-wood-400 hover:bg-wood-600/30'}`}
        >
          {showCustomMode ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Custom Item</>}
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0">
        {showCustomMode ? (
          <form onSubmit={handleAddCustom} className="space-y-4 flex-1">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <h3 className="text-wood-400 font-medium mb-4 text-sm">Custom Appliance / Override</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Item Name (e.g., Bosch Dishwasher)</label>
                  <input 
                    type="text" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="input-field text-sm"
                    placeholder="Enter item name..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Price ($)</label>
                    <input 
                      type="number" 
                      min="0" step="0.01"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="input-field text-sm"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Quantity</label>
                    <input 
                      type="number" 
                      min="1"
                      value={customQty}
                      onChange={(e) => setCustomQty(e.target.value)}
                      className="input-field text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full mt-6 py-2 text-sm">
                Add to Quote
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col h-full">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search materials, hardware, finishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {searchTerm && filteredItems.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No items found matching "{searchTerm}"
                </div>
              )}
              
              {(!searchTerm ? allInventory.slice(0, 8) : filteredItems).map(item => (
                <div key={item.id} className="bg-slate-900/40 hover:bg-slate-800 border border-slate-700/50 rounded-lg p-3 transition-colors flex justify-between items-center group">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200 text-sm">{item.name}</span>
                      {item.note && (
                        <span className="text-[10px] bg-amber-900/30 text-amber-500 px-1.5 py-0.5 rounded border border-amber-900/50" title={item.note}>Special</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{item.category}</span>
                      <span>{formatCurrency(item.price)} / {item.unit}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onAddItem(item)}
                    className="w-8 h-8 rounded-full bg-wood-600/20 text-wood-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-wood-600 hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
              
              {!searchTerm && (
                <div className="text-center py-4 text-xs text-slate-500">
                  Search to find more items from the database...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManager;
