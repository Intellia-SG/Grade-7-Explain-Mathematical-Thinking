// src/components/IntroScreen.jsx

const JOURNEY_PHASES = [
  { icon: '🔍', label: 'Wonder', desc: 'Sofia vs Carlos mystery!' },
  { icon: '📖', label: 'Story', desc: 'Global Think-Aloud Club' },
  { icon: '🧪', label: 'Simulate', desc: '3 Interactive Proof Labs' },
  { icon: '🎮', label: 'Practice', desc: '100 Landmark Challenges' },
  { icon: '📓', label: 'Reflect', desc: 'Explain-It Frame Journal' },
];

export default function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      {/* Curriculum badge */}
      <div className="intro-badge">
        ✨ · Grade 7 Mathematics · Reasoning & Proof
      </div>

      {/* Title */}
      <h1 className="intro-title">
        <span style={{ color: 'var(--gold)' }}>Explain Mathematical Thinking</span>{' '}—{' '}
        <span style={{ color: 'var(--coral)' }}>Claims, Evidence & Proof</span>
      </h1>

      {/* Mascot */}
      <div className="mascot-container">
        <div className="mascot" style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', fontSize: '2.5rem' }}>🦉</div>
        <div className="speech-bubble" style={{ maxWidth: 280 }}>
          A right answer is not enough. You must explain why it is right! 🦉⚖️
        </div>
      </div>

      {/* Description */}
      <p className="intro-desc">
        Join ten friends from ten countries at the <strong style={{ color: 'var(--gold)' }}>World Math Fair</strong>! Learn to build arguments, hunt down counterexamples, catch sneaky errors, and earn the <strong style={{ color: 'var(--coral)' }}>Golden Logic Trophy</strong>!
      </p>

      {/* Journey map */}
      <div className="intro-journey-map">
        <h3 className="intro-journey-title">Your Learning Journey</h3>
        <div className="intro-journey-steps">
          {JOURNEY_PHASES.map((p, i) => (
            <div key={i} className="intro-journey-step">
              <div className="intro-journey-icon">{p.icon}</div>
              <div className="intro-journey-info">
                <div className="intro-journey-label">{p.label}</div>
                <div className="intro-journey-desc">{p.desc}</div>
              </div>
              {i < JOURNEY_PHASES.length - 1 && <div className="intro-journey-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="btn btn-green btn-lg intro-start-btn" onClick={onStart} id="start-journey-btn" style={{ animation: 'bounceIn 0.5s' }}>
        🚀 Begin Your Journey!
      </button>

      {/* Feature cards */}
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-card-icon">🏛️</div>
          <div className="feature-card-label">10 Landmark Worlds</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🧪</div>
          <div className="feature-card-label">3 Proof Labs</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🏆</div>
          <div className="feature-card-label">Logic Trophy & XP</div>
        </div>
      </div>
    </div>
  );
}
