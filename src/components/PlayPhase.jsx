// src/components/PlayPhase.jsx
import { useState, useCallback, useEffect } from 'react';
import { playAudio, playCorrect, playWrong } from '../utils/audio';
import { WORLDS } from '../data/contextPools';
import { generateWorldQuestions } from '../generators/index';

function calcXP(attempt, streak) {
  const base = attempt === 1 ? 10 : 6;
  return base + (streak >= 5 ? 5 : 0);
}

function calcStars(correct, total = 10) {
  const pct = correct / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.6) return 1;
  return 0;
}

export default function PlayPhase({ onComplete }) {
  const [currentWorld, setCurrentWorld] = useState(-1);
  const [worldResults, setWorldResults] = useState({});
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [xpPopup, setXpPopup] = useState(null);
  const [worldComplete, setWorldComplete] = useState(false);
  const [worldQuestions, setWorldQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    playAudio('practice_intro');
  }, []);

  const q = worldQuestions[qIndex];

  const startWorld = useCallback((worldId) => {
    const dynamicSeed = Math.floor(Math.random() * 10000000);
    const questions = generateWorldQuestions(worldId, dynamicSeed, Date.now());
    setWorldQuestions(questions);
    setCurrentWorld(worldId);
    setQIndex(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setWorldComplete(false);
    setFeedback(null);
    setAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
  }, []);

  const finishWorld = useCallback(() => {
    const stars = calcStars(score, worldQuestions.length);
    setWorldResults(prev => ({
      ...prev,
      [currentWorld]: { score, total: worldQuestions.length, stars }
    }));
    setWorldComplete(true);
  }, [currentWorld, score, worldQuestions.length]);

  const backToMap = useCallback(() => {
    setCurrentWorld(-1);
    setWorldComplete(false);
    setFeedback(null);
  }, []);

  const handleAllComplete = useCallback(() => {
    const totalScore = Object.values(worldResults).reduce((a, r) => a + r.score, 0) + score;
    const totalQ = Object.values(worldResults).reduce((a, r) => a + r.total, 0) + (worldQuestions.length || 0);
    onComplete({
      score: totalScore,
      xp: totalXP,
      maxStreak,
      totalAnswered: totalQ,
      worldResults: {
        ...worldResults,
        [currentWorld]: { score, total: worldQuestions.length, stars: calcStars(score, worldQuestions.length) }
      }
    });
  }, [worldResults, score, totalXP, maxStreak, worldQuestions, currentWorld, onComplete]);

  const advance = useCallback(() => {
    setFeedback(null);
    setAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
    if (qIndex + 1 < worldQuestions.length && lives > 0) {
      setQIndex(i => i + 1);
    } else {
      finishWorld();
    }
  }, [qIndex, worldQuestions.length, lives, finishWorld]);

  const handleAnswer = useCallback((optIdx) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(optIdx);
    const isCorrect = optIdx === q.correct;
    const optionLetters = ['A', 'B', 'C', 'D'];
    const correctLetter = optionLetters[q.correct] || '';

    if (isCorrect) {
      const ns = streak + 1;
      const earned = calcXP(1, ns);
      setScore(s => s + 1);
      setStreak(ns);
      setMaxStreak(ms => Math.max(ms, ns));
      setTotalXP(x => x + earned);
      playCorrect();
      setXpPopup(`+${earned} XP`);
      setTimeout(() => setXpPopup(null), 1500);
      setFeedback({
        type: 'correct',
        message: ns >= 5 ? `🔥 ${ns} Streak! Convincing!` : 'Convincing! 🎉',
        sub: q.explanation
      });
      setTimeout(advance, 1900);
    } else {
      setStreak(0);
      setLives(l => l - 1);
      playWrong();
      setFeedback({
        type: 'wrong',
        message: 'Not quite! Check the reasoning.',
        sub: `Correct: (${correctLetter}) ${q.options[q.correct]}. ${q.explanation}`
      });
      if (lives - 1 <= 0) {
        setTimeout(finishWorld, 2200);
      } else {
        setTimeout(advance, 2200);
      }
    }
  }, [answered, q, streak, advance, lives, finishWorld]);

  // World Map
  if (currentWorld < 0) {
    const allDone = WORLDS.every((_, i) => worldResults[i]);
    return (
      <div className="play-phase">
        <div className="play-header">
          <h2 className="play-title">🎮 Practice — Choose Your World Landmark!</h2>
          <p className="play-subtitle">Travel through 10 global cities, prove your mathematical claims, and collect stars!</p>
          {totalXP > 0 && <div className="play-xp-badge">⭐ {totalXP} XP</div>}
        </div>

        <div className="world-map">
          {WORLDS.map((w, i) => {
            const unlocked = i === 0 || (worldResults[i - 1] && worldResults[i - 1].score >= 6);
            const completed = worldResults[i];
            return (
              <div
                key={w.id}
                className={`world-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
                onClick={() => unlocked && startWorld(i)}
                style={{ '--world-color': w.color }}
              >
                {!unlocked && <div className="world-lock">🔒</div>}
                <div className="world-icon">{w.icon}</div>
                <div className="world-name">{w.name}</div>
                <div className="world-desc">{w.desc}</div>
                {completed && (
                  <div className="world-stars">
                    {[1, 2, 3].map(s => (
                      <span key={s} style={{ opacity: s <= completed.stars ? 1 : 0.2 }}>⭐</span>
                    ))}
                    <span className="world-score">{completed.score}/{completed.total}</span>
                  </div>
                )}
                {unlocked && !completed && <div className="world-play-btn">▶ ENTER BOOTH</div>}
              </div>
            );
          })}
        </div>

        {allDone && (
          <button className="btn btn-green btn-lg" onClick={handleAllComplete} style={{ marginTop: 24, animation: 'bounceIn 0.5s ease' }}>
            🏆 Complete Challenge & View Trophy!
          </button>
        )}
      </div>
    );
  }

  // World Complete View
  if (worldComplete) {
    const w = WORLDS[currentWorld];
    const stars = calcStars(score, worldQuestions.length);
    const passed = score >= 6;
    const isLastWorld = currentWorld === WORLDS.length - 1;

    return (
      <div className="play-phase">
        <div className="world-complete-card">
          <div className="world-complete-icon">{w.icon}</div>
          <h2 className="world-complete-title">{w.name} Complete!</h2>
          <div className="world-complete-score">{score}/{worldQuestions.length}</div>
          
          <div className="world-complete-stars">
            {[1, 2, 3].map(s => (
              <span key={s} className={`world-star ${s <= stars ? 'earned' : ''}`} style={{ animationDelay: `${s * 0.2}s` }}>
                ⭐
              </span>
            ))}
          </div>

          <p style={{ color: passed ? 'var(--green-light)' : 'var(--coral)', fontWeight: 700, margin: '8px 0' }}>
            {passed ? '🎉 Landmark Mastered! Next city unlocked!' : 'Try again to score at least 6/10 and advance!'}
          </p>

          <div className="world-complete-xp">⭐ {totalXP} XP earned</div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-outline btn-sm" onClick={backToMap}>← World Map</button>
            {isLastWorld && passed ? (
              <button className="btn btn-green" onClick={handleAllComplete}>🏆 Finish Journey!</button>
            ) : passed ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setWorldResults(prev => ({ ...prev, [currentWorld]: { score, total: worldQuestions.length, stars } }));
                  startWorld(currentWorld + 1);
                }}
              >
                Next Landmark →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => startWorld(currentWorld)}>
                🔄 Retry City
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Question Active View
  if (!q) return null;
  const w = WORLDS[currentWorld];
  const pct = Math.round((qIndex / worldQuestions.length) * 100);

  return (
    <div className="play-phase">
      <div className="play-world-badge" style={{ background: w.color }}>
        {w.icon} {w.name}
      </div>

      <div className="hud">
        <div className="hud-item">⭐ {totalXP} XP</div>
        <div className="hearts">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} style={{ opacity: i < lives ? 1 : 0.2 }}>❤️</span>
          ))}
        </div>
        <div className={`hud-item ${streak >= 5 ? 'streak-fire' : ''}`}>
          🔥 {streak}x Streak
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 700, marginBottom: 16 }}>
        <div className="progress-bar-container">
          <div className="progress-bar-label">
            <span>Question {qIndex + 1}/{worldQuestions.length}</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="question-card" style={{ animation: 'slideUp 0.3s ease' }}>
        <div className="question-text" style={{ whiteSpace: 'pre-line' }}>
          {q.questionText}
        </div>

        <div className="options-grid">
          {q.options.map((opt, i) => {
            const letter = ['A', 'B', 'C', 'D'][i] || `${i + 1}`;
            let statusClass = '';
            if (answered) {
              if (i === q.correct) statusClass = 'correct';
              else if (i === selectedOption) statusClass = 'wrong';
              else statusClass = 'disabled';
            }
            return (
              <button
                key={i}
                className={`option-btn ${statusClass}`}
                onClick={() => handleAnswer(i)}
                disabled={answered}
              >
                <span className="option-prefix">{letter}</span>
                <span className="option-label">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Hint button */}
        {!answered && (
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setShowHint(h => !h)}
              style={{ background: 'none', border: '1px dashed rgba(255,193,7,0.4)', borderRadius: 14, padding: '6px 14px', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
            {showHint && (
              <div style={{ marginTop: 8, color: 'var(--gold-light)', fontSize: '0.9rem', fontStyle: 'italic', animation: 'fadeIn 0.3s' }}>
                {q.hint1}
              </div>
            )}
          </div>
        )}
      </div>

      {xpPopup && <div className="xp-popup">{xpPopup}</div>}

      {feedback && (
        <div className="feedback-overlay">
          <div className={`feedback-content ${feedback.type}`}>
            <div className="feedback-emoji">{feedback.type === 'correct' ? '🎉' : '🤔'}</div>
            <div className="feedback-message">{feedback.message}</div>
            <div className="feedback-sub">{feedback.sub}</div>
          </div>
        </div>
      )}
    </div>
  );
}
