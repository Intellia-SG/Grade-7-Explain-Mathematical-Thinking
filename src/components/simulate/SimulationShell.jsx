// src/components/simulate/SimulationShell.jsx
import { useState, useEffect, useRef } from 'react';
import {
  soundTap,
  soundSnap,
  soundBust,
  soundStar,
  soundXP
} from '../../utils/soundEffects';

// Stubbed Analytics
export function logSimEvent(eventName, payload) {
  try {
    const event = {
      timestamp: new Date().toISOString(),
      event: eventName,
      ...payload
    };
    const history = JSON.parse(localStorage.getItem('g7_sim_analytics') || '[]');
    history.push(event);
    if (history.length > 100) history.shift();
    localStorage.setItem('g7_sim_analytics', JSON.stringify(history));
    console.log(`[SIM ANALYTICS] ${eventName}:`, payload);
  } catch (e) {
    // safe fallback
  }
}

export default function SimulationShell({
  level,
  onLevelComplete,
  onAwardXP,
  currentStars = 0,
  toyComponent: ToyComponent
}) {
  // Current Beat: 'predict' (1) | 'experiment' (2) | 'notice' (3) | 'challenge' (4) | 'prove' (5)
  const [currentBeat, setCurrentBeat] = useState('predict');

  // Beat 1: Predict state
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [confidence, setConfidence] = useState('pretty_sure');
  const [predictLocked, setPredictLocked] = useState(false);
  const [predictFeedback, setPredictFeedback] = useState(null);

  // Beat 2: Experiment state
  const [experimentTime, setExperimentTime] = useState(0);
  const [experimentUnlocked, setExperimentUnlocked] = useState(false);
  const [evidenceTrials, setEvidenceTrials] = useState([]);

  // Beat 3: Notice state
  const [patternRecognized, setPatternRecognized] = useState(false);

  // Beat 4: Challenge state
  const [counterexampleFound, setCounterexampleFound] = useState(false);
  const [challengeTested, setChallengeTested] = useState(false);

  // Beat 5: Prove & CER state
  const [cerSlots, setCerSlots] = useState({ claim: null, evidence: null, reason: null });
  const [availableChips, setAvailableChips] = useState(() => level.prove.chips);
  const [cerFeedback, setCerFeedback] = useState(null);
  const [cerCompleted, setCerCompleted] = useState(false);

  // Gamification & Feedback
  const [xpPopup, setXpPopup] = useState(null);
  const [earnedStars, setEarnedStars] = useState(Math.max(1, currentStars));
  const [hintStep, setHintStep] = useState(0); // 0=none, 1=nudge, 2=strategy, 3=worked
  const [whyzoPose, setWhyzoPose] = useState('curious'); // 'curious' | 'thinking' | 'surprised' | 'proud' | 'busted'
  const [whyzoQuote, setWhyzoQuote] = useState(level.mission);

  // 5-second timer for experiment
  useEffect(() => {
    let timer;
    if (currentBeat === 'experiment' && !experimentUnlocked) {
      timer = setInterval(() => {
        setExperimentTime((t) => {
          if (t >= (level.experiment?.minSeconds || 5) - 1) {
            setExperimentUnlocked(true);
            clearInterval(timer);
            return level.experiment?.minSeconds || 5;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentBeat, experimentUnlocked, level.experiment?.minSeconds]);

  // Show floating XP notification
  const triggerXP = (amount, reason) => {
    soundXP();
    setXpPopup({ amount, reason });
    if (onAwardXP) onAwardXP(amount);
    logSimEvent('xp_awarded', { level: level.levelNumber, amount, reason });
    setTimeout(() => setXpPopup(null), 1800);
  };

  // ─── BEAT 1: PREDICT ──────────────────────────────────────────
  const handleLockPrediction = () => {
    if (!selectedPrediction) return;
    soundTap();
    setPredictLocked(true);

    const isCorrect = selectedPrediction.correct;
    const confObj = level.predict.confidenceLevels.find((c) => c.id === confidence);
    const xpBase = confObj ? confObj.xp : 15;

    if (isCorrect) {
      soundStar();
      setWhyzoPose('proud');
      setWhyzoQuote("Spot on prediction! Let's test it live in the simulation to verify.");
      setPredictFeedback({
        type: 'correct',
        text: `🎯 Great hypothesis! +${xpBase} XP (Calibration Bonus)`
      });
      triggerXP(xpBase, 'Calibrated Prediction Bet');
    } else {
      soundBust();
      setWhyzoPose('surprised');
      setWhyzoQuote("Whoa, plot twist! That's exactly why we do experiments!");
      setPredictFeedback({
        type: 'twist',
        text: `✨ Plot twist! An open mind gets +10 XP Curiosity Bonus!`
      });
      triggerXP(10, 'Mind Open Curiosity Bonus');
    }

    logSimEvent('prediction_locked', {
      level: level.levelNumber,
      predictionId: selectedPrediction.id,
      correct: isCorrect,
      confidence
    });
  };

  const handleAdvanceToExperiment = () => {
    soundTap();
    setCurrentBeat('experiment');
    setWhyzoPose('thinking');
    setWhyzoQuote("Get your hands dirty! Generate evidence by adjusting values.");
  };

  // ─── BEAT 2: EXPERIMENT (TRIAL LOGGER) ────────────────────────
  const handleTrialComplete = (trialData) => {
    setEvidenceTrials((prev) => [
      { id: Date.now(), ...trialData },
      ...prev.slice(0, 7) // keep recent 8 trials
    ]);

    // Check if counterexample was found during false claim levels
    if (trialData.isCounterexample) {
      setCounterexampleFound(true);
      setWhyzoPose('busted');
      setWhyzoQuote("Boom! You just found a real counterexample! Look at the Evidence Board.");
    }

    // Award XP for first 3 trials
    if (evidenceTrials.length < 3) {
      triggerXP(5, 'Evidence Trial Logged');
    }
  };

  // ─── BEAT 3: NOTICE ───────────────────────────────────────────
  const handleNoticeInsight = () => {
    soundStar();
    setPatternRecognized(true);
    setWhyzoPose('proud');
    setWhyzoQuote("You saw the structure! Patterns are the footprints of proof.");
    triggerXP(15, 'Pattern Detected');
    logSimEvent('pattern_recognized', { level: level.levelNumber });
  };

  // ─── BEAT 4: CHALLENGE ────────────────────────────────────────
  const handleChallengeAction = () => {
    soundTap();
    setChallengeTested(true);

    if (level.challenge.isCounterexamplePossible) {
      soundBust();
      setCounterexampleFound(true);
      setWhyzoPose('busted');
      setWhyzoQuote("CLAIM BUSTED! One counterexample destroys an 'always' claim forever!");
      triggerXP(25, 'Counterexample Hunter');
      setEarnedStars((s) => Math.max(s, 2));
      logSimEvent('counterexample_busted', { level: level.levelNumber });
    } else {
      soundStar();
      setWhyzoPose('thinking');
      setWhyzoQuote("Unbreakable! But notice: you can NEVER test all infinite numbers. We need a PROOF!");
      triggerXP(20, 'Infinite Limit Realized');
      setEarnedStars((s) => Math.max(s, 2));
      logSimEvent('infinite_limit_tested', { level: level.levelNumber });
    }
  };

  // ─── BEAT 5: PROVE & CER BUILDER ──────────────────────────────
  const handlePlaceChip = (chip, slotType) => {
    soundTap();
    if (cerSlots[slotType]) {
      // return existing chip
      setAvailableChips((prev) => [...prev, cerSlots[slotType]]);
    }
    setCerSlots((prev) => ({ ...prev, [slotType]: chip }));
    setAvailableChips((prev) => prev.filter((c) => c.id !== chip.id));
    setCerFeedback(null);
  };

  const handleRemoveChip = (slotType) => {
    soundTap();
    const chip = cerSlots[slotType];
    if (chip) {
      setCerSlots((prev) => ({ ...prev, [slotType]: null }));
      setAvailableChips((prev) => [...prev, chip]);
      setCerFeedback(null);
    }
  };

  const handleCheckCER = () => {
    soundTap();
    const { claim, evidence, reason } = cerSlots;
    if (!claim || !evidence || !reason) {
      setCerFeedback({ type: 'incomplete', text: 'Fill all 3 slots (Claim, Evidence, Reason) before submitting!' });
      return;
    }

    const isClaimCorrect = claim.text === level.prove.slots.claim;
    const isEvidenceCorrect = evidence.text === level.prove.slots.evidence;
    const isReasonCorrect = reason.text === level.prove.slots.reason;

    if (isClaimCorrect && isEvidenceCorrect && isReasonCorrect) {
      soundStar();
      setCerCompleted(true);
      setWhyzoPose('proud');
      setWhyzoQuote("Masterpiece of reasoning! Claim, Evidence, and Reason all locked in.");
      const finalStars = hintStep === 0 ? 3 : hintStep <= 2 ? 2 : 1;
      setEarnedStars(finalStars);
      triggerXP(35, 'CER Master Explanation');
      setCerFeedback({
        type: 'correct',
        text: '🌟 Flawless Mathematical Reasoning! You proved your thinking like a mathematician!'
      });
      logSimEvent('cer_completed', { level: level.levelNumber, stars: finalStars });
    } else {
      soundBust();
      setWhyzoPose('surprised');
      setWhyzoQuote("Check the slots closely! One of the chips is a distractor or weak reason.");
      setCerFeedback({
        type: 'retry',
        text: '🤔 Close! Check that the Evidence uses mathematical data and the Reason explains WHY.'
      });
    }
  };

  // 3-Level Hint Ladder
  const handleHintClick = () => {
    soundTap();
    setHintStep((h) => Math.min(3, h + 1));
    logSimEvent('hint_used', { level: level.levelNumber, step: hintStep + 1 });
  };

  return (
    <div className="simulation-shell">
      {/* Floating XP Popup */}
      {xpPopup && (
        <div className="xp-float-popup" aria-live="polite">
          +{xpPopup.amount} XP <span>{xpPopup.reason}</span>
        </div>
      )}

      {/* 5-Beat Journey Stepper Header */}
      <div className="beat-stepper-bar">
        {[
          { id: 'predict', num: 1, label: 'Predict', icon: '🔮' },
          { id: 'experiment', num: 2, label: 'Experiment', icon: '🔬' },
          { id: 'notice', num: 3, label: 'Notice', icon: '📋' },
          { id: 'challenge', num: 4, label: 'Challenge', icon: '💥' },
          { id: 'prove', num: 5, label: 'Generalise', icon: '⚖️' }
        ].map((step, idx) => {
          const isActive = currentBeat === step.id;
          const isPassed = ['predict', 'experiment', 'notice', 'challenge', 'prove'].indexOf(currentBeat) > idx;
          return (
            <button
              key={step.id}
              className={`beat-step-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              onClick={() => {
                soundTap();
                setCurrentBeat(step.id);
              }}
              title={`Jump to Beat ${step.num}: ${step.label}`}
            >
              <span className="beat-step-icon">{isPassed ? '✓' : step.icon}</span>
              <span className="beat-step-label">{step.num}. {step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Whyzo's Live Field Note & Pose */}
      <div className="whyzo-field-note-card">
        <div className="whyzo-avatar-box">
          <div className={`whyzo-avatar pose-${whyzoPose}`} aria-hidden="true">
            {whyzoPose === 'proud' ? '🦉🏆' : whyzoPose === 'busted' ? '🦉💥' : whyzoPose === 'surprised' ? '🦉✨' : whyzoPose === 'thinking' ? '🦉💭' : '🦉'}
          </div>
        </div>
        <div className="whyzo-speech-content">
          <div className="whyzo-field-label">Whyzo's Field Note • Level {level.levelNumber}</div>
          <div className="whyzo-bubble-text">{whyzoQuote}</div>
        </div>

        {/* Level Stats & Hint Ladder */}
        <div className="whyzo-right-actions">
          <div className="star-rating-display">
            {[1, 2, 3].map((s) => (
              <span key={s} style={{ opacity: s <= earnedStars ? 1 : 0.25, fontSize: '1.2rem' }}>
                ⭐
              </span>
            ))}
          </div>

          <button
            className="hint-ladder-btn"
            onClick={handleHintClick}
            disabled={hintStep >= 3}
            title="Get a hint from Whyzo"
          >
            💡 Hint ({hintStep}/3)
          </button>
        </div>
      </div>

      {/* Hint Banner if active */}
      {hintStep > 0 && (
        <div className="hint-banner" role="alert">
          <strong>💡 {hintStep === 1 ? 'Nudge' : hintStep === 2 ? 'Strategy' : 'Worked Step'}:</strong>{' '}
          {level.hintLadder[hintStep - 1]}
        </div>
      )}

      {/* Main Grid: Interactive Stage + Live Evidence Board */}
      <div className="sim-main-grid">
        {/* Left / Center: Active Beat Stage */}
        <div className="sim-stage-container">
          {/* ═══════ BEAT 1: PREDICT ═══════ */}
          {currentBeat === 'predict' && (
            <div className="beat-stage beat-predict">
              <div className="beat-header-tag">🔮 BEAT 1: PLACE YOUR REASONING BET</div>
              <h3 className="beat-question">{level.predict.question}</h3>

              {/* Confidence Bet Bar */}
              <div className="confidence-selector-container">
                <span className="confidence-label">Your Confidence Level:</span>
                <div className="confidence-chips">
                  {level.predict.confidenceLevels.map((conf) => (
                    <button
                      key={conf.id}
                      className={`confidence-chip ${confidence === conf.id ? 'active' : ''}`}
                      onClick={() => {
                        soundTap();
                        setConfidence(conf.id);
                      }}
                      disabled={predictLocked}
                    >
                      {conf.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prediction Options */}
              <div className="predict-options-list">
                {level.predict.options.map((opt) => (
                  <button
                    key={opt.id}
                    className={`predict-option-card ${selectedPrediction?.id === opt.id ? 'selected' : ''}`}
                    onClick={() => {
                      if (!predictLocked) {
                        soundTap();
                        setSelectedPrediction(opt);
                      }
                    }}
                  >
                    <span className="predict-radio">{selectedPrediction?.id === opt.id ? '🔘' : '⚪'}</span>
                    <span className="predict-text">{opt.text}</span>
                  </button>
                ))}
              </div>

              {/* Lock & Advance Actions */}
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                {!predictLocked ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleLockPrediction}
                    disabled={!selectedPrediction}
                  >
                    🔒 LOCK IN PREDICTION BET
                  </button>
                ) : (
                  <div style={{ animation: 'bounceIn 0.4s' }}>
                    {predictFeedback && (
                      <div className={`feedback-alert ${predictFeedback.type}`}>
                        {predictFeedback.text}
                      </div>
                    )}
                    <button
                      className="btn btn-green btn-lg"
                      onClick={handleAdvanceToExperiment}
                      style={{ marginTop: 12 }}
                    >
                      🚀 Enter Sandbox Experiment →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════ BEAT 2: EXPERIMENT (HANDS-ON SANDBOX) ═══════ */}
          {currentBeat === 'experiment' && (
            <div className="beat-stage beat-experiment">
              <div className="beat-header-tag">🔬 BEAT 2: EXPERIMENT & GENERATE EVIDENCE</div>
              <p className="beat-subinstruction">{level.experiment.instructions}</p>

              {/* 5-Second Minimum Discovery Tracker */}
              {!experimentUnlocked && (
                <div className="discovery-timer-bar">
                  <div className="timer-text">
                    ⚡ 5s Discovery Tracker: Keep manipulating the toy! ({experimentTime}/5s)
                  </div>
                  <div className="timer-progress">
                    <div
                      className="timer-fill"
                      style={{ width: `${(experimentTime / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Embedded Interactive Level Toy */}
              <ToyComponent onTrialComplete={handleTrialComplete} isMysteryMode={false} />

              {/* Advance to Notice once experimented */}
              {experimentUnlocked && (
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <button
                    className="btn btn-green btn-lg"
                    onClick={() => {
                      soundTap();
                      setCurrentBeat('notice');
                      setWhyzoPose('curious');
                      setWhyzoQuote("Check the Evidence Board cards. Can you spot the underlying pattern?");
                    }}
                    style={{ animation: 'bounceIn 0.3s ease' }}
                  >
                    📋 View Evidence Board & Spot Patterns →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ═══════ BEAT 3: NOTICE (PATTERN DETECTION) ═══════ */}
          {currentBeat === 'notice' && (
            <div className="beat-stage beat-notice">
              <div className="beat-header-tag">📋 BEAT 3: NOTICE THE PATTERN</div>
              <h3 className="beat-question">{level.notice.curiosityQuestion}</h3>

              {/* Pattern Meter */}
              <div className="pattern-meter-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 6 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800 }}>Evidence Pattern Meter</span>
                  <span style={{ color: '#86efac', fontWeight: 800 }}>
                    {evidenceTrials.length >= 3 ? '100% Consistent Evidence' : `${evidenceTrials.length}/3 Trials Gathered`}
                  </span>
                </div>
                <div className="pattern-bar-bg">
                  <div
                    className="pattern-bar-fill"
                    style={{ width: `${Math.min(100, (evidenceTrials.length / 3) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Pattern Insight Card */}
              {!patternRecognized ? (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <button className="btn btn-primary" onClick={handleNoticeInsight}>
                    🔍 I SEE THE PATTERN! REVEAL INSIGHT
                  </button>
                </div>
              ) : (
                <div className="pattern-insight-card" style={{ animation: 'bounceIn 0.4s' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>💡</div>
                  <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem', marginBottom: 6 }}>
                    Whyzo's Mathematical Insight:
                  </div>
                  <p style={{ color: 'white', fontSize: '0.95rem', margin: 0 }}>
                    {level.notice.patternInsight}
                  </p>
                  <button
                    className="btn btn-green btn-lg"
                    onClick={() => {
                      soundTap();
                      setCurrentBeat('challenge');
                      setWhyzoPose('thinking');
                      setWhyzoQuote("Examples feel convincing. But can you BREAK it?");
                    }}
                    style={{ marginTop: 14 }}
                  >
                    💥 Take the "Break-It" Challenge →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ═══════ BEAT 4: CHALLENGE (BREAK IT!) ═══════ */}
          {currentBeat === 'challenge' && (
            <div className="beat-stage beat-challenge">
              <div className="beat-header-tag">💥 BEAT 4: THE "BREAK-IT" CHALLENGE</div>
              <h3 className="beat-question">{level.challenge.prompt}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{level.challenge.hint}</p>

              {/* Re-render Toy in Challenge context */}
              <ToyComponent onTrialComplete={handleTrialComplete} isMysteryMode={false} />

              <div style={{ textAlign: 'center', marginTop: 16 }}>
                {!challengeTested ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleChallengeAction}
                    style={{ minWidth: 260 }}
                  >
                    💥 ATTEMPT TO BREAK THE CLAIM!
                  </button>
                ) : (
                  <div style={{ animation: 'bounceIn 0.4s' }}>
                    <div className="challenge-success-box">
                      <div style={{ fontSize: '2rem', marginBottom: 6 }}>
                        {level.challenge.isCounterexamplePossible ? '💥' : '🌌'}
                      </div>
                      <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem', marginBottom: 6 }}>
                        {level.challenge.isCounterexamplePossible ? 'CLAIM BUSTED WITH COUNTEREXAMPLE!' : 'UNBREAKABLE AXIOM!'}
                      </div>
                      <p style={{ color: 'white', fontSize: '0.9rem', margin: 0 }}>
                        {level.challenge.breakAttemptSuccessMessage}
                      </p>
                      <div style={{ color: '#93c5fd', fontSize: '0.85rem', marginTop: 8, fontStyle: 'italic' }}>
                        {level.challenge.takeaway}
                      </div>
                    </div>

                    <button
                      className="btn btn-green btn-lg"
                      onClick={() => {
                        soundTap();
                        setCurrentBeat('prove');
                        setWhyzoPose('proud');
                        setWhyzoQuote("Now for the grand finale: Construct the visual CER proof!");
                      }}
                      style={{ marginTop: 14 }}
                    >
                      ⚖️ Proceed to Visual Proof & Generalise →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════ BEAT 5: GENERALISE & PROVE (CER BUILDER) ═══════ */}
          {currentBeat === 'prove' && (
            <div className="beat-stage beat-prove">
              <div className="beat-header-tag">⚖️ BEAT 5: VISUAL PROOF & CLAIM-EVIDENCE-REASON</div>

              {/* Visual General Proof Toy Rendering */}
              <ToyComponent onTrialComplete={handleTrialComplete} isMysteryMode={true} />

              <div style={{ margin: '20px 0 10px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Construct Whyzo's Formal Proof (CER Builder):
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 12px' }}>
                  Click a slot below, or tap a word chip to place it into [Claim], [Evidence], or [Reason]:
                </p>
              </div>

              {/* CER 3 Target Slots */}
              <div className="cer-slots-container">
                {/* Slot 1: CLAIM */}
                <div
                  className={`cer-slot slot-claim ${cerSlots.claim ? 'filled' : ''}`}
                  onClick={() => handleRemoveChip('claim')}
                  title="Click to remove placed chip"
                >
                  <div className="slot-badge claim">Claim 🟦</div>
                  <div className="slot-content">
                    {cerSlots.claim ? cerSlots.claim.text : 'Tap a [Claim] chip from below to place here...'}
                  </div>
                </div>

                {/* Slot 2: EVIDENCE */}
                <div
                  className={`cer-slot slot-evidence ${cerSlots.evidence ? 'filled' : ''}`}
                  onClick={() => handleRemoveChip('evidence')}
                  title="Click to remove placed chip"
                >
                  <div className="slot-badge evidence">Evidence 🟨</div>
                  <div className="slot-content">
                    {cerSlots.evidence ? cerSlots.evidence.text : 'Tap an [Evidence] chip from below to place here...'}
                  </div>
                </div>

                {/* Slot 3: REASON */}
                <div
                  className={`cer-slot slot-reason ${cerSlots.reason ? 'filled' : ''}`}
                  onClick={() => handleRemoveChip('reason')}
                  title="Click to remove placed chip"
                >
                  <div className="slot-badge reason">Reason 🟩</div>
                  <div className="slot-content">
                    {cerSlots.reason ? cerSlots.reason.text : 'Tap a [Reason] chip from below to place here...'}
                  </div>
                </div>
              </div>

              {/* Available Word Chips Tray */}
              <div className="cer-chips-tray">
                {availableChips.map((chip) => (
                  <button
                    key={chip.id}
                    className={`cer-chip chip-${chip.type}`}
                    onClick={() => {
                      if (!cerSlots.claim && chip.type === 'claim') handlePlaceChip(chip, 'claim');
                      else if (!cerSlots.evidence && chip.type === 'evidence') handlePlaceChip(chip, 'evidence');
                      else if (!cerSlots.reason && chip.type === 'reason') handlePlaceChip(chip, 'reason');
                      else if (!cerSlots.claim) handlePlaceChip(chip, 'claim');
                      else if (!cerSlots.evidence) handlePlaceChip(chip, 'evidence');
                      else if (!cerSlots.reason) handlePlaceChip(chip, 'reason');
                    }}
                  >
                    <span className="chip-type-tag">{chip.type}</span>
                    <span>{chip.text}</span>
                  </button>
                ))}
              </div>

              {/* Validation Feedback */}
              {cerFeedback && (
                <div className={`feedback-alert ${cerFeedback.type}`} style={{ marginTop: 12 }}>
                  {cerFeedback.text}
                </div>
              )}

              {/* Submission Button */}
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                {!cerCompleted ? (
                  <button className="btn btn-primary btn-lg" onClick={handleCheckCER}>
                    ✨ SUBMIT & VERIFY PROOF ARGUMENT
                  </button>
                ) : (
                  <div style={{ animation: 'bounceIn 0.5s' }}>
                    <div style={{ fontSize: '2.5rem', margin: '8px 0' }}>🏆⭐</div>
                    <h3 style={{ color: 'var(--gold)', margin: '4px 0' }}>
                      Level {level.levelNumber} Mastered with {earnedStars} Stars!
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 500, margin: '0 auto 16px' }}>
                      You formulated a prediction, tested live evidence, checked edge cases, and proved your reasoning mathematically!
                    </p>
                    <button
                      className="btn btn-green btn-lg"
                      onClick={() => onLevelComplete(earnedStars)}
                    >
                      🎉 Complete Level & Continue →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Evidence Board (Always collecting trial cards) */}
        <aside className="sim-evidence-board" aria-label="Live Evidence Board">
          <div className="board-header">
            <span className="board-title">📋 Live Evidence Board</span>
            <span className="board-count-badge">{evidenceTrials.length} Trials</span>
          </div>

          <div className="board-cards-scroll">
            {evidenceTrials.length === 0 ? (
              <div className="board-empty-state">
                <span style={{ fontSize: '1.8rem' }}>🧪</span>
                <p>No trials recorded yet.<br />Interact with the simulation to generate live evidence cards!</p>
              </div>
            ) : (
              evidenceTrials.map((t) => (
                <div key={t.id} className={`evidence-card ${t.isCounterexample ? 'counterexample' : ''}`}>
                  <div className="card-top-tag">{t.tag || 'Trial Data'}</div>
                  <div className="card-formula">{t.trialText}</div>
                  <div className="card-note">{t.leftoverNote}</div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
