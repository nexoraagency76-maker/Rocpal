import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Check, ArrowLeft, X } from 'lucide-react';
import { formatCurrency, calculateGrandTotal } from '../utils/calculator';
import { getImageUrl } from '../data/inventory';

const QuoteCalculator = ({
  db,
  lineItems, setLineItems,
  customItems, setCustomItems,
  laborHours, setLaborHours,
  marginPercent, setMarginPercent,
}) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  const handleAddItem = (item) => {
    setLineItems(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) return prev.map(i => i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQty = (id, newQty) => {
    if (newQty > 0) setLineItems(prev => prev.map(i => i.item.id === id ? { ...i, qty: newQty } : i));
  };

  const removeItem = (id) => setLineItems(prev => prev.filter(i => i.item.id !== id));

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName || !customPrice) return;
    setCustomItems(prev => [...prev, { id: `custom-${Date.now()}`, name: customName, price: parseFloat(customPrice), qty: 1 }]);
    setCustomName('');
    setCustomPrice('');
    setShowCustomModal(false);
  };

  const removeCustomItem = (id) => setCustomItems(prev => prev.filter(i => i.id !== id));

  const totals = calculateGrandTotal(lineItems, customItems, laborHours, shopRate, marginPercent);
  const itemCount = lineItems.reduce((acc, i) => acc + i.qty, 0) + customItems.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="min-h-[calc(100vh-80px)] pb-20 regular-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left: Storefront */}
          <div className="lg:col-span-7 xl:col-span-8">
            {!activeCategory ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Select Materials</h2>
                  <button
                    onClick={() => setShowCustomModal(true)}
                    className="text-gold-500 font-medium text-sm flex items-center gap-1 hover:text-gold-400 bg-gold-500/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus size={14} /> Custom Item
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Object.keys(db).map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className="group relative h-48 rounded-2xl overflow-hidden shadow-soft flex items-end p-6 text-left transform transition duration-300 hover:-translate-y-1 hover:shadow-glow border border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/20 transition-colors z-10"></div>
                      <img
                        src={getImageUrl(category)}
                        className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                        alt={category}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                      <div className="relative z-20 w-full flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-white shadow-sm tracking-wide">{category}</h3>
                        <div className="w-10 h-10 rounded-full bg-gold-500/20 backdrop-blur flex items-center justify-center text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity border border-gold-500/30">
                          <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="btn-icon bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-gold-500 shadow-sm"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h2 className="text-2xl font-bold text-white">{activeCategory}</h2>
                </div>

                <div className="bg-zinc-900 rounded-2xl shadow-soft border border-zinc-800 overflow-hidden">
                  {db[activeCategory].map((item) => {
                    const inCart = lineItems.find(i => i.item.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-5 flex items-center justify-between border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors ${inCart ? 'bg-gold-500/5' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-black flex-shrink-0 overflow-hidden border border-zinc-800 shadow-inner">
                            <img src={getImageUrl(item.category)} className="w-full h-full object-cover opacity-90" alt={item.name} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-white text-lg">{item.name}</h4>
                              {inCart && (
                                <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-gold-500/30">
                                  <Check size={10} /> Added
                                </span>
                              )}
                            </div>
                            <p className="text-zinc-400 mt-1">
                              {formatCurrency(item.price)}{item.unit !== 'ea' ? ` per ${item.unit}` : ''}
                            </p>
                            {item.note && <p className="text-xs text-gold-600 mt-1 font-medium">{item.note}</p>}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddItem(item)}
                          className={`px-5 py-2.5 rounded-xl font-bold transition-all ml-4 flex-shrink-0 ${inCart
                            ? 'bg-black border border-gold-500/50 text-gold-500 hover:bg-zinc-900'
                            : 'bg-gold-500 text-black hover:bg-gold-400 shadow-[0_0_15px_rgba(220,164,59,0.3)]'
                          }`}
                        >
                          {inCart ? 'Add More' : 'Add to Quote'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Item Modal */}
            {showCustomModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
                  <button onClick={() => setShowCustomModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                    <X size={20} />
                  </button>
                  <h3 className="text-xl font-bold text-white mb-6">Add Custom Item</h3>
                  <form onSubmit={handleAddCustom} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Item Description</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={e => setCustomName(e.target.value)}
                        className="input-field"
                        placeholder="e.g. Bosch Dishwasher"
                        autoFocus
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Total Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={customPrice}
                        onChange={e => setCustomPrice(e.target.value)}
                        className="input-field"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full mt-2">Add to Quote</button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Right: Quote Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="glass-panel sticky top-28 flex flex-col max-h-[calc(100vh-120px)] border-zinc-800">
              <div className="p-6 border-b border-zinc-800 bg-black/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingCart size={20} /> Quote Summary
                </h2>
                <span className="bg-gold-500 text-black text-xs font-bold px-2.5 py-1 rounded-full">{itemCount} items</span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-zinc-900">
                {lineItems.length === 0 && customItems.length === 0 ? (
                  <div className="text-center py-10 text-zinc-600">
                    <div className="flex justify-center mb-3 opacity-30"><ShoppingCart size={40} /></div>
                    <p>Your quote is empty.</p>
                    <p className="text-sm mt-1">Select categories to add items.</p>
                  </div>
                ) : (
                  <>
                    {lineItems.map(({ item, qty }) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-16 h-16 rounded-xl bg-black flex-shrink-0 overflow-hidden border border-zinc-800">
                          <img src={getImageUrl(item.category)} className="w-full h-full object-cover opacity-80" alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-white text-sm truncate pr-2">{item.name}</h4>
                            <span className="font-bold text-gold-400 text-sm whitespace-nowrap">{formatCurrency(item.price * qty)}</span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">{formatCurrency(item.price)}{item.unit !== 'ea' ? ` / ${item.unit}` : ''}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center bg-black border border-zinc-800 rounded-lg">
                              <button onClick={() => updateQty(item.id, qty - 1)} className="px-2 py-1 text-zinc-500 hover:text-white"><Minus size={14} /></button>
                              <span className="text-xs font-medium w-6 text-center text-white">{qty}</span>
                              <button onClick={() => updateQty(item.id, qty + 1)} className="px-2 py-1 text-zinc-500 hover:text-white"><Plus size={14} /></button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {customItems.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-16 h-16 rounded-xl bg-black flex-shrink-0 flex items-center justify-center border border-zinc-800 text-zinc-600">
                          <Plus size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-white text-sm truncate pr-2">{item.name}</h4>
                            <span className="font-bold text-gold-400 text-sm whitespace-nowrap">{formatCurrency(item.price)}</span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">Custom Item</p>
                          <div className="mt-2">
                            <button onClick={() => removeCustomItem(item.id)} className="text-zinc-600 hover:text-red-500 text-xs flex items-center gap-1 transition-colors">
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Labor & Totals */}
              <div className="bg-black p-6 border-t border-zinc-800 space-y-4">
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Labor Hrs</label>
                    <input
                      type="number"
                      min="0"
                      value={laborHours}
                      onChange={e => setLaborHours(parseFloat(e.target.value) || 0)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Margin %</label>
                    <input
                      type="number"
                      min="0"
                      value={marginPercent}
                      onChange={e => setMarginPercent(parseFloat(e.target.value) || 0)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal (Materials + Labor)</span>
                    <span className="font-medium text-white">{formatCurrency(totals.subTotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Profit Margin ({marginPercent}%)</span>
                    <span className="font-medium text-gold-500">+{formatCurrency(totals.marginAmount)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-base font-bold text-white">Grand Total</span>
                    <span className="text-3xl font-extrabold text-gold-500 tracking-tight">{formatCurrency(totals.grandTotal)}</span>
                  </div>
                  <button
                    className="btn-primary w-full py-4 text-lg"
                    onClick={() => alert('Quote Saved! (Implement print/export logic here)')}
                  >
                    Generate Proposal
                  </button>
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
