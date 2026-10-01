// src/components/simulate/toys/L5ContainerSequence.jsx
import { useState } from 'react';
import { soundTap, soundSnap, soundBust } from '../../../utils/soundEffects';

export default function L5ContainerSequence({ onTrialComplete, isMysteryMode = false }) {
  const [crateCount, setCrateCount] = useState(4);
  const [isFastForwarding, setIsFastForwarding] = useState(false);
  const [showFlawComparison, setShowFlawComparison] = useState(false);

  const baseWeight = 6;
  const crateWeight = 5;

  // Correct: 6 + (n * 5)
  const trueWeight = baseWeight + crateCount * crateWeight;
  // Flawed operator mistake: (6 + n) * 5
  const flawedWeight = (baseWeight + crateCount) * crateWeight;

  const handleTestTerm = (n, fast = false) => {
    soundTap();
    setCrateCount(n);

    if (fast) {
      setIsFastForwarding(true);
      setTimeout(() => {
        setIsFastForwarding(false);
        soundSnap();
      }, 400);
    } else {
      soundSnap();
    }

    const correctTotal = baseWeight + n * crateWeight;

    if (onTrialComplete) {
      onTrialComplete({
        trialText: `n = ${n} crates ➔ 6 + (${n} × 5) = ${correctTotal}t`,
        leftoverNote: `${n} crates group into ${n * 5}t. Adding base 6t = ${correctTotal}t (Not ${(baseWeight + n) * crateWeight}t!)`,
        isCorrect: true,
        tag: '🚢 Mumbai Port Sequence'
      });
    }
  };

  const handleTestFlaw = () => {
    soundTap();
    setShowFlawComparison(true);
    soundBust();

    if (onTrialComplete) {
      onTrialComplete({
        trialText: `Flawed: (6 + 4) × 5 = 50 Tons ⚠️`,
        leftoverNote: `Adding before multiplying created 24 imaginary tons! True: 26t`,
        isFlawed: true,
        tag: '🚢 Operator Order Error'
      });
    }
  };

  if (isMysteryMode) {
    return (
      <div className="toy-panel">
        <div className="toy-badge">🚢 Port Logistics Labs — Sequence Generalisation Rule</div>
        <h4 style={{ color: 'var(--gold)', margin: '8px 0 14px' }}>
          General Rule: T(n) = 6 + 5n
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620, margin: '0 auto 16px' }}>
          Notice how the formula mirrors physical reality: 1 base container (6t) + n crates of 5t each.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 660, margin: '0 auto' }}>
          <div style={{ background: 'rgba(59,130,246,0.15)', border: '1.5px solid #3b82f6', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#93c5fd', textTransform: 'uppercase' }}>10th Container Term</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: '6px 0' }}>6 + (10 × 5) = 56t</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>10 crates × 5t = 50t, plus 6t base</div>
          </div>

          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1.5px solid #10b981', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#86efac', textTransform: 'uppercase' }}>50th Container Term</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: '6px 0' }}>6 + (50 × 5) = 256t</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>50 crates × 5t = 250t, plus 6t base</div>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.15)', border: '1.5px solid #f59e0b', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#fcd34d', textTransform: 'uppercase' }}>100th Container Term</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gold)', margin: '6px 0' }}>6 + (100 × 5) = 506t</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Predicted instantly by formula!</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="toy-panel">
      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          className={`btn-tag ${crateCount === 1 && !showFlawComparison ? 'active' : ''}`}
          onClick={() => { setShowFlawComparison(false); handleTestTerm(1); }}
        >
          n = 1 (11t)
        </button>
        <button
          className={`btn-tag ${crateCount === 4 && !showFlawComparison ? 'active' : ''}`}
          onClick={() => { setShowFlawComparison(false); handleTestTerm(4); }}
        >
          n = 4 (Base 26t)
        </button>
        <button
          className={`btn-tag ${crateCount === 10 && !showFlawComparison ? 'active' : ''}`}
          onClick={() => { setShowFlawComparison(false); handleTestTerm(10); }}
        >
          n = 10 (56t)
        </button>
        <button
          className={`btn-tag ${crateCount === 50 && !showFlawComparison ? 'active' : ''}`}
          onClick={() => { setShowFlawComparison(false); handleTestTerm(50, true); }}
        >
          ⚡ Fast-Forward: n = 50
        </button>
        <button
          className={`btn-tag ${showFlawComparison ? 'active' : ''}`}
          onClick={handleTestFlaw}
          style={{ borderColor: showFlawComparison ? '#ef4444' : undefined, color: showFlawComparison ? '#fca5a5' : undefined }}
        >
          ⚠️ Audit Operator Mistake (50t)
        </button>
      </div>

      {/* Main Port Crane Visual Card */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '18px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
            🚢 JAWAHARLAL NEHRU PORT GANTRY CRANE
          </span>
          <span style={{ fontSize: '0.85rem', color: showFlawComparison ? '#ef4444' : '#86efac', fontWeight: 800 }}>
            {showFlawComparison ? 'OPERATOR ERROR (50t)' : `CALCULATED TOTAL: ${trueWeight} TONS ✓`}
          </span>
        </div>

        {/* Visual Stack of Containers */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 160, background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: '16px', position: 'relative', overflow: 'hidden' }}>
          {/* Crane Hook */}
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 4, height: 24, background: 'var(--gold)' }} />
            <div style={{ width: 24, height: 12, border: '3px solid var(--gold)', borderTop: 'none', borderRadius: '0 0 10px 10px' }} />
          </div>

          {/* Container Tower */}
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 4, alignItems: 'center', width: 220 }}>
            {/* Base Container (6 tons) */}
            <div style={{ width: '100%', height: 32, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', borderRadius: 6, border: '2px solid #60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8rem' }}>
              Base Container: 6 Tons
            </div>

            {/* Stacked Crates (5 tons each) */}
            {Array.from({ length: Math.min(4, crateCount) }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '85%',
                  height: 24,
                  background: 'linear-gradient(135deg, #065f46, #10b981)',
                  borderRadius: 4,
                  border: '1.5px solid #34d399',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  animation: 'slideUp 0.2s ease'
                }}
              >
                Crate #{i + 1}: 5t
              </div>
            ))}

            {crateCount > 4 && (
              <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 800, padding: '2px 8px', background: 'rgba(255,193,7,0.2)', borderRadius: 8 }}>
                +{crateCount - 4} more stacked crates ({crateCount * 5}t total crates)
              </div>
            )}
          </div>
        </div>

        {/* Readout and Breakdown */}
        <div style={{ marginTop: 14, textAlign: 'center' }}>
          {!showFlawComparison ? (
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1.5px solid #10b981', borderRadius: 12, padding: '10px 16px', display: 'inline-block' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#86efac' }}>
                6t Base + ({crateCount} crates × 5t) = 6 + {crateCount * 5} = {trueWeight} Tons
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                Grouped multiplication evaluates first, followed by addition of the base.
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', borderRadius: 12, padding: '10px 16px', display: 'inline-block' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fca5a5' }}>
                Operator Error: (6 + 4) × 5 = 10 × 5 = 50 Tons ❌
              </div>
              <div style={{ fontSize: '0.8rem', color: 'white', marginTop: 2 }}>
                Adding 6 + 4 first assumes there are 10 crates of 5 tons, multiplying the 6-ton base by 5!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
