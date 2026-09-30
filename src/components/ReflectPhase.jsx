// src/components/ReflectPhase.jsx
import { useState, useCallback, useEffect } from 'react';
import { playAudio, playCorrect, playWrong } from '../utils/audio';

const TEACH_QUESTIONS = [
  {
    q: "Why is giving a single example NOT the same as a mathematical proof?",
    options: [
      { text: "An example shows it works once, but doesn't prove it works for every possible number.", correct: true, emoji: "🎯" },
      { text: "Because examples only work on paper, not in computers.", correct: false, emoji: "❌" },
      { text: "Because numbers get tired after one calculation.", correct: false, emoji: "❓" },
    ]
  },
  {
    q: "How many counterexamples do you need to disprove an 'Always' claim?",
    options: [
      { text: "Just one counterexample is enough to break the claim!", correct: true, emoji: "💥" },
      { text: "At least 100 counterexamples.", correct: false, emoji: "❌" },
      { text: "None, you only need an opinion.", correct: false, emoji: "❓" },
    ]
  },
  {
    q: "What are the three essential tools in the Explain-It Toolkit?",
    options: [
      { text: "Claim 🟦, Evidence 🟨, and Reason 🟩", correct: true, emoji: "✨" },
      { text: "Ruler, pencil, and calculator", correct: false, emoji: "❌" },
      { text: "Guess, check, and hope", correct: false, emoji: "❓" },
    ]
  }
];

const CONFIDENCE_LEVELS = [
  { emoji: '🦉', label: "I can explain & prove my thinking!", color: '#4caf50' },
  { emoji: '🙂', label: "I understand claims & reasons!", color: '#ff9800' },
  { emoji: '🤔', label: "I'm still learning counterexamples", color: '#42a5f5' },
];

