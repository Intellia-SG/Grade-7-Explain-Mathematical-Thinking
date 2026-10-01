// src/components/simulate/toys/L4BridgeAudit.jsx
import { useState } from 'react';
import { soundTap, soundSnap, soundBust } from '../../../utils/soundEffects';

export default function L4BridgeAudit({ onTrialComplete, isMysteryMode = false }) {
  const [baseLoad, setBaseLoad] = useState(-5);
  const [subtractedLoad, setSubtractedLoad] = useState(-8);
  const [isBugActive, setIsBugActive] = useState(false);

  // Correct calculation: -5 - (-8) = -5 + 8 = +3 MN
  // Contractor bug: -5 - (+8) = -13 MN
  const calculatedTension = isBugActive 
    ? baseLoad - Math.abs(subtractedLoad) 
    : baseLoad - subtractedLoad;

  const isSafe = calculatedTension > 0;

  const handleTestTension = (a, b, bug = false) => {
    soundTap();
    setBaseLoad(a);
    setSubtractedLoad(b);
    setIsBugActive(bug);

    const result = bug ? a - Math.abs(b) : a - b;
    if (bug) {
      soundBust();
    } else {
      soundSnap();
    }

    if (onTrialComplete) {
      onTrialComplete({
        trialText: bug 
          ? `Buggy: ${a} − ${Math.abs(b)} = ${result} MN` 
          : `${a} − (${b}) = ${a} + ${Math.abs(b)} = +${result} MN`,
        leftoverNote: bug 
          ? `Tension spiked to ${result} MN (Contractor Sign Error! 💥)` 
          : `Tension safely resolved to +${result} MN (Safe positive load ✓)`,
        isSafe: !bug,
        tag: '🌉 Sea Link Audit'
      });
    }
  };

  if (isMysteryMode) {
    return (
      <div className="toy-panel">
        <div className="toy-badge">🌉 Sea Link Labs — Vector Reversal Number Line Proof</div>
        <h4 style={{ color: 'var(--gold)', margin: '8px 0 14px' }}>
          Why Subtracting a Negative Moves Positive
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620, margin: '0 auto 16px' }}>
          On a coordinate axis, subtraction means finding the difference or facing in the reverse direction.
        </p>

        <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px', maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
          {/* Number line representation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0', position: 'relative' }}>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }} />
            
            {[-10, -5, 0, 5, 10].map(val => (
              <div key={val} style={{ zIndex: 1, textAlign: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: val === 3 ? 'var(--gold)' : 'white', margin: '0 auto' }} />
                <span style={{ fontSize: '0.75rem', color: val === 3 ? 'var(--gold)' : 'var(--text-muted)' }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid #3b82f6', borderRadius: 10, padding: '10px 14px', color: '#93c5fd', fontSize: '0.85rem' }}>
            <strong>1.</strong> Face LEFT (subtraction).<br />
            <strong>2.</strong> Walk BACKWARDS by 8 units (−8).<br />
            <strong>Result:</strong> Walking backwards while facing left moves you <strong>RIGHTWARD (+8)</strong>!
          </div>
        </div>
      </div>
    );
  }

  // Gauge angle calculation: maps from -15 to +15 MN -> -90 deg to +90 deg
  const clampedTension = Math.max(-15, Math.min(15, calculatedTension));
  const gaugeAngle = (clampedTension / 15) * 80;

  return (
    <div className="toy-panel">
      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          className={`btn-tag ${baseLoad === -5 && subtractedLoad === -8 && !isBugActive ? 'active' : ''}`}
          onClick={() => handleTestTension(-5, -8, false)}
        >
          ✅ Blueprint: −5 − (−8)
        </button>
        <button
          className={`btn-tag ${isBugActive ? 'active' : ''}`}
          onClick={() => handleTestTension(-5, -8, true)}
          style={{ borderColor: isBugActive ? '#ef4444' : undefined, color: isBugActive ? '#fca5a5' : undefined }}
        >
          ❌ Contractor Bug: −5 − 8
        </button>
        <button
          className={`btn-tag ${baseLoad === -2 && subtractedLoad === -6 && !isBugActive ? 'active' : ''}`}
          onClick={() => handleTestTension(-2, -6, false)}
        >
          💨 Light Gust: −2 − (−6)
        </button>
        <button
          className={`btn-tag ${baseLoad === 0 && subtractedLoad === -10 && !isBugActive ? 'active' : ''}`}
          onClick={() => handleTestTension(0, -10, false)}
        >
          🌪️ Pure Reversal: 0 − (−10)
        </button>
      </div>

      {/* Main Bridge Gauge Display Card */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '18px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
            🌉 BANDRA-WORLI SEA LINK CABLE STRESS AUDIT
          </span>
          <span style={{ fontSize: '0.85rem', color: isSafe ? '#86efac' : '#ef4444', fontWeight: 800 }}>
            {isSafe ? 'TENSION: SAFE (+3 MN) ✓' : 'CRITICAL OVERLOAD (−13 MN) ⚠️'}
          </span>
        </div>

        {/* Gauge Visual */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, flexWrap: 'wrap', margin: '14px 0' }}>
          {/* Circular SVG Gauge */}
          <div style={{ position: 'relative', width: 160, height: 100 }}>
            <svg viewBox="0 0 160 100" style={{ width: '100%', height: '100%' }}>
              {/* Dial Arc */}
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="12"
              />
              <path
                d="M 20 80 A 60 60 0 0 1 80 20"
                fill="none"
                stroke="#ef4444"
                strokeWidth="10"
                opacity="0.8"
              />
              <path
                d="M 80 20 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                opacity="0.8"
              />

              {/* Gauge Needle */}
              <line
                x1="80"
                y1="80"
                x2="80"
                y2="30"
                stroke={isSafe ? 'var(--gold)' : '#ef4444'}
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${gaugeAngle}, 80, 80)`}
                style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              <circle cx="80" cy="80" r="6" fill="white" />
            </svg>
            <div style={{ textAlign: 'center', marginTop: -10, fontSize: '1.2rem', fontWeight: 900, color: isSafe ? '#86efac' : '#fca5a5' }}>
              {calculatedTension > 0 ? `+${calculatedTension}` : calculatedTension} MN
            </div>
          </div>

          {/* Equation Breakdown Box */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${isSafe ? '#10b981' : '#ef4444'}`, borderRadius: 12, padding: '12px 18px', minWidth: 220 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Calculated Stress Vector
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: '4px 0' }}>
              {isBugActive ? (
                <span style={{ color: '#fca5a5' }}>−5 − 8 = −13 MN ⚠️</span>
              ) : (
                <span style={{ color: '#86efac' }}>−5 − (−8) = −5 + 8 = +3 MN ✓</span>
              )}
            </div>
            <div style={{ fontSize: '0.8rem', color: isSafe ? '#86efac' : '#fca5a5' }}>
              {isSafe 
                ? 'Removing negative wind load pulls cable into positive stability.' 
                : 'Treating −(−8) as −8 created a phantom 16 MN collapse risk!'}
            </div>
          </div>
        </div>

        {/* Action Toggle */}
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          {isBugActive ? (
            <button
              className="btn btn-primary"
              onClick={() => handleTestTension(-5, -8, false)}
            >
              🛠️ FIX CONTRACTOR SIGN BUG (−(−8) ➔ +8)
            </button>
          ) : (
            <div style={{ color: '#86efac', fontWeight: 800, fontSize: '0.85rem' }}>
              ✅ Bridge Structure Certified: Subtracting negative drag produces +3 MN safe tension.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
