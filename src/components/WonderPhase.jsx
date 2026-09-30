// src/components/WonderPhase.jsx
import { useState, useEffect, useCallback } from 'react';
import { playAudio, stopNarration } from '../utils/audio';

const WONDER_DATA = {
  question: "Sofia says: \"When you multiply two numbers, the answer is always bigger.\" Carlos says: \"Not always!\" Who is right — and how can we PROVE it?",
  subtext: "Does multiplying always make numbers grow? What happens when we multiply by a fraction like 1/2, or 0? Let's become reasoning detectives!",
  emoji: "🦉🔍",
  bgEmojis: ["🦉", "🔍", "✖️", "➗", "❓", "✨", "🧠", "💡"],
};

export default function WonderPhase({ onComplete }) {
  const wonder = WONDER_DATA;
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState([]);
  const [testNum, setTestNum] = useState(0.5);

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: wonder.bgEmojis[i % wonder.bgEmojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 1.2 + Math.random() * 1.5,
    }));
    setParticles(p);
  }, [wonder]);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => {
      setStage(2);
      playAudio("Sofia says, when you multiply two numbers, the answer is always bigger. Carlos says, not always! Who is right, and how can we prove it? Let's discover how to explain our mathematical thinking!");
    }, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); stopNarration(); };
  }, []);

  const handleDiscover = useCallback(() => {
    stopNarration();
    setTimeout(() => onComplete(), 500);
  }, [onComplete]);

  return (
    <div className="wonder-phase">
      <div className="wonder-particles">
        {particles.map(p => (
          <span key={p.id} className="wonder-particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
          }}>{p.emoji}</span>
        ))}
      </div>
      
      <div className="wonder-content" style={{ maxWidth: 720 }}>
        <div className={`wonder-question-card ${stage >= 1 ? 'visible' : ''}`}>
          <div className="wonder-emoji" style={{ fontSize: '3.5rem' }}>{wonder.emoji}</div>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '2px solid #3b82f6', borderRadius: 16, padding: '12px 18px', maxWidth: 280, textAlign: 'left' }}>
              <strong style={{ color: '#60a5fa' }}>👧 Sofia:</strong> "Multiplying two numbers ALWAYS makes the answer bigger!"
            </div>
            <div style={{ background: 'rgba(245,158,11,0.15)', border: '2px solid #f59e0b', borderRadius: 16, padding: '12px 18px', maxWidth: 280, textAlign: 'left' }}>
              <strong style={{ color: '#fbbf24' }}>👦 Carlos:</strong> "Not always! I can find a number that makes it smaller!"
            </div>
          </div>

          {/* Interactive Calculator Sneak Peek */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '14px', margin: '16px auto', maxWidth: 360 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700 }}>LIVE PROBE: 8 × {testNum}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: (8 * testNum) < 8 ? 'var(--coral)' : 'var(--green-light)' }}>
              8 × {testNum} = {8 * testNum} {(8 * testNum) < 8 ? '📉 (Smaller!)' : '📈 (Bigger!)'}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
              {[0.5, 0.25, 1, 2, 0].map(val => (
                <button key={val} onClick={() => setTestNum(val)} style={{
                  padding: '4px 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)',
                  background: testNum === val ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                  color: testNum === val ? '#1a1a2e' : 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem'
                }}>
                  × {val}
                </button>
              ))}
            </div>
          </div>

          <h2 className="wonder-question-text" style={{ fontSize: '1.4rem', lineHeight: '1.5', marginTop: 12 }}>
            Who is right — and how do we build an airtight mathematical proof?
          </h2>
          
          <p className="wonder-subtext" style={{ fontSize: '1.15rem', marginTop: '10px', lineHeight: '1.5', color: 'var(--gold)' }}>
            {wonder.subtext}
          </p>
        </div>

        <button className={`btn btn-wonder ${stage >= 2 ? 'visible' : ''}`} onClick={handleDiscover} id="discover-btn" style={{ minWidth: 240 }}>
          <span className="wonder-btn-sparkle">✨</span>
          Let's Discover!
          <span className="wonder-btn-sparkle">✨</span>
        </button>
      </div>
    </div>
  );
}
