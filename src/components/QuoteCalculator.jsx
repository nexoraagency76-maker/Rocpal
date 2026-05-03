import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Check, ArrowLeft, X, Tag } from 'lucide-react';
import { formatCurrency, calculateGrandTotal } from '../utils/calculator';
import { getImageUrl } from '../data/inventory';

/* ── shared style tokens ── */
const S = {
  card:   { background: '#111', border: '1px solid #222', borderRadius: 16 },
  panel:  { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16 },
  input:  { background: '#000', border: '1px solid #2a2a2a', borderRadius: 10, padding: '10px 14px', color: '#fff', width: '100%', outline: 'none', fontSize: 14 },
  gold:   '#dca43b',
  dim:    'rgba(255,255,255,0.45)',
};

const QuoteCalculator = ({
  db,
  lineItems, setLineItems,
  customItems, setCustomItems,
  laborHours, setLaborHours,
  marginPercent, setMarginPercent,
}) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  const addItem = (item) =>
    setLineItems(prev => {
      const ex = prev.find(i => i.item.id === item.id);
      return ex ? prev.map(i => i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i)
                : [...prev, { item, qty: 1 }];
    });

  const setQty  = (id, q) => q > 0 && setLineItems(prev => prev.map(i => i.item.id === id ? { ...i, qty: q } : i));
  const delItem = (id)    => setLineItems(prev => prev.filter(i => i.item.id !== id));
  const delCustom = (id)  => setCustomItems(prev => prev.filter(i => i.id !== id));

  const addCustom = (e) => {
    e.preventDefault();
    if (!customName || !customPrice) return;
    setCustomItems(prev => [...prev, { id: `c-${Date.now()}`, name: customName, price: parseFloat(customPrice), qty: 1 }]);
    setCustomName(''); setCustomPrice(''); setShowModal(false);
  };

  const totals    = calculateGrandTotal(lineItems, customItems, laborHours, 85, marginPercent);
  const itemCount = lineItems.reduce((a, i) => a + i.qty, 0) + customItems.reduce((a, i) => a + i.qty, 0);
  const categories = Object.keys(db);

  return (
    <div style={{ background: '#000', minHeight: 'calc(100vh - 80px)', paddingBottom: 60 }}>
      <div className="max-w-7xl mx-auto" style={{ padding: '32px 16px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: 0 }}>Quote Builder</h2>
            <p style={{ color: S.dim, fontSize: 13, margin: '4px 0 0' }}>Select materials and configure your project</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(220,164,59,0.1)', border:'1px solid rgba(220,164,59,0.3)', borderRadius:10, padding:'9px 16px', color:S.gold, fontSize:13, fontWeight:600, cursor:'pointer' }}
          >
            <Plus size={14} /> Custom Item
          </button>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

          {/* ── LEFT: Category grid / Item list ── */}
          <div>
            {!activeCategory ? (
              <>
                <p style={{ color: S.dim, fontSize: 13, marginBottom: 16 }}>Choose a category to browse materials</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        position: 'relative', height: 160, borderRadius: 14, overflow: 'hidden',
                        border: '1px solid #1e1e1e', cursor: 'pointer', background: '#111',
                        transition: 'transform 0.2s, box-shadow 0.2s', textAlign: 'left', padding: 0,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(220,164,59,0.2)'; e.currentTarget.style.borderColor = 'rgba(220,164,59,0.4)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#1e1e1e'; }}
                    >
                      <img src={getImageUrl(cat)} alt={cat} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 100%)' }} />
                      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px' }}>
                        <div style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{cat}</div>
                        <div style={{ color:S.gold, fontSize:11, marginTop:2 }}>{db[cat].length} item{db[cat].length !== 1 ? 's' : ''}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Back + category name */}
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                  <button
                    onClick={() => setActiveCategory(null)}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', width:36, height:36, borderRadius:'50%', background:'#111', border:'1px solid #222', color:'#aaa', cursor:'pointer' }}
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h3 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:0 }}>{activeCategory}</h3>
                </div>

                {/* Item rows */}
                <div style={{ ...S.card, overflow:'hidden' }}>
                  {db[activeCategory].map((item, idx) => {
                    const inCart = lineItems.find(i => i.item.id === item.id);
                    return (
                      <div
                        key={item.id}
                        style={{
                          display:'flex', alignItems:'center', gap:16, padding:'18px 20px',
                          borderBottom: idx < db[activeCategory].length - 1 ? '1px solid #1a1a1a' : 'none',
                          background: inCart ? 'rgba(220,164,59,0.04)' : 'transparent',
                          transition: 'background 0.2s',
                        }}
                      >
                        {/* Thumbnail */}
                        <div style={{ width:64, height:64, borderRadius:10, overflow:'hidden', flexShrink:0, border:'1px solid #222' }}>
                          <img src={getImageUrl(item.category)} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }} />
                        </div>

                        {/* Info */}
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <span style={{ color:'#fff', fontWeight:700, fontSize:15 }}>{item.name}</span>
                            {inCart && (
                              <span style={{ background:'rgba(220,164,59,0.15)', border:'1px solid rgba(220,164,59,0.3)', color:S.gold, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:99, display:'flex', alignItems:'center', gap:3 }}>
                                <Check size={9} /> Added
                              </span>
                            )}
                          </div>
                          <div style={{ color:S.dim, fontSize:13, marginTop:3 }}>
                            {formatCurrency(item.price)}{item.unit !== 'ea' ? ` / ${item.unit}` : ''}
                          </div>
                          {item.note && <div style={{ color:S.gold, fontSize:11, marginTop:2 }}>{item.note}</div>}
                        </div>

                        {/* Add button */}
                        <button
                          onClick={() => addItem(item)}
                          style={{
                            flexShrink:0, padding:'10px 20px', borderRadius:10, fontWeight:700, fontSize:13, cursor:'pointer', border:'none', transition:'all 0.15s',
                            ...(inCart
                              ? { background:'transparent', border:'1px solid rgba(220,164,59,0.4)', color:S.gold }
                              : { background:S.gold, color:'#000', boxShadow:'0 4px 16px rgba(220,164,59,0.3)' }),
                          }}
                        >
                          {inCart ? 'Add More' : 'Add to Quote'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: Quote summary ── */}
          <div style={{ ...S.panel, position:'sticky', top:100, display:'flex', flexDirection:'column', maxHeight:'calc(100vh - 120px)' }}>
            {/* Summary header */}
            <div style={{ padding:'20px 22px', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'#fff', fontWeight:700, fontSize:16 }}>
                <ShoppingCart size={18} color={S.gold} /> Quote Summary
              </div>
              <span style={{ background:S.gold, color:'#000', fontWeight:800, fontSize:11, padding:'3px 10px', borderRadius:99 }}>{itemCount}</span>
            </div>

            {/* Item scroll area */}
            <div style={{ flex:1, overflowY:'auto', padding:'16px 22px' }}>
              {lineItems.length === 0 && customItems.length === 0 ? (
                <div style={{ textAlign:'center', padding:'40px 0', color:'#333' }}>
                  <ShoppingCart size={36} style={{ margin:'0 auto 12px', display:'block', opacity:0.3 }} />
                  <p style={{ margin:0 }}>Your quote is empty.</p>
                  <p style={{ margin:'4px 0 0', fontSize:12 }}>Select a category to add items.</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {lineItems.map(({ item, qty }) => (
                    <div key={item.id} style={{ display:'flex', gap:12 }}>
                      <div style={{ width:52, height:52, borderRadius:10, overflow:'hidden', flexShrink:0, border:'1px solid #222' }}>
                        <img src={getImageUrl(item.category)} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.8 }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                          <span style={{ color:'#fff', fontWeight:600, fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8 }}>{item.name}</span>
                          <span style={{ color:S.gold, fontWeight:700, fontSize:13, flexShrink:0 }}>{formatCurrency(item.price * qty)}</span>
                        </div>
                        <div style={{ color:S.dim, fontSize:11, marginTop:2 }}>{formatCurrency(item.price)}{item.unit !== 'ea' ? ` / ${item.unit}` : ''}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:8 }}>
                          <div style={{ display:'flex', alignItems:'center', background:'#000', border:'1px solid #222', borderRadius:8 }}>
                            <button onClick={() => setQty(item.id, qty-1)} style={{ background:'none', border:'none', color:'#666', cursor:'pointer', padding:'4px 8px', display:'flex' }}><Minus size={12}/></button>
                            <span style={{ color:'#fff', fontSize:12, fontWeight:600, width:22, textAlign:'center' }}>{qty}</span>
                            <button onClick={() => setQty(item.id, qty+1)} style={{ background:'none', border:'none', color:'#666', cursor:'pointer', padding:'4px 8px', display:'flex' }}><Plus size={12}/></button>
                          </div>
                          <button onClick={() => delItem(item.id)} style={{ background:'none', border:'none', color:'#444', cursor:'pointer', display:'flex', padding:0 }}><Trash2 size={13}/></button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {customItems.map(item => (
                    <div key={item.id} style={{ display:'flex', gap:12 }}>
                      <div style={{ width:52, height:52, borderRadius:10, flexShrink:0, border:'1px solid #222', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', color:'#333' }}>
                        <Tag size={18}/>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                          <span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>{item.name}</span>
                          <span style={{ color:S.gold, fontWeight:700, fontSize:13 }}>{formatCurrency(item.price)}</span>
                        </div>
                        <div style={{ color:S.dim, fontSize:11, marginTop:2 }}>Custom item</div>
                        <button onClick={() => delCustom(item.id)} style={{ background:'none', border:'none', color:'#444', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:11, marginTop:6, padding:0 }}>
                          <Trash2 size={12}/> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Labor + totals */}
            <div style={{ padding:'18px 22px', borderTop:'1px solid #1a1a1a', background:'#000', borderBottomLeftRadius:16, borderBottomRightRadius:16 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
                <div>
                  <label style={{ display:'block', color:'#555', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>Labor Hrs</label>
                  <input type="number" min="0" value={laborHours} onChange={e => setLaborHours(parseFloat(e.target.value)||0)} style={S.input} />
                </div>
                <div>
                  <label style={{ display:'block', color:'#555', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>Margin %</label>
                  <input type="number" min="0" value={marginPercent} onChange={e => setMarginPercent(parseFloat(e.target.value)||0)} style={S.input} />
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13, marginBottom:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', color:S.dim }}>
                  <span>Subtotal</span>
                  <span style={{ color:'#fff' }}>{formatCurrency(totals.subTotal)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', color:S.dim }}>
                  <span>Margin ({marginPercent}%)</span>
                  <span style={{ color:S.gold }}>+{formatCurrency(totals.marginAmount)}</span>
                </div>
              </div>

              <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:16 }}>
                  <span style={{ color:'#fff', fontWeight:700, fontSize:15 }}>Grand Total</span>
                  <span style={{ color:S.gold, fontWeight:900, fontSize:28, letterSpacing:'-0.02em' }}>{formatCurrency(totals.grandTotal)}</span>
                </div>
                <button
                  onClick={() => alert('Quote ready! (Add print/export logic here)')}
                  style={{
                    width:'100%', padding:'14px', background:S.gold, color:'#000', fontWeight:800, fontSize:14,
                    borderRadius:12, border:'none', cursor:'pointer', letterSpacing:'0.04em',
                    boxShadow:'0 4px 24px rgba(220,164,59,0.35)', transition:'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='#e8c97d'; }}
                  onMouseLeave={e => { e.currentTarget.style.background=S.gold; }}
                >
                  Generate Proposal
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Custom item modal ── */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div style={{ ...S.card, width:'100%', maxWidth:420, padding:28, position:'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', color:'#555', cursor:'pointer', display:'flex' }}><X size={20}/></button>
            <h3 style={{ color:'#fff', fontSize:18, fontWeight:800, margin:'0 0 24px' }}>Add Custom Item</h3>
            <form onSubmit={addCustom} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', color:S.dim, fontSize:12, fontWeight:600, marginBottom:6 }}>Description</label>
                <input type="text" value={customName} onChange={e=>setCustomName(e.target.value)} style={S.input} placeholder="e.g. Bosch Dishwasher" autoFocus required />
              </div>
              <div>
                <label style={{ display:'block', color:S.dim, fontSize:12, fontWeight:600, marginBottom:6 }}>Price ($)</label>
                <input type="number" step="0.01" min="0" value={customPrice} onChange={e=>setCustomPrice(e.target.value)} style={S.input} placeholder="0.00" required />
              </div>
              <button type="submit" style={{ background:S.gold, color:'#000', fontWeight:800, fontSize:14, padding:'13px', borderRadius:10, border:'none', cursor:'pointer', marginTop:4 }}>
                Add to Quote
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteCalculator;
