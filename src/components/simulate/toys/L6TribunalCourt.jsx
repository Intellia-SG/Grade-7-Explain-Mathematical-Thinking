// src/components/simulate/toys/L6TribunalCourt.jsx
import { useState } from 'react';
import { soundTap, soundSnap, soundBust, soundStar } from '../../../utils/soundEffects';

export default function L6TribunalCourt({ onTrialComplete, isMysteryMode = false }) {
  const [leftX, setLeftX] = useState(2);
  const [leftConst, setLeftConst] = useState(6);
  const [rightTotal, setRightTotal] = useState(20);
  const [skepticConfidence, setSkepticConfidence] = useState(100);
  const [activeFlawFeedback, setActiveFlawFeedback] = useState(null);

  // trueX is 7: 2(7) + 6 = 20
  const trueX = 7;
  const currentLeft = leftX * trueX + leftConst;
  const isBalanced = currentLeft === rightTotal;
  const tilt = Math.max(-18, Math.min(18, (currentLeft - rightTotal) * 1.5));

  // True Step 1: Subtract 6 from BOTH sides
  const handleSubtractSixBoth = () => {
    soundTap();
    if (leftConst >= 6 && rightTotal >= 6) {
      setLeftConst(0);
      setRightTotal(14);
      setActiveFlawFeedback(null);
      setSkepticConfidence(50);
      soundSnap();

      if (onTrialComplete) {
        onTrialComplete({
          trialText: `Step 1: 2x + 6 − 6 = 20 − 6 ➔ 2x = 14`,
          leftoverNote: `Subtracted 6 from BOTH pans! Equilibrium maintained (Tilt: 0°) ✓`,
          isBalanced: true,
          tag: '⚖️ Proof Tribunal'
        });
      }
    }
  };

  // True Step 2: Divide BOTH sides by 2
  const handleDivideTwoBoth = () => {
    soundTap();
    if (leftConst === 0 && leftX === 2 && rightTotal === 14) {
      setLeftX(1);
      setRightTotal(7);
      setActiveFlawFeedback(null);
      setSkepticConfidence(0);
      soundStar();

      if (onTrialComplete) {
        onTrialComplete({
          trialText: `Step 2: 2x ÷ 2 = 14 ÷ 2 ➔ x = 7`,
          leftoverNote: `Divided BOTH pans by 2! Isolated x = 7 with zero doubt! Skeptic silenced! 🏆`,
          isBalanced: true,
          tag: '⚖️ Proof Tribunal Master'
        });
      }
    }
  };

  // Rebut Flawed Steps
  const handleFlawedAction = (type) => {
    soundTap();
    soundBust();

    if (type === 'add_six') {
      setActiveFlawFeedback("💥 RIVAL PROPOSAL REJECTED: Adding 6 makes 2x + 12 = 26. This adds clutter instead of undoing the +6!");
      if (onTrialComplete) {
        onTrialComplete({
          trialText: `Flawed: 2x + 6 + 6 = 20 + 6 (2x + 12 = 26)`,
          leftoverNote: `Rival added instead of subtracted! Does not isolate x ❌`,
          isFlawed: true,
          tag: '⚖️ Skeptic Flaw'
        });
      }
    } else if (type === 'left_only') {
      setActiveFlawFeedback("⚖️ ASYMMETRY DISASTER: Subtracting 6 from left only makes left 20 - 6 = 14 while right is still 20! Scale crashes!");
      if (onTrialComplete) {
        onTrialComplete({
          trialText: `Flawed: 2x + 6 − 6 = 20 (Left only!)`,
          leftoverNote: `Left pan = 14, Right pan = 20. Equation broken! ❌`,
          isFlawed: true,
          tag: '⚖️ Skeptic Flaw'
        });
      }
    } else if (type === 'one_example') {
      setActiveFlawFeedback("❌ SINGLE EXAMPLE REJECTED: Testing x = 7 shows it works, but only algebraic inverse operations prove no other solutions exist!");
      if (onTrialComplete) {
        onTrialComplete({
          trialText: `Guess: 2(7) + 6 = 20 (Checked once)`,
          leftoverNote: `One example shows possibility, but inverse steps prove uniqueness!`,
          isFlawed: true,
          tag: '⚖️ Skeptic Flaw'
        });
      }
    }
  };

  const handleReset = () => {
    soundTap();
    setLeftX(2);
    setLeftConst(6);
    setRightTotal(20);
    setSkepticConfidence(100);
    setActiveFlawFeedback(null);
  };

  if (isMysteryMode) {
    return (
      <div className="toy-panel">
        <div className="toy-badge">⚖️ Supreme Tribunal Labs — The Golden Axiom of Equality</div>
        <h4 style={{ color: 'var(--gold)', margin: '8px 0 14px' }}>
          The Mathematical Law of Invariance
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620, margin: '0 auto 16px' }}>
          An equation is a physical statement of truth. Whatever operation you apply to one side, you MUST mirror on the other side!
        </p>

        <div style={{ background: 'rgba(124,58,237,0.15)', border: '2px solid #7c3aed', borderRadius: 16, padding: '16px', maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#c4b5fd', marginBottom: 8 }}>
            Equality Invariance Principle
          </div>
          <div style={{ fontSize: '1.4rem', color: 'white', fontWeight: 800, margin: '10px 0' }}>
            A = B &nbsp;⟺&nbsp; A − C = B − C &nbsp;⟺&nbsp; A ÷ D = B ÷ D
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            Inverse operations undo terms. Balanced application preserves truth. This is why algebraic steps constitute a rigorous proof!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="toy-panel">
      {/* Skeptic Confidence Bar Header */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '12px 18px', maxWidth: 680, margin: '0 auto 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 800 }}>
            👨‍⚖️ SKEPTIC MAGISTRATE'S DOUBT METER
          </span>
          <span style={{ fontSize: '0.85rem', color: skepticConfidence === 0 ? '#86efac' : 'var(--gold)', fontWeight: 800 }}>
            {skepticConfidence === 0 ? 'DOUBT ERADICATED (0%) 🏆' : `${skepticConfidence}% Skeptic Confidence`}
          </span>
        </div>
        <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
          <div
            style={{
              width: `${skepticConfidence}%`,
              height: '100%',
              background: skepticConfidence > 50 ? '#ef4444' : skepticConfidence > 0 ? '#f59e0b' : '#10b981',
              transition: 'all 0.4s ease'
            }}
          />
        </div>
      </div>

      {/* Main Balance Scale Card */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '18px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
            ⚖️ PHYSICAL BALANCE BEAM OF TRUTH
          </span>
          <span style={{ fontSize: '0.85rem', color: isBalanced ? '#86efac' : '#ef4444', fontWeight: 800 }}>
            {isBalanced ? 'PERFECT EQUILIBRIUM (EQUALS HOLDS)' : 'SCALE TILTED (UNBALANCED)'}
          </span>
        </div>

        {/* Balance Beam SVG */}
        <div style={{ height: 170, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%', maxWidth: 440 }}>
            {/* Fulcrum stand */}
            <polygon points="200,80 180,150 220,150" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <circle cx="200" cy="80" r="7" fill="var(--gold)" />

            {/* Beam with dynamic tilt */}
            <g transform={`rotate(${tilt}, 200, 80)`} style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <rect x="50" y="76" width="300" height="8" rx="4" fill="var(--gold)" />
              {/* Left Pan strings & plate */}
              <line x1="80" y1="80" x2="80" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="80" y1="120" x2="50" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="80" y1="120" x2="110" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <rect x="40" y="140" width="80" height="6" rx="3" fill="#3b82f6" />

              {/* Right Pan strings & plate */}
              <line x1="320" y1="80" x2="320" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="320" y1="120" x2="290" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="320" y1="120" x2="350" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <rect x="280" y="140" width="80" height="6" rx="3" fill="#10b981" />
            </g>

            {/* Labels under pans */}
            <text x="80" y="155" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
              {leftX === 2 ? '2x' : 'x'}{leftConst > 0 ? ` + ${leftConst}` : ''}
            </text>
            <text x="320" y="155" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">
              {rightTotal} kg
            </text>
          </svg>
        </div>

        {/* Flawed Feedback banner if active */}
        {activeFlawFeedback && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1.5px solid #ef4444', borderRadius: 12, padding: '10px 14px', margin: '10px 0', color: '#fca5a5', fontSize: '0.85rem', textAlign: 'center', animation: 'wiggle 0.4s' }}>
            {activeFlawFeedback}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          {/* True Step Buttons */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${leftConst === 6 ? 'btn-primary' : 'btn-outline'}`}
              onClick={handleSubtractSixBoth}
              disabled={leftConst === 0}
              style={{ opacity: leftConst === 0 ? 0.4 : 1 }}
            >
              Step 1: Subtract 6 from BOTH Sides (−6)
            </button>

            <button
              className={`btn btn-sm ${leftConst === 0 && leftX === 2 ? 'btn-primary' : 'btn-outline'}`}
              onClick={handleDivideTwoBoth}
              disabled={leftConst > 0 || leftX === 1}
              style={{ opacity: leftConst > 0 || leftX === 1 ? 0.4 : 1 }}
            >
              Step 2: Divide BOTH Sides by 2 (÷2)
            </button>

            <button className="btn btn-outline btn-sm" onClick={handleReset}>
              🔄 Reset Scale
            </button>
          </div>

          {/* Skeptic Flawed Arguments Section */}
          <div style={{ marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10, textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
              👨‍⚖️ Test Rival Proposals & Rebut Flawed Arguments:
            </div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn-tag"
                onClick={() => handleFlawedAction('add_six')}
                style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }}
              >
                Rival: "Add 6 to both sides"
              </button>
              <button
                className="btn-tag"
                onClick={() => handleFlawedAction('left_only')}
                style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }}
              >
                Rival: "Subtract 6 on left only"
              </button>
              <button
                className="btn-tag"
                onClick={() => handleFlawedAction('one_example')}
                style={{ borderColor: 'rgba(245,158,11,0.4)', color: '#fcd34d' }}
              >
                Skeptic: "Just guess x = 7 once"
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
