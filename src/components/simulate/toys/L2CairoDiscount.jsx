// src/components/simulate/toys/L2CairoDiscount.jsx
import { useState } from 'react';
import { soundTap, soundSnap, soundBust } from '../../../utils/soundEffects';

export default function L2CairoDiscount({ onTrialComplete, isMysteryMode = false }) {
  const [multiplier, setMultiplier] = useState(0.5);
  const [basePrice, setBasePrice] = useState(20);
  const [isStackMode, setIsStackMode] = useState(false);
  const [stackOrder, setStackOrder] = useState('20_then_10'); // '20_then_10' vs '10_then_20' vs 'flat_30'

  const currentResult = Math.round(basePrice * multiplier * 100) / 100;
  const isSmaller = currentResult < basePrice;

  // Stack calculation
  const stackResult1 = Math.round(basePrice * 0.8 * 100) / 100; // after 20%
  const stackResult2 = Math.round(stackResult1 * 0.9 * 100) / 100; // after 10%
  const flat30Result = Math.round(basePrice * 0.7 * 100) / 100; // 30% off

  const handleTestPrice = (m, label) => {
    soundTap();
    setMultiplier(m);
    setIsStackMode(false);

    const res = Math.round(basePrice * m * 100) / 100;
    const shrinks = res < basePrice;

    if (shrinks && m === 0.5) {
      soundBust();
    } else {
      soundSnap();
    }

    if (onTrialComplete) {
      onTrialComplete({
        trialText: `$${basePrice} × ${m} = $${res.toFixed(2)}`,
        leftoverNote: shrinks 
          ? `Result $${res.toFixed(2)} < $${basePrice} (SHRUNK! 💥 Counterexample!)` 
          : `Result $${res.toFixed(2)} ≥ $${basePrice} (Grew or Equal)`,
        isCounterexample: shrinks,
        tag: '🏷️ Cairo Bazaar'
      });
    }
  };

  const handleTestStack = () => {
    soundTap();
    setIsStackMode(true);
    soundSnap();

    if (onTrialComplete) {
      onTrialComplete({
        trialText: `$20 × 0.8 × 0.9 = $${stackResult2.toFixed(2)}`,
        leftoverNote: `Stacked 20% then 10% = $14.40 (Different from flat 30% off: $14.00!)`,
        isCounterexample: true,
        tag: '🏷️ Cairo Stacked Discount'
      });
    }
  };

  if (isMysteryMode) {
    return (
      <div className="toy-panel">
        <div className="toy-badge">🏷️ Cairo Bazaar Labs — Multiplier Spectrum Map</div>
        <h4 style={{ color: 'var(--gold)', margin: '8px 0 14px' }}>
          The Mathematical Law of Multipliers
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620, margin: '0 auto 16px' }}>
          Multiplying does not have a single direction. The multiplier value determines whether quantity shrinks, stays frozen, or grows!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid #ef4444', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
            <div style={{ color: '#fca5a5', fontWeight: 800, fontSize: '1rem' }}>📉 Shrink Zone</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: '6px 0' }}>0 &lt; m &lt; 1</div>
            <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>
              e.g. × 0.5, × 0.8.<br />Taking a fraction scales DOWN!
            </div>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.15)', border: '2px solid #f59e0b', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
            <div style={{ color: '#fcd34d', fontWeight: 800, fontSize: '1rem' }}>⚖️ Identity Point</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: '6px 0' }}>m = 1.0</div>
            <div style={{ fontSize: '0.8rem', color: '#fcd34d' }}>
              e.g. $20 × 1 = $20.<br />Preserves identical value.
            </div>
          </div>

          <div style={{ background: 'rgba(76,175,80,0.15)', border: '2px solid #4caf50', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
            <div style={{ color: '#86efac', fontWeight: 800, fontSize: '1rem' }}>📈 Growth Zone</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: '6px 0' }}>m &gt; 1.0</div>
            <div style={{ fontSize: '0.8rem', color: '#86efac' }}>
              e.g. × 1.5, × 2.0.<br />Only here does price increase!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="toy-panel">
      {/* Preset Tags */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          className={`btn-tag ${multiplier === 0.5 && !isStackMode ? 'active' : ''}`}
          onClick={() => handleTestPrice(0.5, '50% Off')}
        >
          💥 50% Off (× 0.5)
        </button>
        <button
          className={`btn-tag ${multiplier === 0.8 && !isStackMode ? 'active' : ''}`}
          onClick={() => handleTestPrice(0.8, '20% Off')}
        >
          🏷️ 20% Off (× 0.8)
        </button>
        <button
          className={`btn-tag ${multiplier === 1.0 && !isStackMode ? 'active' : ''}`}
          onClick={() => handleTestPrice(1.0, 'No Change')}
        >
          ⚖️ Full Price (× 1.0)
        </button>
        <button
          className={`btn-tag ${multiplier === 1.5 && !isStackMode ? 'active' : ''}`}
          onClick={() => handleTestPrice(1.5, 'Markup')}
        >
          📈 50% Markup (× 1.5)
        </button>
        <button
          className={`btn-tag ${isStackMode ? 'active' : ''}`}
          onClick={handleTestStack}
          style={{ borderColor: isStackMode ? 'var(--gold)' : undefined }}
        >
          ✨ Stacked: 20% + 10%
        </button>
      </div>

      {/* Main Bazaar Display Card */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '18px', maxWidth: 680, margin: '0 auto' }}>
        {!isStackMode ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
                🏺 KHAN EL-KHALILI BAZAAR PRICE MACHINE
              </span>
              <span style={{ fontSize: '0.85rem', color: isSmaller ? '#ef4444' : '#86efac', fontWeight: 800 }}>
                {isSmaller ? 'STATUS: SHRUNK (COUNTEREXAMPLE!)' : 'STATUS: GREATER OR EQUAL'}
              </span>
            </div>

            {/* Price Tag Comparison Visual */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap', margin: '14px 0' }}>
              {/* Original Price Tag */}
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: 12, padding: '12px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Original Price</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>${basePrice}.00</div>
              </div>

              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold)' }}>
                × {multiplier} ➔
              </div>

              {/* Discounted Price Tag */}
              <div style={{ background: isSmaller ? 'rgba(239,68,68,0.2)' : 'rgba(76,175,80,0.2)', border: `2px solid ${isSmaller ? '#ef4444' : '#4caf50'}`, borderRadius: 12, padding: '12px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: isSmaller ? '#fca5a5' : '#86efac', textTransform: 'uppercase', fontWeight: 800 }}>
                  Calculated Price
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: isSmaller ? '#fca5a5' : '#86efac' }}>
                  ${currentResult.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div style={{ maxWidth: 440, margin: '14px auto 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>0.1 (Shrink)</span>
                <span style={{ color: 'var(--gold)', fontWeight: 800 }}>Multiplier: × {multiplier}</span>
                <span>2.5 (Grow)</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={2.5}
                step={0.1}
                value={multiplier}
                onChange={(e) => {
                  const m = Number(e.target.value);
                  handleTestPrice(m, `× ${m}`);
                }}
                style={{ width: '100%', accentColor: multiplier < 1 ? '#ef4444' : '#10b981', cursor: 'pointer', marginTop: 4 }}
              />
            </div>
          </div>
        ) : (
          /* Stacked Discounts Comparison */
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800, marginBottom: 10 }}>
              🏷️ STACKED DISCOUNTS: 20% OFF THEN 10% OFF
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', margin: '12px 0' }}>
              <div style={{ background: 'rgba(59,130,246,0.15)', border: '1.5px solid #3b82f6', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>Step 1: $20 × 0.8</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>= $16.00</div>
              </div>
              <div style={{ fontSize: '1.4rem', color: 'var(--gold)', alignSelf: 'center' }}>➔</div>
              <div style={{ background: 'rgba(16,185,129,0.15)', border: '1.5px solid #10b981', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#86efac' }}>Step 2: $16 × 0.9</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#86efac' }}>= $14.40</div>
              </div>
              <div style={{ fontSize: '1.4rem', color: 'var(--coral)', alignSelf: 'center' }}>≠</div>
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#fca5a5' }}>Flat 30% Off</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fca5a5' }}>= $14.00</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0 0' }}>
              Notice: The 10% is taken from the new $16 price, not the original $20! So 20% + 10% stacked does not equal 30% off.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
