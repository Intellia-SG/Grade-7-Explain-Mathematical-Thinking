// src/components/StoryPhase.jsx
import { useState, useEffect, useCallback } from 'react';
import { playAudio, stopNarration } from '../utils/audio';

const STORY_PANELS = [
  {
    id: 0,
    title: "The Global Think-Aloud Club",
    text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Think-Aloud Club. They meet online from ten countries to enter the World Math Fair.",
    highlight: '"A global team of math explorers on a quest for mathematical proof!"',
    mascotText: "10 friends, 1 mission! 🌍",
    icon: "🌍",
    image: "/images/story/story_0.jpg",
    caption: "The Global Think-Aloud Club connecting at the World Math Fair"
  },
  {
    id: 1,
    title: "Whyzo's Golden Rule",
    text: "The judge, Whyzo the owl, has one rule. A right answer is not enough. You must explain why it is right!",
    highlight: '"A right answer is not enough. You must explain why it is right!"',
    mascotText: "Explain your reasoning! 🦉⚖️",
    icon: "🦉",
    image: "/images/story/story_1.jpg",
    caption: "Judge Whyzo with the Golden Scales of Mathematical Truth"
  },
  {
    id: 2,
    title: "Does One Example Prove It?",
    text: "Mike in New York says, seven plus nine is sixteen, so two odd numbers always add to an even number. Whyzo asks, does one example prove it?",
    highlight: '"Testing one example shows it works once, but does NOT prove it for all numbers!"',
    mascotText: "One example is a clue, not a proof! 🔍",
    icon: "🗽",
    image: "/images/story/story_2.jpg",
    caption: "Mike's calculation on the blackboard — but is one example enough?"
  },
  {
    id: 3,
    title: "Proof by Structure",
    text: "Yuki in Tokyo shows a picture. Each odd number is a pair of dots with one dot left over. Two leftover dots make a new pair, so the total is even!",
    highlight: '"Odd = Pairs + 1. Two leftovers unite into a complete pair!"',
    mascotText: "Look at the dots pairing up! 💡",
    icon: "🗼",
    image: "/images/story/story_3.jpg",
    caption: "Yuki's structural proof: leftover dots join into a new 2-pair"
  },
  {
    id: 4,
    title: "The Error Detective",
    text: "Aisha in Mumbai checks her friend's work. Negative three minus negative five equals two, not negative eight. She points to the exact step where the mistake happened.",
    highlight: '"Subtracting a negative turns into adding positive: −3 − (−5) = −3 + 5 = 2!"',
    mascotText: "Found the error at Step 2! 🕵️",
    icon: "🌶️",
    image: "/images/story/story_4.jpg",
    caption: "Aisha diagnosing the sign misconception on the Mumbai Sea Link blueprint"
  },
  {
    id: 5,
    title: "The Explain-It Toolkit",
    text: "Claim, evidence, reason! With these three tools, every explorer can explain their thinking and earn the Golden Logic Trophy!",
    highlight: '"Claim 🟦 · Evidence 🟨 · Reason 🟩 = Your Complete Toolkit!"',
    mascotText: "You are ready for the Golden Trophy! 🏆",
    icon: "🏆",
    image: "/images/story/story_5.jpg",
    caption: "The three logic shields and the Golden Logic Trophy"
  }
];

export default function StoryPhase({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const [anim, setAnim] = useState(false);
  const s = STORY_PANELS[slide];
  const isLast = slide === STORY_PANELS.length - 1;
  const pct = ((slide + 1) / STORY_PANELS.length) * 100;

  useEffect(() => {
    playAudio(s.text);
    return () => stopNarration();
  }, [slide, s.text]);

  const goNext = useCallback(() => {
    if (anim) return;
    setAnim(true);
    stopNarration();
    setTimeout(() => {
      if (isLast) {
        onComplete();
      } else {
        setSlide(i => i + 1);
      }
      setAnim(false);
    }, 350);
  }, [anim, isLast, onComplete]);

  const goPrev = useCallback(() => {
    if (anim || slide === 0) return;
    setAnim(true);
    stopNarration();
    setTimeout(() => {
      setSlide(i => i - 1);
      setAnim(false);
    }, 350);
  }, [anim, slide]);

  return (
    <div className="story-phase">
      <div className="story-progress">
        <div className="story-progress-bar">
          <div className="story-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="story-progress-label">{slide + 1} / {STORY_PANELS.length}</span>
      </div>

      <div className={`story-card story-card-flex ${anim ? 'flipping' : ''}`}>
        <div className="story-image-section">
          <img
            src={s.image}
            alt={s.title}
            className="story-image"
            style={{
              width: '100%',
              borderRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              border: '2px solid rgba(255,255,255,0.12)',
              objectFit: 'cover'
            }}
          />
          <div className="story-image-badge">
            <span>{s.icon}</span>
            <span>{s.caption}</span>
          </div>
        </div>

        <div className="story-text-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>{s.icon}</span>
            <h2 className="story-title" style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>
              {s.title}
            </h2>
          </div>

          <p className="story-text revealed" style={{ fontSize: '1.35rem', fontWeight: 600, lineHeight: '1.7', marginBottom: 0 }}>
            {s.text}
          </p>

          <div className="story-highlight visible" style={{ margin: '18px 0', padding: '12px 18px' }}>
            <span>✨</span>
            <span className="story-highlight-text" style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>
              {s.highlight}
            </span>
            <span>✨</span>
          </div>

          <div className="story-mascot" style={{ marginTop: 8 }}>
            <div className="mascot" style={{ width: 54, height: 54, fontSize: '1.8rem', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>🦉</div>
            <div className="speech-bubble" style={{ fontSize: '0.95rem', padding: '10px 14px', maxWidth: 280 }}>
              {s.mascotText}
            </div>
          </div>
        </div>
      </div>

      <div className="story-nav">
        <button className="btn btn-outline btn-sm" onClick={goPrev} disabled={slide === 0} style={{ opacity: slide === 0 ? 0.3 : 1 }}>
          ← Back
        </button>
        <div className="story-dots">
          {STORY_PANELS.map((_, i) => (
            <div key={i} className={`story-dot ${i === slide ? 'active' : i < slide ? 'completed' : ''}`} />
          ))}
        </div>
        <button className={`btn ${isLast ? 'btn-green' : 'btn-primary'} btn-sm`} onClick={goNext}>
          {isLast ? "🚀 Let's Simulate!" : 'Next →'}
        </button>
      </div>
    </div>
  );
}
