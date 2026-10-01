// src/components/SimulatePhase.jsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { SIMULATION_LEVELS_DATA } from '../data/simulationLevelsData';
import SimulationShell, { logSimEvent } from './simulate/SimulationShell';
import { playAudio, stopNarration } from '../utils/audio';
import { soundTap } from '../utils/soundEffects';

// Lazy load level toys for small bundle and optimal 60fps performance
const L1TokyoBento = lazy(() => import('./simulate/toys/L1TokyoBento'));
const L2CairoDiscount = lazy(() => import('./simulate/toys/L2CairoDiscount'));
const L3SolarPanel = lazy(() => import('./simulate/toys/L3SolarPanel'));
const L4BridgeAudit = lazy(() => import('./simulate/toys/L4BridgeAudit'));
const L5ContainerSequence = lazy(() => import('./simulate/toys/L5ContainerSequence'));
const L6TribunalCourt = lazy(() => import('./simulate/toys/L6TribunalCourt'));

const TOY_COMPONENTS = {
  1: L1TokyoBento,
  2: L2CairoDiscount,
  3: L3SolarPanel,
  4: L4BridgeAudit,
  5: L5ContainerSequence,
  6: L6TribunalCourt
};

export default function SimulatePhase({ onComplete }) {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [mode, setMode] = useState('guided'); // 'guided' | 'sandbox'
  const [sandboxToyId, setSandboxToyId] = useState(1);

  // Gamification state with safe localStorage persistence
  const [starsMap, setStarsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('g7_sim_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [totalXP, setTotalXP] = useState(() => {
    try {
      return parseInt(localStorage.getItem('g7_sim_xp') || '0', 10);
    } catch {
      return 0;
    }
  });

  const currentLevel = SIMULATION_LEVELS_DATA[currentLevelIdx];
  const CurrentToy = TOY_COMPONENTS[currentLevel.id];
  const SandboxToy = TOY_COMPONENTS[sandboxToyId];

  // Save progress safely
  useEffect(() => {
    try {
      localStorage.setItem('g7_sim_stars', JSON.stringify(starsMap));
      localStorage.setItem('g7_sim_xp', totalXP.toString());
    } catch (e) {
      console.warn('Storage save skipped', e);
    }
  }, [starsMap, totalXP]);

  // Audio narration hook
  useEffect(() => {
    playAudio(currentLevel.mission);
    return () => stopNarration();
  }, [currentLevelIdx, currentLevel.mission]);

  // Handle XP award
  const handleAwardXP = (amount) => {
    setTotalXP((prev) => prev + amount);
  };

  // Handle level completion from Shell
  const handleLevelComplete = (earnedStars) => {
    setStarsMap((prev) => ({
      ...prev,
      [currentLevel.id]: Math.max(prev[currentLevel.id] || 0, earnedStars)
    }));

    logSimEvent('level_finished', {
      level: currentLevel.levelNumber,
      stars: earnedStars
    });

    if (currentLevelIdx < SIMULATION_LEVELS_DATA.length - 1) {
      setCurrentLevelIdx((i) => i + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="simulate-phase">
      {/* Top Header Clearance & Introduction */}
      <div className="simulate-top-nav-container">
        <div className="simulate-header">
          <h2 className="simulate-title">🧪 Mathematical Thinking Simulation Labs</h2>
          <p className="simulate-subtitle">
            Explore claims through hands-on physics, collect live evidence, hunt counterexamples, and construct proofs with Whyzo!
          </p>
        </div>

        {/* Mode Switcher & Global XP Display */}
        <div className="simulate-controls-row">
          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${mode === 'guided' ? 'active' : ''}`}
              onClick={() => {
                soundTap();
                setMode('guided');
              }}
            >
              🎮 Guided Missions ({currentLevelIdx + 1}/{SIMULATION_LEVELS_DATA.length})
            </button>
            <button
              className={`mode-btn ${mode === 'sandbox' ? 'active' : ''}`}
              onClick={() => {
                soundTap();
                setMode('sandbox');
              }}
            >
              🧪 Free-Play Sandbox (Break-It Mode)
            </button>
          </div>

          <div className="sim-xp-pill">
            <span>⭐</span>
            <strong>{totalXP} XP</strong>
          </div>
        </div>

        {/* Level Selector Tabs (Fixed clearance so journey-bar NEVER overlaps) */}
        {mode === 'guided' && (
          <nav className="level-tabs-nav" aria-label="Simulation Level Select">
            {SIMULATION_LEVELS_DATA.map((lvl, idx) => {
              const isCurrent = currentLevelIdx === idx;
              const stars = starsMap[lvl.id] || 0;
              return (
                <button
                  key={lvl.id}
                  className={`level-tab-btn ${isCurrent ? 'active' : ''} ${stars > 0 ? 'completed' : ''}`}
                  onClick={() => {
                    soundTap();
                    setCurrentLevelIdx(idx);
                  }}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <span className="lvl-tab-icon">{lvl.realWorld.icon}</span>
                  <span className="lvl-tab-text">L{lvl.levelNumber}: {lvl.title}</span>
                  {stars > 0 && <span className="lvl-tab-stars">{'⭐'.repeat(stars)}</span>}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Main Experience Workspace */}
      <main className="simulate-content-stage">
        {mode === 'guided' ? (
          <Suspense fallback={<div className="loading-stage">⚡ Preparing Reasoning Simulation...</div>}>
            <SimulationShell
              key={currentLevel.id}
              level={currentLevel}
              toyComponent={CurrentToy}
              onLevelComplete={handleLevelComplete}
              onAwardXP={handleAwardXP}
              currentStars={starsMap[currentLevel.id] || 0}
            />
          </Suspense>
        ) : (
          /* Free Play Sandbox Mode */
          <div className="sandbox-view-container">
            <div className="sandbox-presets-bar">
              {SIMULATION_LEVELS_DATA.map((lvl) => (
                <button
                  key={lvl.id}
                  className={`btn-tag ${sandboxToyId === lvl.id ? 'active' : ''}`}
                  onClick={() => {
                    soundTap();
                    setSandboxToyId(lvl.id);
                  }}
                >
                  {lvl.realWorld.icon} L{lvl.levelNumber}: {lvl.title}
                </button>
              ))}
            </div>

            <div className="sandbox-toy-host">
              <Suspense fallback={<div className="loading-stage">⚡ Loading Sandbox Toy...</div>}>
                <SandboxToy onTrialComplete={() => {}} isMysteryMode={false} />
              </Suspense>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
