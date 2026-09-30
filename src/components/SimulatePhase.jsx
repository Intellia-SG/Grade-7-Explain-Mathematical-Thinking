// src/components/SimulatePhase.jsx
import { useState, useCallback, useEffect, useMemo } from 'react';
import { playAudio, stopNarration, playCorrect, playWrong } from '../utils/audio';
import { SIMULATION_LEVELS, SANDBOX_PRESETS } from '../data/simulationLevels';

export default function SimulatePhase({ onComplete }) {
  // Mode: 'guided' | 'sandbox'
  const [mode, setMode] = useState('guided');
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [sandboxPreset, setSandboxPreset] = useState('odd_even');

  // Guided Progression State
  const [levelStage, setLevelStage] = useState('predict'); // 'predict' | 'play_test' | 'real_world' | 'reflect' | 'level_complete'
  const [userPrediction, setUserPrediction] = useState(null);
  const [predictFeedback, setPredictFeedback] = useState(null);
  const [userReflection, setUserReflection] = useState(null);
  const [reflectFeedback, setReflectFeedback] = useState(null);
  const [hintStep, setHintStep] = useState(0); // 0=none, 1=nudge, 2=clue, 3=worked
  const [starsMap, setStarsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('g7_sim_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Gamification
  const [totalXP, setTotalXP] = useState(() => {
    try {
      return parseInt(localStorage.getItem('g7_sim_xp') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Current Level
  const level = SIMULATION_LEVELS[currentLevelIdx];
  const isBossLevel = level.difficulty === 'Boss Level';

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('g7_sim_stars', JSON.stringify(starsMap));
      localStorage.setItem('g7_sim_xp', totalXP.toString());
    } catch (e) {
      console.warn('Storage save skipped', e);
    }
  }, [starsMap, totalXP]);

  // Audio hook for level
  useEffect(() => {
    if (mode === 'guided') {
      playAudio(level.mission);
    }
    return () => stopNarration();
  }, [currentLevelIdx, mode, level.mission]);

  // Handle Prediction Submit
  const handlePrediction = (option) => {
    setUserPrediction(option);
    if (option.correct) {
      playCorrect();
      setPredictFeedback({
        type: 'correct',
        text: '🎯 Great hypothesis! Now test it live in the simulation to prove it!'
      });
    } else {
      playWrong();
      setPredictFeedback({
        type: 'retry',
        text: '🤔 Interesting guess! Let’s run the simulation now and see what actually happens!'
      });
    }
    setTimeout(() => {
      setLevelStage('play_test');
    }, 1200);
  };

  // Complete Live Test Phase
  const handleTestPassed = () => {
    playCorrect();
    setLevelStage('real_world');
  };

  // Complete Reflection
  const handleReflection = (option) => {
    setUserReflection(option);
    if (option.correct) {
      playCorrect();
      setReflectFeedback({
        type: 'correct',
        text: '🌟 Brilliant reasoning! ' + level.reflection.explanation
      });
      // Award Stars and XP
      const earnedStars = hintStep === 0 ? 3 : hintStep === 1 ? 2 : 1;
      setStarsMap(prev => ({ ...prev, [level.id]: Math.max(prev[level.id] || 0, earnedStars) }));
      setTotalXP(x => x + (earnedStars * 15));
      setTimeout(() => {
        setLevelStage('level_complete');
      }, 1500);
    } else {
      playWrong();
      setReflectFeedback({
        type: 'retry',
        text: 'Not quite. Think about the mathematical structure: ' + level.reflection.explanation
      });
    }
  };

  // Next Guided Level
  const handleNextLevel = () => {
    if (currentLevelIdx < SIMULATION_LEVELS.length - 1) {
      setCurrentLevelIdx(i => i + 1);
      setLevelStage('predict');
      setUserPrediction(null);
      setPredictFeedback(null);
      setUserReflection(null);
      setReflectFeedback(null);
      setHintStep(0);
    } else {
      if (onComplete) onComplete();
    }
  };

  /* ══════════════════════════════════════════════════════════════
     TOY 1 — DUMPLING & PARITY PARTICLE COLLIDER
  ══════════════════════════════════════════════════════════════ */
  function DumplingColliderToy({ onGoalMet, isSandbox = false }) {
    const [numA, setNumA] = useState(level?.baseValues?.a || 5);
    const [numB, setNumB] = useState(level?.baseValues?.b || 7);
    const [isFused, setIsFused] = useState(false);
    const [breakItMode, setBreakItMode] = useState(false);

    const total = numA + numB;
    const pairsA = Math.floor(numA / 2);
    const leftA = numA % 2;
    const pairsB = Math.floor(numB / 2);
    const leftB = numB % 2;
    const bothOdd = leftA === 1 && leftB === 1;

    const handleFuseDumplings = () => {
      setIsFused(true);
      playCorrect();
      if (onGoalMet) onGoalMet();
    };

    return (
      <div style={{ textAlign: 'center' }}>
        {/* Sandbox Controls or Live Readout */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '12px 18px', maxWidth: 700, margin: '0 auto 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 800 }}>Order A: {numA} ({numA % 2 === 0 ? 'EVEN' : 'ODD'})</span>
            <input
              type="range" min={1} max={breakItMode ? 31 : 15} value={numA}
              onChange={e => { setNumA(+e.target.value); setIsFused(false); }}
              style={{ width: 140, accentColor: '#3b82f6', display: 'block', marginTop: 4, cursor: 'pointer' }}
            />
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold)' }}>+</div>

          <div>
            <span style={{ fontSize: '0.85rem', color: '#86efac', fontWeight: 800 }}>Order B: {numB} ({numB % 2 === 0 ? 'EVEN' : 'ODD'})</span>
            <input
              type="range" min={1} max={breakItMode ? 31 : 15} value={numB}
              onChange={e => { setNumB(+e.target.value); setIsFused(false); }}
              style={{ width: 140, accentColor: '#10b981', display: 'block', marginTop: 4, cursor: 'pointer' }}
            />
          </div>

          {isSandbox && (
            <button
              onClick={() => setBreakItMode(m => !m)}
              style={{
                padding: '6px 12px', borderRadius: 12, border: `2px solid ${breakItMode ? 'var(--coral)' : 'rgba(255,255,255,0.2)'}`,
                background: breakItMode ? 'rgba(255,112,67,0.2)' : 'rgba(255,255,255,0.06)',
                color: breakItMode ? 'var(--coral)' : 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem'
              }}
            >
              💥 {breakItMode ? 'Normal Limits' : 'BREAK IT! (Extreme Mode)'}
            </button>
          )}
        </div>

        {/* Visual Bento Conveyor */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '20px', maxWidth: 740, margin: '0 auto 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
              🥟 PACKING CONVEYOR: {numA} + {numB} = {total} ITEMS
            </span>
            <span style={{ fontSize: '0.85rem', color: total % 2 === 0 ? 'var(--green-light)' : 'var(--coral)', fontWeight: 800 }}>
              {total % 2 === 0 ? 'STATUS: ZERO LEFTOVER (EVEN)' : 'STATUS: UNPAIRED (ODD)'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Box A */}
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '2px solid #3b82f6', borderRadius: 16, padding: '12px', minWidth: 160 }}>
              <div style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 800, marginBottom: 6 }}>Box A: {numA} Dumplings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                {Array.from({ length: Math.min(6, pairsA) }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, background: 'rgba(59,130,246,0.25)', border: '1.5px solid #60a5fa', borderRadius: 10, padding: '4px 10px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🥟</span>
                    <span style={{ fontSize: '1.3rem' }}>🥟</span>
                  </div>
                ))}
                {pairsA > 6 && <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>+{pairsA - 6} more 2-packs</div>}
                {leftA > 0 && !isFused && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245,158,11,0.25)', border: '2px dashed #f59e0b', borderRadius: 10, padding: '4px 12px', animation: 'pulse 1s infinite' }}>
                    <span style={{ fontSize: '1.4rem' }}>🥟</span>
                    <span style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 800 }}>1 Single</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ alignSelf: 'center', fontSize: '2rem', fontWeight: 900, color: 'var(--gold)' }}>+</div>

            {/* Box B */}
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981', borderRadius: 16, padding: '12px', minWidth: 160 }}>
              <div style={{ fontSize: '0.85rem', color: '#86efac', fontWeight: 800, marginBottom: 6 }}>Box B: {numB} Dumplings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                {Array.from({ length: Math.min(6, pairsB) }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, background: 'rgba(16,185,129,0.25)', border: '1.5px solid #34d399', borderRadius: 10, padding: '4px 10px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🥟</span>
                    <span style={{ fontSize: '1.3rem' }}>🥟</span>
                  </div>
                ))}
                {pairsB > 6 && <div style={{ fontSize: '0.75rem', color: '#86efac' }}>+{pairsB - 6} more 2-packs</div>}
                {leftB > 0 && !isFused && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245,158,11,0.25)', border: '2px dashed #f59e0b', borderRadius: 10, padding: '4px 12px', animation: 'pulse 1s infinite' }}>
                    <span style={{ fontSize: '1.4rem' }}>🥟</span>
                    <span style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 800 }}>1 Single</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Magnetic Fusion Interaction */}
          <div style={{ marginTop: 14 }}>
            {bothOdd && !isFused ? (
              <button className="btn btn-primary" onClick={handleFuseDumplings} style={{ boxShadow: '0 0 20px rgba(255,193,7,0.4)', fontSize: '1.05rem' }}>
                ⚡ FUSE THE 2 LEFTOVERS TOGETHER!
              </button>
            ) : bothOdd && isFused ? (
              <div style={{ animation: 'bounceIn 0.4s ease', background: 'rgba(76,175,80,0.2)', border: '2px solid #4caf50', borderRadius: 14, padding: '10px 18px', display: 'inline-block' }}>
                <span style={{ fontSize: '1.4rem' }}>🥟</span>
                <span style={{ fontWeight: 900, color: 'var(--gold)', margin: '0 8px' }}>+</span>
                <span style={{ fontSize: '1.4rem' }}>🥟</span>
                <span style={{ fontWeight: 900, color: 'var(--green-light)', margin: '0 8px' }}>=</span>
                <span style={{ background: '#4caf50', color: 'white', padding: '3px 10px', borderRadius: 10, fontWeight: 900, fontSize: '0.85rem' }}>
                  NEW COMPLETE 2-PACK!
                </span>
                <div style={{ color: '#86efac', fontWeight: 800, fontSize: '0.85rem', marginTop: 4 }}>
                  Zero leftovers remain. The sum of any two odd numbers is structurally EVEN!
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Change both sliders to <strong>ODD numbers</strong> to see the two single leftovers unite!
              </div>
            )}
          </div>
        </div>

        {!isSandbox && isFused && (
          <button className="btn btn-green btn-lg" onClick={handleTestPassed} style={{ animation: 'bounceIn 0.4s' }}>
            🎉 Discovery Verified! View Real-World Application →
          </button>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     TOY 2 — ROCKET CATAPULT & COUNTEREXAMPLE CRASH CANNON
  ══════════════════════════════════════════════════════════════ */
  function RocketCatapultToy({ onGoalMet, isSandbox = false }) {
    const [baseVal, setBaseVal] = useState(level?.baseValues?.base || 20);
    const [multiplier, setMultiplier] = useState(0.5);
    const [probePos, setProbePos] = useState(baseVal * 0.5);
    const [isLaunching, setIsLaunching] = useState(false);
    const [flights, setFlights] = useState([]);
    const [breakItMode, setBreakItMode] = useState(false);

    const isSquaringMode = level?.baseValues?.formula === 'x²';

    const handleFire = () => {
      setIsLaunching(true);
      const target = isSquaringMode ? multiplier * multiplier : baseVal * multiplier;

      setTimeout(() => {
        setProbePos(target);
        setIsLaunching(false);
        const crashed = isSquaringMode ? target < multiplier : target < baseVal;
        const flightRecord = {
          mult: multiplier,
          result: Math.round(target * 100) / 100,
          crashed,
          desc: isSquaringMode
            ? `${multiplier}² = ${Math.round(target * 100) / 100} (${crashed ? '💥 SHRANK (Counterexample!)' : '📈 GREW'})`
            : `${baseVal} × ${multiplier} = ${Math.round(target * 100) / 100} (${crashed ? '💥 DROPPED (Counterexample!)' : '📈 GREW'})`
        };
        setFlights(prev => [flightRecord, ...prev.slice(0, 4)]);

        if (crashed) {
          playWrong();
          if (onGoalMet) onGoalMet();
        } else {
          playCorrect();
        }
      }, 600);
    };

    return (
      <div style={{ textAlign: 'center' }}>
        {/* Controls */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '12px 18px', maxWidth: 720, margin: '0 auto 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          {!isSquaringMode && (
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--coral)', fontWeight: 800 }}>Starting Price / Base: ${baseVal}</span>
              <input
                type="range" min={5} max={breakItMode ? 100 : 30} value={baseVal}
                onChange={e => setBaseVal(+e.target.value)}
                style={{ width: 130, accentColor: 'var(--coral)', display: 'block', marginTop: 4, cursor: 'pointer' }}
              />
            </div>
          )}

          <div>
            <span style={{ fontSize: '0.85rem', color: '#60a5fa', fontWeight: 800 }}>
              {isSquaringMode ? 'Test Value to Square (x):' : 'Multiplier Factor (×):'} {multiplier}
            </span>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 6, flexWrap: 'wrap' }}>
              {[0, 0.25, 0.5, 0.8, 1, 1.5, 2, ...(breakItMode ? [-1, 10] : [])].map(v => (
                <button
                  key={v}
                  onClick={() => setMultiplier(v)}
                  style={{
                    padding: '3px 8px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)',
                    background: multiplier === v ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                    color: multiplier === v ? '#1a1a2e' : 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem'
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {isSandbox && (
            <button
              onClick={() => setBreakItMode(m => !m)}
              style={{
                padding: '6px 12px', borderRadius: 12, border: `2px solid ${breakItMode ? 'var(--coral)' : 'rgba(255,255,255,0.2)'}`,
                background: breakItMode ? 'rgba(255,112,67,0.2)' : 'rgba(255,255,255,0.06)',
                color: breakItMode ? 'var(--coral)' : 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem'
              }}
            >
              💥 {breakItMode ? 'Normal Limits' : 'BREAK IT! (Extreme Values)'}
            </button>
          )}

          <button className="btn btn-primary btn-sm" onClick={handleFire} disabled={isLaunching} style={{ minWidth: 140 }}>
            {isLaunching ? '🚀 In Flight...' : '🚀 FIRE PROBE!'}
          </button>
        </div>

        {/* Dynamic Number Line SVG Track */}
        <div style={{ background: 'rgba(0,0,0,0.35)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '20px', maxWidth: 740, margin: '0 auto 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
              COORDINATE TRAJECTORY AXIS (0 → 40)
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--coral)', fontWeight: 800 }}>
              Base Launch Mark: {isSquaringMode ? multiplier : baseVal}
            </span>
          </div>

          <svg width="100%" height="110" viewBox="0 0 600 110" style={{ overflow: 'visible' }}>
            <line x1="30" y1="75" x2="570" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
            {[0, 5, 10, 15, 20, 25, 30, 35, 40].map(val => {
              const xPos = 30 + (val / 40) * 540;
              const isBase = val === (isSquaringMode ? multiplier : baseVal);
              return (
                <g key={val}>
                  <line x1={xPos} y1="65" x2={xPos} y2="85" stroke={isBase ? 'var(--coral)' : 'rgba(255,255,255,0.3)'} strokeWidth={isBase ? 3 : 1.5} />
                  <text x={xPos} y="100" fill={isBase ? 'var(--coral)' : 'rgba(255,255,255,0.5)'} fontSize="11" fontWeight={isBase ? 900 : 600} textAnchor="middle">
                    {val}
                  </text>
                  {isBase && <text x={xPos} y="58" fill="var(--coral)" fontSize="10" fontWeight="bold" textAnchor="middle">BASE</text>}
                </g>
              );
            })}

            {/* Flight Rocket */}
            <g transform={`translate(${30 + (Math.min(40, Math.max(0, probePos)) / 40) * 540}, 60)`} style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <circle cx="0" cy="0" r="16" fill={probePos < (isSquaringMode ? multiplier : baseVal) ? '#ef4444' : '#3b82f6'} filter="drop-shadow(0 0 10px rgba(59,130,246,0.6))" />
              <text x="0" y="5" fontSize="16" textAnchor="middle">{isLaunching ? '🔥' : '🚀'}</text>
            </g>
          </svg>

          {/* Telemetry Flights */}
          {flights.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {flights.map((f, i) => (
                <span key={i} style={{
                  padding: '4px 10px', borderRadius: 14,
                  background: f.crashed ? 'rgba(239,68,68,0.2)' : 'rgba(76,175,80,0.2)',
                  border: `1px solid ${f.crashed ? '#ef4444' : '#4caf50'}`,
                  color: f.crashed ? '#fca5a5' : '#86efac', fontWeight: 800, fontSize: '0.8rem'
                }}>
                  {f.desc}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isSandbox && flights.some(f => f.crashed) && (
          <button className="btn btn-green btn-lg" onClick={handleTestPassed} style={{ animation: 'bounceIn 0.4s' }}>
            💥 Counterexample Discovered! View Real-World Application →
          </button>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     TOY 3 — FORENSIC LASER BRIDGE & BLUEPRINT SCANNER
  ══════════════════════════════════════════════════════════════ */
  function BridgeScannerToy({ onGoalMet, isSandbox = false }) {
    const [scannedLine, setScannedLine] = useState(null);
    const [isFixed, setIsFixed] = useState(false);

    const isSeaLink = level?.id === 4;

    const lines = isSeaLink ? [
      { step: 1, text: 'Tension = −5 − (−8) MN', correct: true, note: 'Initial wind vector load' },
      { step: 2, text: '= −5 − 8 MN', correct: false, note: 'Attempted subtraction of negative' },
      { step: 3, text: '= −13 MN', correct: false, note: 'Catastrophic inverted force vector!' }
    ] : [
      { step: 1, text: 'Weight = 6 + 4 × 5 Tons', correct: true, note: 'Base crane container + crates' },
      { step: 2, text: '= 10 × 5 Tons', correct: false, note: 'Violated PEMDAS/BODMAS by adding first' },
      { step: 3, text: '= 50 Tons', correct: false, note: 'Severe 24-ton cargo discrepancy' }
    ];

    const targetFaulty = 2;
    const fixedText = isSeaLink ? '= −5 + 8 = +3 MN' : '= 6 + 20 = 26 Tons';

    const handleLineClick = (step) => {
      setScannedLine(step);
      if (step === targetFaulty) {
        playCorrect();
      } else {
        playWrong();
      }
    };

    const handleRepair = () => {
      setIsFixed(true);
      playCorrect();
      if (onGoalMet) onGoalMet();
    };

    return (
      <div style={{ textAlign: 'center' }}>
        {/* Interactive SVG Bridge Illustration with Cracks when Unrepaired */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '16px', maxWidth: 720, margin: '0 auto 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.85rem', color: isFixed ? 'var(--green-light)' : 'var(--coral)', fontWeight: 800 }}>
              {isFixed ? 'BRIDGE STATUS: STRUCTURAL INTEGRITY 100% (SAFE)' : 'BRIDGE STATUS: WARNING! TENSION SIGN ANOMALY'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Forensic Scanner v2.4</span>
          </div>

          <svg width="100%" height="120" viewBox="0 0 600 120" style={{ overflow: 'visible' }}>
            {/* Water */}
            <rect x="0" y="90" width="600" height="30" fill="rgba(59,130,246,0.2)" />
            {/* Bridge Pillars */}
            <rect x="120" y="30" width="18" height="75" fill="#475569" />
            <rect x="460" y="30" width="18" height="75" fill="#475569" />
            {/* Roadway */}
            <rect x="20" y="70" width="560" height="12" rx="4" fill={isFixed ? '#22c55e' : '#f59e0b'} />
            {/* Suspension Cables */}
            <path d="M 20 70 Q 120 20 290 70" fill="none" stroke={isFixed ? '#86efac' : '#ef4444'} strokeWidth="2.5" />
            <path d="M 290 70 Q 460 20 580 70" fill="none" stroke={isFixed ? '#86efac' : '#ef4444'} strokeWidth="2.5" />
            
            {/* Cracks if not fixed */}
            {!isFixed && (
              <g stroke="#ef4444" strokeWidth="2">
                <line x1="280" y1="65" x2="295" y2="76" />
                <line x1="295" y1="76" x2="310" y2="67" />
                <text x="300" y="55" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">⚠️ STRESS CRACK</text>
              </g>
            )}

            {isFixed && (
              <text x="300" y="55" fill="#86efac" fontSize="12" fontWeight="bold" textAnchor="middle">✨ REPAIRED & CERTIFIED</text>
            )}
          </svg>
        </div>

        {/* Step Ladder Scanner */}
        <div className="step-ladder" style={{ maxWidth: 680, margin: '0 auto 16px' }}>
          {lines.map(l => {
            const isTarget = l.step === targetFaulty;
            const isSelected = scannedLine === l.step;
            return (
              <div
                key={l.step}
                onClick={() => handleLineClick(l.step)}
                className={`step-row ${isSelected ? 'selected' : ''}`}
                style={{
                  cursor: 'pointer',
                  borderColor: isFixed && isTarget ? '#22c55e' : (isSelected && isTarget) ? '#ef4444' : undefined,
                  background: isFixed && isTarget ? 'rgba(34,197,94,0.15)' : undefined
                }}
              >
                <div>
                  <span className="step-num">Line {l.step}:</span>
                  <span className="step-expr" style={{ marginLeft: 12, color: isFixed && isTarget ? '#86efac' : undefined }}>
                    {isFixed && isTarget ? fixedText : l.text}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.note}</span>
                  {isSelected && isTarget && !isFixed && <span style={{ color: 'var(--red)', fontWeight: 900 }}>❌ FLAW HERE</span>}
                  {isSelected && !isTarget && <span style={{ color: 'var(--green-light)', fontWeight: 800 }}>✓ SOUND</span>}
                  {isFixed && isTarget && <span style={{ color: '#86efac', fontWeight: 900 }}>✅ REPAIRED</span>}
                  {!isSelected && !isFixed && <span style={{ fontSize: '0.75rem', color: 'var(--gold)', border: '1px solid rgba(255,193,7,0.3)', padding: '2px 8px', borderRadius: 8 }}>Scan</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Repair Action */}
        {scannedLine === targetFaulty && !isFixed && (
          <button className="btn btn-primary" onClick={handleRepair} style={{ animation: 'bounceIn 0.4s' }}>
            🛠️ REPAIR BLUEPRINT & RESTORE EQUATION!
          </button>
        )}

        {!isSandbox && isFixed && (
          <button className="btn btn-green btn-lg" onClick={handleTestPassed} style={{ animation: 'bounceIn 0.4s', marginTop: 12 }}>
            🎉 Blueprint Restored! View Real-World Application →
          </button>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     TOY 4 — THE BALANCE SCALE OF TRUTH (Physical Balance Beam)
  ══════════════════════════════════════════════════════════════ */
  function BalanceScaleToy({ onGoalMet, isSandbox = false }) {
    const [leftX, setLeftX] = useState(2);
    const [leftConst, setLeftConst] = useState(6);
    const [rightTotal, setRightTotal] = useState(20);
    const [breakItMode, setBreakItMode] = useState(false);

    const trueX = 7; // 2(7) + 6 = 20
    const currentLeft = leftX * trueX + leftConst;
    const isBalanced = currentLeft === rightTotal;
    const tilt = Math.max(-20, Math.min(20, (currentLeft - rightTotal) * 1.8));

    const subtractSixBothSides = () => {
      if (leftConst >= 6 && rightTotal >= 6) {
        setLeftConst(c => c - 6);
        setRightTotal(r => r - 6);
        playCorrect();
      }
    };

    const divideTwoBothSides = () => {
      if (leftConst === 0 && leftX === 2 && rightTotal % 2 === 0) {
        setLeftX(1);
        setRightTotal(r => r / 2);
        playCorrect();
        if (onGoalMet) onGoalMet();
      }
    };

    const cheatBreakIt = () => {
      // Intentionally break symmetry to show scale crashing
      setRightTotal(r => r + 15);
      playWrong();
    };

    const resetScale = () => {
      setLeftX(2);
      setLeftConst(6);
      setRightTotal(20);
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ background: 'rgba(124,58,237,0.15)', border: '2px solid #7c3aed', borderRadius: 16, padding: '10px 18px', display: 'inline-block', marginBottom: 14 }}>
          <span style={{ fontSize: '0.85rem', color: '#c4b5fd', fontWeight: 800 }}>LIVE EQUATION:</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--gold)' }}>
            {leftX}x + {leftConst} = {rightTotal}
          </div>
        </div>

        {/* 2-Pan Physical SVG Scale */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '20px', maxWidth: 680, margin: '0 auto 16px' }}>
          <svg width="100%" height="200" viewBox="0 0 500 200" style={{ overflow: 'visible' }}>
            <polygon points="250,130 220,190 280,190" fill="#4c1d95" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="250" cy="130" r="7" fill="#fcd34d" />

            <g transform={`rotate(${tilt}, 250, 130)`} style={{ transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <line x1="80" y1="130" x2="420" y2="130" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
              <line x1="110" y1="130" x2="70" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="110" y1="130" x2="150" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <rect x="60" y="175" width="100" height="8" rx="4" fill="#6d28d9" stroke="#c4b5fd" strokeWidth="2" />

              <line x1="390" y1="130" x2="350" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="390" y1="130" x2="430" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <rect x="340" y="175" width="100" height="8" rx="4" fill="#6d28d9" stroke="#c4b5fd" strokeWidth="2" />
            </g>

            <text x="110" y="60" fill="#60a5fa" fontSize="13" fontWeight="900" textAnchor="middle">LEFT: {leftX}x + {leftConst}</text>
            <text x="390" y="60" fill="#34d399" fontSize="13" fontWeight="900" textAnchor="middle">RIGHT: {rightTotal}</text>
          </svg>

          <div style={{ marginTop: 8 }}>
            {isBalanced ? (
              <span style={{ color: '#86efac', fontWeight: 900, fontSize: '1.1rem' }}>
                {leftX === 1 && leftConst === 0 ? '✨ PERFECT ISOLATION! x = 7 RIGOROUSLY PROVEN!' : '⚖️ EQUILIBRIUM MAINTAINED'}
              </span>
            ) : (
              <span style={{ color: 'var(--coral)', fontWeight: 800 }}>⚠️ IMBALANCED! Equations must maintain exact equality!</span>
            )}
          </div>
        </div>

        {/* Step-by-Step Operations */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={subtractSixBothSides}
            disabled={leftConst === 0}
            style={{ opacity: leftConst === 0 ? 0.4 : 1 }}
          >
            Step 1: Subtract 6 from BOTH sides
          </button>

          <button
            className="btn btn-outline btn-sm"
            onClick={divideTwoBothSides}
            disabled={leftConst > 0 || leftX === 1}
            style={{ opacity: leftConst > 0 || leftX === 1 ? 0.4 : 1 }}
          >
            Step 2: Divide BOTH sides by 2
          </button>

          {isSandbox && (
            <button className="btn btn-outline btn-sm" onClick={cheatBreakIt} style={{ borderColor: 'var(--coral)', color: 'var(--coral)' }}>
              💥 Break One Side Only!
            </button>
          )}

          <button className="btn btn-outline btn-sm" onClick={resetScale}>
            🔄 Reset
          </button>
        </div>

        {!isSandbox && leftX === 1 && leftConst === 0 && (
          <button className="btn btn-green btn-lg" onClick={handleTestPassed} style={{ animation: 'bounceIn 0.4s', marginTop: 16 }}>
            🏆 Boss Level Solved! View Real-World Application →
          </button>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER ACTIVE TOY BASED ON LEVEL
  ══════════════════════════════════════════════════════════════ */
  const renderToy = (toyType, onGoalMet, isSandbox = false) => {
    switch (toyType) {
      case 'dumpling_collider':
      case 'odd_even':
        return <DumplingColliderToy onGoalMet={onGoalMet} isSandbox={isSandbox} />;
      case 'rocket_catapult':
      case 'number_line':
        return <RocketCatapultToy onGoalMet={onGoalMet} isSandbox={isSandbox} />;
      case 'bridge_scanner':
      case 'bridge_audit':
        return <BridgeScannerToy onGoalMet={onGoalMet} isSandbox={isSandbox} />;
      case 'balance_scale':
        return <BalanceScaleToy onGoalMet={onGoalMet} isSandbox={isSandbox} />;
      default:
        return <DumplingColliderToy onGoalMet={onGoalMet} isSandbox={isSandbox} />;
    }
  };

  return (
    <div className="simulate-phase">
      {/* Top Header */}
      <div className="simulate-header">
        <h3 className="simulate-label">🧪 Interactive Logic Playground</h3>
        <p className="simulate-sublabel">
          Explore mathematical thinking like a toy first and a lesson second. Play, predict, break, and prove!
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 18 }}>
        <button
          onClick={() => setMode('guided')}
          style={{
            padding: '10px 22px', borderRadius: 20, border: `2px solid ${mode === 'guided' ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
            background: mode === 'guided' ? 'rgba(255,193,7,0.15)' : 'rgba(255,255,255,0.05)',
            color: mode === 'guided' ? 'var(--gold)' : 'var(--text-secondary)',
            fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem'
          }}
        >
          🎮 Guided Missions ({currentLevelIdx + 1}/{SIMULATION_LEVELS.length})
        </button>

        <button
          onClick={() => setMode('sandbox')}
          style={{
            padding: '10px 22px', borderRadius: 20, border: `2px solid ${mode === 'sandbox' ? 'var(--coral)' : 'rgba(255,255,255,0.15)'}`,
            background: mode === 'sandbox' ? 'rgba(255,112,67,0.15)' : 'rgba(255,255,255,0.05)',
            color: mode === 'sandbox' ? 'var(--coral)' : 'var(--text-secondary)',
            fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem'
          }}
        >
          🧪 Free Play Sandbox (Break-It Mode)
        </button>
      </div>

      {/* Mini Dashboard Always Visible */}
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '12px 20px', maxWidth: 860, width: '100%', margin: '0 auto 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="mascot" style={{ width: 44, height: 44, fontSize: '1.4rem', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>🦉</div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase' }}>Whyzo's Field Note:</span>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {mode === 'guided' ? level.mission : "Have fun pushing the math to its limits! Tap 'Break It' to find edge cases."}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--gold)', fontWeight: 800 }}>⭐ {totalXP} XP</span>
          {mode === 'guided' && (
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3].map(s => (
                <span key={s} style={{ opacity: s <= (starsMap[level.id] || 0) ? 1 : 0.25, fontSize: '1.1rem' }}>⭐</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Experience Container */}
      <div className="glass-card" style={{ maxWidth: 880, width: '100%', animation: 'slideUp 0.3s ease' }}>
        {/* ================= MODE: GUIDED MISSIONS ================= */}
        {mode === 'guided' && (
          <div>
            {/* Escalating Level Dots */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              {SIMULATION_LEVELS.map((lvl, i) => (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setCurrentLevelIdx(i);
                    setLevelStage('predict');
                    setUserPrediction(null);
                    setPredictFeedback(null);
                    setUserReflection(null);
                    setReflectFeedback(null);
                    setHintStep(0);
                  }}
                  style={{
                    padding: '6px 12px', borderRadius: 16, border: `2px solid ${currentLevelIdx === i ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
                    background: currentLevelIdx === i ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                    color: currentLevelIdx === i ? '#1a1a2e' : 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem'
                  }}
                >
                  {lvl.realWorld.icon} L{lvl.levelNumber}: {lvl.title}
                </button>
              ))}
            </div>

            {/* STAGE 1: PREDICT FIRST */}
            {levelStage === 'predict' && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <div style={{ background: 'rgba(59,130,246,0.15)', border: '2px solid #3b82f6', borderRadius: 16, padding: '16px', maxWidth: 680, margin: '0 auto 16px', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 800 }}>🔮 STEP 1: PREDICT BEFORE TESTING!</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginTop: 4 }}>
                    {level.predictQuestion}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 680, margin: '0 auto' }}>
                  {level.predictOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handlePrediction(opt)}
                      className="reflect-option"
                      style={{ textAlign: 'left' }}
                    >
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                {predictFeedback && (
                  <div style={{ marginTop: 14, color: predictFeedback.type === 'correct' ? '#86efac' : '#fcd34d', fontWeight: 800 }}>
                    {predictFeedback.text}
                  </div>
                )}
              </div>
            )}

            {/* STAGE 2: LIVE PLAY & TEST TOY */}
            {levelStage === 'play_test' && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800 }}>
                    🎮 MISSION {level.levelNumber}: {level.title} ({level.difficulty})
                  </span>
                  
                  {/* 3-Step Hint Ladder */}
                  <div>
                    <button
                      onClick={() => setHintStep(h => Math.min(3, h + 1))}
                      disabled={hintStep >= 3}
                      style={{ background: 'none', border: '1px dashed var(--gold)', borderRadius: 12, padding: '4px 10px', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      💡 Hint ({hintStep}/3): {hintStep === 0 ? 'Need a Nudge?' : hintStep === 1 ? 'Show Clue' : 'Show Solution'}
                    </button>
                  </div>
                </div>

                {hintStep > 0 && (
                  <div style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: 12, padding: '8px 14px', marginBottom: 12, color: 'var(--gold-light)', fontSize: '0.85rem', textAlign: 'left' }}>
                    {level.hintLadder[hintStep - 1]}
                  </div>
                )}

                {/* Active Toy Container */}
                {renderToy(level.toy, handleTestPassed, false)}
              </div>
            )}

            {/* STAGE 3: REAL-WORLD APPLICATION CARD */}
            {levelStage === 'real_world' && (
              <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center', animation: 'bounceIn 0.4s' }}>
                <div style={{ fontSize: '3rem', marginBottom: 8 }}>{level.realWorld.icon}</div>
                <h3 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 800 }}>
                  In the Real World: {level.realWorld.title}
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#93c5fd', fontWeight: 700, margin: '4px 0 12px' }}>
                  {level.realWorld.scenario}
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'white', background: 'rgba(0,0,0,0.25)', borderRadius: 14, padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {level.realWorld.story}
                </p>
                <div style={{ background: 'rgba(76,175,80,0.15)', border: '1px solid #4caf50', borderRadius: 12, padding: '10px 16px', margin: '14px 0', color: '#86efac', fontSize: '0.9rem', textAlign: 'left' }}>
                  <strong>💡 Pro Fact:</strong> {level.realWorld.fact}
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => setLevelStage('reflect')} style={{ marginTop: 10 }}>
                  Answer the "Why Did That Happen?" Question →
                </button>
              </div>
            )}

            {/* STAGE 4: REFLECT QUESTION */}
            {levelStage === 'reflect' && (
              <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'left', animation: 'fadeIn 0.3s' }}>
                <div style={{ background: 'rgba(124,58,237,0.15)', border: '2px solid #7c3aed', borderRadius: 16, padding: '16px', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.8rem', color: '#c4b5fd', fontWeight: 800 }}>🧠 REFLECTION: WHY DO YOU THINK THAT HAPPENED?</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', marginTop: 4 }}>
                    {level.reflection.question}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {level.reflection.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleReflection(opt)}
                      className={`reflect-option ${userReflection === opt ? (opt.correct ? 'correct' : 'wrong') : ''}`}
                      style={{ textAlign: 'left', fontSize: '0.95rem' }}
                    >
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                {reflectFeedback && (
                  <div style={{ marginTop: 14, padding: '12px', borderRadius: 12, background: reflectFeedback.type === 'correct' ? 'rgba(76,175,80,0.15)' : 'rgba(239,83,80,0.15)', border: `1px solid ${reflectFeedback.type === 'correct' ? '#4caf50' : '#ef4444'}`, color: reflectFeedback.type === 'correct' ? '#86efac' : '#fca5a5', fontWeight: 700 }}>
                    {reflectFeedback.text}
                  </div>
                )}
              </div>
            )}

            {/* STAGE 5: LEVEL COMPLETE CELEBRATION */}
            {levelStage === 'level_complete' && (
              <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', animation: 'bounceIn 0.5s' }}>
                <div style={{ fontSize: '3rem', marginBottom: 4 }}>🎉</div>
                <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', fontWeight: 800 }}>
                  Mission {level.levelNumber} Mastered!
                </h2>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0', fontSize: '2rem' }}>
                  {[1, 2, 3].map(s => (
                    <span key={s} style={{ opacity: s <= (starsMap[level.id] || 3) ? 1 : 0.2 }}>⭐</span>
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 16 }}>
                  You solved the mystery, tested the claim, and connected it to real-world engineering!
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-outline" onClick={() => setLevelStage('play_test')}>
                    🔄 Replay Level
                  </button>
                  <button className="btn btn-green btn-lg" onClick={handleNextLevel}>
                    {currentLevelIdx < SIMULATION_LEVELS.length - 1 ? 'Next Mission →' : '🏆 Complete Simulations & Enter Practice!'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= MODE: FREE PLAY SANDBOX ================= */}
        {mode === 'sandbox' && (
          <div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              {SANDBOX_PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSandboxPreset(p.id)}
                  style={{
                    padding: '8px 16px', borderRadius: 16,
                    border: `2px solid ${sandboxPreset === p.id ? 'var(--coral)' : 'rgba(255,255,255,0.15)'}`,
                    background: sandboxPreset === p.id ? 'var(--coral)' : 'rgba(255,255,255,0.05)',
                    color: sandboxPreset === p.id ? '#1a1a2e' : 'white',
                    fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem'
                  }}
                >
                  {p.icon} {p.name}
                </button>
              ))}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>
              {SANDBOX_PRESETS.find(p => p.id === sandboxPreset)?.desc}
            </p>

            {/* Render Sandbox Toy */}
            {renderToy(sandboxPreset, null, true)}
          </div>
        )}
      </div>
    </div>
  );
}
