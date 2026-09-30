// src/App.jsx
import { useState, useCallback } from 'react';
import FloatingSymbols from './components/FloatingSymbols';
import IntroScreen from './components/IntroScreen';
import WonderPhase from './components/WonderPhase';
import StoryPhase from './components/StoryPhase';
import SimulatePhase from './components/SimulatePhase';
import PlayPhase from './components/PlayPhase';
import ReflectPhase from './components/ReflectPhase';
import { setMuted, isAudioMuted } from './utils/audio';

const PHASES = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect'];
const JOURNEY_ITEMS = [
  { icon: '🔍', label: 'Wonder' },
  { icon: '📖', label: 'Story' },
  { icon: '🧪', label: 'Simulate' },
  { icon: '🎮', label: 'Practice' },
  { icon: '📓', label: 'Reflect' },
];

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [playStats, setPlayStats] = useState(null);
  const [isMutedState, setIsMutedState] = useState(isAudioMuted());

  const toggleMute = useCallback(() => {
    const newState = !isMutedState;
    setIsMutedState(newState);
    setMuted(newState);
  }, [isMutedState]);

  const goHome = useCallback(() => {
    setPhase('intro');
    setPlayStats(null);
  }, []);

  const restart = useCallback(() => {
    setPhase('wonder');
    setPlayStats(null);
  }, []);

  const phaseIndex = PHASES.indexOf(phase);

  return (
    <>
      <FloatingSymbols />
      <div className="app-container">
        {/* Home Button */}
        {phase !== 'intro' && (
          <button className="home-btn" onClick={goHome} title="Return to Intro">
            🏠 Home
          </button>
        )}

        {/* Journey Progress Bar with Mute Button next to Reflect */}
        <div className="journey-bar">
          {JOURNEY_ITEMS.map((item, i) => {
            const stepPhaseIndex = i + 1; // wonder=1, story=2, etc.
            const isActive = phaseIndex === stepPhaseIndex;
            const isCompleted = phaseIndex > stepPhaseIndex;
            return (
              <div key={i} className="journey-step-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  className={`journey-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => setPhase(PHASES[stepPhaseIndex])}
                  title={`Jump to ${item.label}`}
                >
                  <div className="journey-step-dot">{isCompleted ? '✓' : item.icon}</div>
                  <div className="journey-step-label">{item.label}</div>
                </div>
                {i < JOURNEY_ITEMS.length - 1 && (
                  <div className={`journey-connector ${phaseIndex > stepPhaseIndex ? 'filled' : ''}`} />
                )}
              </div>
            );
          })}

          {/* Mute Button next to Reflect */}
          <div className="journey-divider" />
          <button
            onClick={toggleMute}
            title={isMutedState ? "Unmute Audio" : "Mute Audio"}
            className="journey-mute-btn"
            aria-label={isMutedState ? "Unmute Audio" : "Mute Audio"}
          >
            {isMutedState ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Phase Content */}
        {phase === 'intro' && (
          <IntroScreen
            onStart={() => setPhase('wonder')}
          />
        )}

        {phase === 'wonder' && (
          <WonderPhase
            onComplete={() => setPhase('story')}
          />
        )}

        {phase === 'story' && (
          <StoryPhase
            onComplete={() => setPhase('simulate')}
          />
        )}

        {phase === 'simulate' && (
          <SimulatePhase
            onComplete={() => setPhase('play')}
          />
        )}

        {phase === 'play' && (
          <PlayPhase
            onComplete={(stats) => {
              setPlayStats(stats);
              setPhase('reflect');
            }}
          />
        )}

        {phase === 'reflect' && (
          <ReflectPhase
            stats={playStats}
            onRestart={restart}
            onGoHome={goHome}
          />
        )}
      </div>
    </>
  );
}
