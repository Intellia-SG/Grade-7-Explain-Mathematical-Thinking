// src/components/simulate/toys/L1TokyoBento.jsx
import { useState } from 'react';
import { soundSnap, soundTap } from '../../../utils/soundEffects';

export default function L1TokyoBento({ onTrialComplete, isMysteryMode = false }) {
  const [numA, setNumA] = useState(7);
  const [numB, setNumB] = useState(9);
  const [isFused, setIsFused] = useState(false);
  const [isCombining, setIsCombining] = useState(false);
  const [showEvenContrast, setShowEvenContrast] = useState(false);

  const effectiveA = showEvenContrast ? 6 : numA;
  const effectiveB = showEvenContrast ? 4 : numB;
  const total = effectiveA + effectiveB;

  const pairsA = Math.floor(effectiveA / 2);
  const leftA = effectiveA % 2;
  const pairsB = Math.floor(effectiveB / 2);
  const leftB = effectiveB % 2;

  const handleCombine = () => {
    soundTap();
    setIsCombining(true);

    setTimeout(() => {
      setIsFused(true);
      setIsCombining(false);
      soundSnap();

      if (onTrialComplete) {
        onTrialComplete({
          trialText: `Order ${effectiveA} + ${effectiveB} = ${total}`,
          leftoverNote: leftA === 1 && leftB === 1 
            ? 'Leftovers (1 + 1) fused into new 2-pack! 0 left (EVEN)' 
            : `${total % 2} leftover (EVEN)`,
          isEven: total % 2 === 0,
          tag: '🍱 Bento Conveyor'
        });
      }
    }, 600);
  };

  const handleReset = (newA, newB) => {
    soundTap();
    setNumA(newA);
    setNumB(newB);
    setIsFused(false);
    setShowEvenContrast(false);
  };

  if (isMysteryMode) {
    return (
      <div className="toy-panel">
        <div className="toy-badge">🍱 Tokyo Bento Labs — General Proof Mode</div>
        <h4 style={{ color: 'var(--gold)', margin: '8px 0 16px' }}>
          The Mystery Bento Crate: n Pairs + 1 Leftover
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 600, margin: '0 auto 16px' }}>
          Instead of fixed numbers like 7 and 9, imagine two mystery orders of ANY unknown size!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Mystery Crate A */}
          <div style={{ background: 'rgba(59,130,246,0.15)', border: '2px solid #3b82f6', borderRadius: 16, padding: '16px 20px', minWidth: 200 }}>
            <div style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 800 }}>Mystery Order A (Odd)</div>
            <div style={{ fontSize: '1.4rem', margin: '12px 0' }}>📦 [n × 2-packs]</div>
            <div style={{ background: 'rgba(245,158,11,0.25)', border: '2px dashed #f59e0b', borderRadius: 10, padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '1.5rem' }}>🥟</span>
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.85rem' }}>+1 Leftover</span>
            </div>
          </div>

          <div style={{ fontSize: '2rem', color: 'var(--gold)', fontWeight: 900 }}>+</div>

          {/* Mystery Crate B */}
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981', borderRadius: 16, padding: '16px 20px', minWidth: 200 }}>
            <div style={{ fontSize: '0.85rem', color: '#86efac', fontWeight: 800 }}>Mystery Order B (Odd)</div>
            <div style={{ fontSize: '1.4rem', margin: '12px 0' }}>📦 [m × 2-packs]</div>
            <div style={{ background: 'rgba(245,158,11,0.25)', border: '2px dashed #f59e0b', borderRadius: 10, padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '1.5rem' }}>🥟</span>
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.85rem' }}>+1 Leftover</span>
            </div>
          </div>
        </div>

        {/* Mystery Fusion Result */}
        <div style={{ marginTop: 20, background: 'rgba(76,175,80,0.15)', border: '2px solid #4caf50', borderRadius: 16, padding: '16px', maxWidth: 620, margin: '20px auto 0' }}>
          <div style={{ color: '#86efac', fontWeight: 800, fontSize: '1.1rem' }}>
            Combined: (n + m) Pairs + (1 + 1 Leftovers)
          </div>
          <div style={{ fontSize: '1.8rem', margin: '10px 0' }}>
            🥟 + 🥟 ➔ 📦 <strong style={{ color: 'var(--gold)' }}>Brand New 2-Pack!</strong>
          </div>
          <p style={{ color: 'white', fontSize: '0.9rem', margin: 0 }}>
            Since (1 + 1 = 2) always forms one more full 2-pack, <strong>zero leftovers can ever remain</strong>. This proves odd + odd = even for ANY odd numbers!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="toy-panel">
      {/* Quick presets */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          className={`btn-tag ${numA === 7 && numB === 9 && !showEvenContrast ? 'active' : ''}`}
          onClick={() => handleReset(7, 9)}
        >
          Base Case: 7 + 9
        </button>
        <button
          className={`btn-tag ${numA === 3 && numB === 5 && !showEvenContrast ? 'active' : ''}`}
          onClick={() => handleReset(3, 5)}
        >
          Small: 3 + 5
        </button>
        <button
          className={`btn-tag ${numA === 11 && numB === 13 && !showEvenContrast ? 'active' : ''}`}
          onClick={() => handleReset(11, 13)}
        >
          Large: 11 + 13
        </button>
        <button
          className={`btn-tag ${showEvenContrast ? 'active' : ''}`}
          onClick={() => {
            soundTap();
            setShowEvenContrast(true);
            setIsFused(false);
          }}
          style={{ borderColor: showEvenContrast ? 'var(--gold)' : 'rgba(255,255,255,0.2)' }}
        >
          🔍 Even Contrast (6 + 4)
        </button>
      </div>

      {/* Sliders for manual testing */}
      {!showEvenContrast && (
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 18px', maxWidth: 640, margin: '0 auto 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 800 }}>
              Order A: {numA} dumplings ({numA % 2 === 0 ? 'EVEN' : 'ODD'})
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={2}
              value={numA}
              onChange={(e) => {
                setNumA(Number(e.target.value));
                setIsFused(false);
              }}
              style={{ width: 140, accentColor: '#3b82f6', marginTop: 4, cursor: 'pointer' }}
            />
          </div>

          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)' }}>+</div>

          <div>
            <div style={{ fontSize: '0.85rem', color: '#86efac', fontWeight: 800 }}>
              Order B: {numB} dumplings ({numB % 2 === 0 ? 'EVEN' : 'ODD'})
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={2}
              value={numB}
              onChange={(e) => {
                setNumB(Number(e.target.value));
                setIsFused(false);
              }}
              style={{ width: 140, accentColor: '#10b981', marginTop: 4, cursor: 'pointer' }}
            />
          </div>
        </div>
      )}

      {/* Animated Conveyor Belt */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '16px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
            🥟 TOKYO 2-PACK PACKING CONVEYOR
          </span>
          <span style={{ fontSize: '0.85rem', color: total % 2 === 0 ? '#86efac' : '#fca5a5', fontWeight: 800 }}>
            Total: {total} ({total % 2 === 0 ? 'EVEN ✓' : 'ODD'})
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Box A */}
          <div style={{ background: 'rgba(59,130,246,0.1)', border: '2px solid #3b82f6', borderRadius: 14, padding: '10px', minWidth: 150 }}>
            <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 800, marginBottom: 8 }}>
              Box A: {effectiveA} ({pairsA} pairs {leftA > 0 ? '+ 1 single' : ''})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              {Array.from({ length: Math.min(5, pairsA) }).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: 4, background: 'rgba(59,130,246,0.25)', border: '1px solid #60a5fa', borderRadius: 8, padding: '2px 8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🥟</span>
                  <span style={{ fontSize: '1.2rem' }}>🥟</span>
                </div>
              ))}
              {pairsA > 5 && <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>+{pairsA - 5} more packs</div>}
              {leftA > 0 && !isFused && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(245,158,11,0.25)', border: '2px dashed #f59e0b', borderRadius: 8, padding: '3px 10px', animation: 'pulse 1.2s infinite' }}>
                  <span style={{ fontSize: '1.3rem' }}>🥟</span>
                  <span style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 800 }}>1 Single</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ alignSelf: 'center', fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold)' }}>+</div>

          {/* Box B */}
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981', borderRadius: 14, padding: '10px', minWidth: 150 }}>
            <div style={{ fontSize: '0.8rem', color: '#86efac', fontWeight: 800, marginBottom: 8 }}>
              Box B: {effectiveB} ({pairsB} pairs {leftB > 0 ? '+ 1 single' : ''})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              {Array.from({ length: Math.min(5, pairsB) }).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: 4, background: 'rgba(16,185,129,0.25)', border: '1px solid #34d399', borderRadius: 8, padding: '2px 8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🥟</span>
                  <span style={{ fontSize: '1.2rem' }}>🥟</span>
                </div>
              ))}
              {pairsB > 5 && <div style={{ fontSize: '0.75rem', color: '#86efac' }}>+{pairsB - 5} more packs</div>}
              {leftB > 0 && !isFused && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(245,158,11,0.25)', border: '2px dashed #f59e0b', borderRadius: 8, padding: '3px 10px', animation: 'pulse 1.2s infinite' }}>
                  <span style={{ fontSize: '1.3rem' }}>🥟</span>
                  <span style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 800 }}>1 Single</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button & Fusion Reaction */}
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          {!isFused ? (
            <button
              className="btn btn-primary"
              onClick={handleCombine}
              disabled={isCombining}
              style={{ minWidth: 220 }}
            >
              {isCombining ? '⚡ Combining Leftovers...' : '⚡ PACK & COMBINE ORDERS!'}
            </button>
          ) : (
            <div style={{ background: 'rgba(76,175,80,0.2)', border: '2px solid #4caf50', borderRadius: 14, padding: '12px 18px', display: 'inline-block', animation: 'correctPulse 0.4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '1.4rem' }}>
                <span>🥟</span>
                <span style={{ color: 'var(--gold)', fontWeight: 900 }}>+</span>
                <span>🥟</span>
                <span style={{ color: '#86efac', fontWeight: 900 }}>=</span>
                <span style={{ background: '#4caf50', color: 'white', padding: '3px 10px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 800 }}>
                  NEW COMPLETE 2-PACK!
                </span>
              </div>
              <div style={{ color: '#86efac', fontWeight: 800, fontSize: '0.85rem', marginTop: 6 }}>
                Leftovers: 0 | Total: {total} (Even) ✓
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