export default function ReflectPhase({ stats, onRestart, onGoHome }) {
  const [step, setStep] = useState(0);
  const [teachIdx, setTeachIdx] = useState(0);
  const [teachAnswered, setTeachAnswered] = useState(false);
  const [teachCorrect, setTeachCorrect] = useState(0);
  const [confidence, setConfidence] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  // Journal step
  const [journalClaim, setJournalClaim] = useState(0);

  const { score = 0, totalAnswered = 0, xp = 0, maxStreak = 0, worldResults = {} } = stats || {};
  const pct = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 100;
  const totalStars = Object.values(worldResults).reduce((a, r) => a + (r.stars || 0), 0);

  useEffect(() => {
    playAudio("What an adventure! Can you explain one claim using evidence and a reason?");
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const pieces = Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['#ffc107', '#ec4899', '#4caf50', '#3b82f6', '#f59e0b', '#8b5cf6'][i % 6],
        size: 7 + Math.random() * 9,
        duration: 2 + Math.random() * 3,
      }));
      setConfettiPieces(pieces);
    }
  }, [showConfetti]);

  const handleTeachAnswer = useCallback((option) => {
    if (teachAnswered) return;
    setTeachAnswered(true);
    if (option.correct) {
      setTeachCorrect(c => c + 1);
      playCorrect();
    } else {
      playWrong();
    }
    setTimeout(() => {
      setTeachAnswered(false);
      if (teachIdx + 1 < TEACH_QUESTIONS.length) {
        setTeachIdx(i => i + 1);
      } else {
        setStep(1); // Go to Explain-It Journal
      }
    }, 1500);
  }, [teachAnswered, teachIdx]);

  const handleJournalSubmit = () => {
    playCorrect();
    setStep(2); // Go to confidence
  };

  const handleConfidenceSelect = useCallback((idx) => {
    setConfidence(idx);
    setShowConfetti(true);
    playAudio("Lesson complete! You are a Global Think-Aloud Champion!");
    setTimeout(() => setStep(3), 800);
  }, []);

  // Step 0: Teach the Mascot
  if (step === 0) {
    const rq = TEACH_QUESTIONS[teachIdx];
    return (
      <div className="reflect-phase">
        <div className="reflect-header">
          <h3 className="reflect-label">📓 Reflect</h3>
          <p className="reflect-sublabel">Teach Whyzo the owl what you discovered about mathematical proof!</p>
        </div>

        <div className="reflect-card">
          <div className="reflect-mascot-row">
            <div className="mascot thinking" style={{ width: 70, height: 70, fontSize: '2.2rem', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>🦉</div>
            <div className="speech-bubble" style={{ maxWidth: 300 }}>
              Help me understand! {rq.q}
            </div>
          </div>

          <div className="reflect-options">
            {rq.options.map((opt, i) => (
              <button
                key={i}
                className={`reflect-option ${teachAnswered ? (opt.correct ? 'correct' : 'wrong') : ''}`}
                onClick={() => handleTeachAnswer(opt)}
                disabled={teachAnswered}
              >
                <span className="reflect-option-emoji">{opt.emoji}</span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>

          <div className="reflect-progress">
            {TEACH_QUESTIONS.map((_, i) => (
              <div key={i} className={`reflect-dot ${i === teachIdx ? 'active' : i < teachIdx ? 'done' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Explain-It Journal Frame
  if (step === 1) {
    const claimsOptions = [
      {
        claim: "The product of an even number and any whole number is always even.",
        evidence: "For example, 4 × 7 = 28, which is even.",
        reason: "Because any even number has a factor of 2, which stays in the product!"
      },
      {
        claim: "Multiplying by a fraction between 0 and 1 makes numbers smaller.",
        evidence: "For example, 10 × 0.5 = 5, which is smaller than 10.",
        reason: "Because multiplying by a fraction takes only a part of the original whole."
      }
    ];
    const curr = claimsOptions[journalClaim];

    return (
      <div className="reflect-phase">
        <div className="reflect-header">
          <h3 className="reflect-label">📓 Explain-It Journal</h3>
          <p className="reflect-sublabel">Assemble your personal proof card to share with your teacher!</p>
        </div>

        <div className="reflect-card" style={{ maxWidth: 650 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
            <button
              className={`btn btn-sm ${journalClaim === 0 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setJournalClaim(0)}
            >
              Proof A
            </button>
            <button
              className={`btn btn-sm ${journalClaim === 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setJournalClaim(1)}
            >
              Proof B
            </button>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.25)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '18px', textAlign: 'left' }}>
            <div style={{ marginBottom: 12 }}>
              <span className="toolkit-badge claim">🟦 CLAIM</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: 4 }}>{curr.claim}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span className="toolkit-badge evidence">🟨 EVIDENCE</span>
              <div style={{ fontSize: '1rem', marginTop: 4, color: 'var(--gold-light)' }}>{curr.evidence}</div>
            </div>
            <div>
              <span className="toolkit-badge reason">🟩 REASON</span>
              <div style={{ fontSize: '1rem', marginTop: 4, color: 'var(--green-light)' }}>{curr.reason}</div>
            </div>
          </div>

          <button className="btn btn-green btn-lg" onClick={handleJournalSubmit} style={{ marginTop: 20 }}>
            ✨ Seal My Mathematical Proof!
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Confidence
  if (step === 2) {
    return (
      <div className="reflect-phase">
        <div className="reflect-card">
          <h3 className="reflect-card-title">How confident do you feel explaining math thinking?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Every thinker grows stronger with practice!</p>
          
          <div className="confidence-grid">
            {CONFIDENCE_LEVELS.map((c, i) => (
              <button
                key={i}
                className={`confidence-btn ${confidence === i ? 'selected' : ''}`}
                onClick={() => handleConfidenceSelect(i)}
                style={{ '--conf-color': c.color }}
              >
                <span className="confidence-emoji">{c.emoji}</span>
                <span className="confidence-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Certificate
  return (
    <div className="reflect-phase">
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map(p => (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="certificate-card">
        <div className="cert-badge">🏆</div>
        <h2 className="cert-title">Golden Logic Trophy!</h2>
        <p className="cert-subtitle">You completed the World Math Fair journey!</p>

        <div className="score-circle">
          <span className="score-number">{pct}%</span>
          <span className="score-label">{score}/{totalAnswered || 10} Solved</span>
        </div>

        <div style={{ fontSize: '2rem', display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0' }}>
          {[1, 2, 3].map(i => (
            <span key={i} style={{ opacity: i <= Math.max(1, Math.ceil(totalStars / 10)) ? 1 : 0.2 }}>
              ⭐
            </span>
          ))}
        </div>

        <div className="cert-stats">
          <div className="cert-stat">
            <div className="cert-stat-value" style={{ color: 'var(--gold)' }}>{xp}</div>
            <div className="cert-stat-label">Total XP</div>
          </div>
          <div className="cert-stat">
            <div className="cert-stat-value" style={{ color: 'var(--coral)' }}>🔥 {maxStreak}</div>
            <div className="cert-stat-label">Max Streak</div>
          </div>
          <div className="cert-stat">
            <div className="cert-stat-value" style={{ color: 'var(--green-light)' }}>{teachCorrect}/{TEACH_QUESTIONS.length}</div>
            <div className="cert-stat-label">Logic Mastery</div>
          </div>
        </div>

        {/* Badges unlocked */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px', margin: '14px 0' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6 }}>BADGES UNLOCKED:</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(59,130,246,0.2)', padding: '4px 10px', borderRadius: 12, fontSize: '0.85rem' }}>🏅 Clear Thinker</span>
            <span style={{ background: 'rgba(16,185,129,0.2)', padding: '4px 10px', borderRadius: 12, fontSize: '0.85rem' }}>🥈 Proof Builder</span>
            <span style={{ background: 'rgba(245,158,11,0.2)', padding: '4px 10px', borderRadius: 12, fontSize: '0.85rem' }}>🌍 Global Explorer</span>
          </div>
        </div>

        <div className="mascot-container" style={{ marginTop: 12 }}>
          <div className="mascot happy" style={{ width: 75, height: 75, fontSize: '2rem', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>🦉</div>
          <div className="speech-bubble">
            {pct >= 70
              ? "Convincing! You are an official Reasoning Champion! 🏆"
              : "Great effort! You've mastered how to explain your thinking! 💪"}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 }}>
          <button className="btn btn-primary btn-lg" onClick={onRestart}>
            🔄 Practice Again
          </button>
          <button className="btn btn-secondary" onClick={onGoHome}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
