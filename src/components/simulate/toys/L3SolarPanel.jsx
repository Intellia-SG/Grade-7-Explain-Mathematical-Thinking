// src/components/simulate/toys/L3SolarPanel.jsx
import { useState } from 'react';
import { soundTap, soundSnap, soundBust } from '../../../utils/soundEffects';

export default function L3SolarPanel({ onTrialComplete, isMysteryMode = false }) {
  const [sideLength, setSideLength] = useState(0.5);

  const area = Math.round(sideLength * sideLength * 1000) / 1000;
  const isAreaSmaller = area < sideLength;

  const handleTestSide = (val) => {
    soundTap();
    setSideLength(val);
    const newArea = Math.round(val * val * 1000) / 1000;
    const shrinks = newArea < val;

    if (shrinks && val === 0.5) {
      soundBust();
    } else {
      soundSnap();
    }

    if (onTrialComplete) {
      onTrialComplete({
        trialText: `Side ${val}m ➔ Area = ${val}² = ${newArea}m²`,
        leftoverNote: shrinks 
          ? `Area ${newArea}m² < Side ${val}m (SHRUNK! 💥 Counterexample!)` 
          : `Area ${newArea}m² ≥ Side ${val}m`,
        isCounterexample: shrinks,
        tag: '🛰️ Solar Array'
      });
    }
  };

  if (isMysteryMode) {
    return (
      <div className="toy-panel">
        <div className="toy-badge">🛰️ Solar Array Labs — Visual Proof of Fractional Area</div>
        <h4 style={{ color: 'var(--gold)', margin: '8px 0 14px' }}>
          Why Fractions Shrink When Squared
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620, margin: '0 auto 16px' }}>
          A full 1m × 1m square contains 100 grid hundredths. Watch what a 0.5m × 0.5m panel actually covers!
        </p>

        {/* 10x10 Unit Grid Proof Visual */}
        <div style={{ background: 'rgba(0,0,0,0.35)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px', maxWidth: 420, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 2, background: 'rgba(255,255,255,0.05)', padding: 6, borderRadius: 10 }}>
            {Array.from({ length: 100 }).map((_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              const isCovered = row < 5 && col < 5; // 5x5 out of 10x10 = 25%
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    background: isCovered ? '#3b82f6' : 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 2
                  }}
                />
              );
            })}
          </div>
          <div style={{ marginTop: 12, fontSize: '0.85rem', color: '#93c5fd', fontWeight: 800 }}>
            Highlighted: 25 out of 100 squares = 0.25 m²
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            0.5 of width × 0.5 of height = 1/4 of total area!
          </div>
        </div>
      </div>
    );
  }

  // Display size scaled to visual box
  const pixelSize = Math.max(40, Math.min(200, sideLength * 90));

  return (
    <div className="toy-panel">
      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          className={`btn-tag ${sideLength === 0.5 ? 'active' : ''}`}
          onClick={() => handleTestSide(0.5)}
        >
          💥 x = 0.5 (Half Meter)
        </button>
        <button
          className={`btn-tag ${sideLength === 0.2 ? 'active' : ''}`}
          onClick={() => handleTestSide(0.2)}
        >
          🔬 x = 0.2 (Micro Tile)
        </button>
        <button
          className={`btn-tag ${sideLength === 1.0 ? 'active' : ''}`}
          onClick={() => handleTestSide(1.0)}
        >
          ⚖️ x = 1.0 (Unit Square)
        </button>
        <button
          className={`btn-tag ${sideLength === 2.0 ? 'active' : ''}`}
          onClick={() => handleTestSide(2.0)}
        >
          📐 x = 2.0 (Large Array)
        </button>
      </div>

      {/* Main Sandbox Interactive Card */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '18px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
            🛰️ SATELLITE ROOF SOLAR PANEL ARRAY
          </span>
          <span style={{ fontSize: '0.85rem', color: isAreaSmaller ? '#ef4444' : '#86efac', fontWeight: 800 }}>
            {isAreaSmaller ? 'AREA &lt; SIDE (MYTH BUSTED!)' : 'AREA ≥ SIDE'}
          </span>
        </div>

        {/* Live Grid Area Container */}
        <div style={{ height: 210, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px dashed rgba(255,255,255,0.15)', position: 'relative' }}>
          {/* Unit square reference frame (1m x 1m = 90px x 90px) */}
          <div
            style={{
              position: 'absolute',
              width: 90,
              height: 90,
              border: '1.5px dashed rgba(255,255,255,0.25)',
              borderRadius: 4,
              pointerEvents: 'none'
            }}
          >
            <span style={{ position: 'absolute', top: -18, left: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              1m × 1m Ref
            </span>
          </div>

          {/* Actual Resized Panel */}
          <div
            style={{
              width: pixelSize,
              height: pixelSize,
              background: isAreaSmaller 
                ? 'linear-gradient(135deg, rgba(239,68,68,0.35), rgba(59,130,246,0.35))'
                : 'linear-gradient(135deg, rgba(16,185,129,0.35), rgba(59,130,246,0.35))',
              border: `2px solid ${isAreaSmaller ? '#ef4444' : '#10b981'}`,
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.15s ease',
              boxShadow: isAreaSmaller ? '0 0 15px rgba(239,68,68,0.3)' : '0 0 15px rgba(16,185,129,0.3)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>
              Side: {sideLength}m
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 900, color: isAreaSmaller ? '#fca5a5' : '#86efac' }}>
              Area: {area}m²
            </span>
          </div>
        </div>

        {/* Readout and Slider */}
        <div style={{ maxWidth: 440, margin: '16px auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>0.1m (Micro)</span>
            <span style={{ color: 'var(--gold)', fontWeight: 800 }}>Drag Side Length: {sideLength}m</span>
            <span>2.5m (Macro)</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={2.5}
            step={0.1}
            value={sideLength}
            onChange={(e) => handleTestSide(Number(e.target.value))}
            style={{ width: '100%', accentColor: sideLength < 1 ? '#ef4444' : '#10b981', cursor: 'pointer', marginTop: 4 }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.85rem', color: isAreaSmaller ? '#fca5a5' : 'var(--text-secondary)' }}>
          {isAreaSmaller 
            ? `Notice: ${area} m² is SMALLER than the ${sideLength}m edge!`
            : `When side length is ${sideLength}m (≥ 1), the area ${area} m² expands.`}
        </div>
      </div>
    </div>
  );
}
