// src/components/FloatingSymbols.jsx
import { useState } from 'react';

const SYMBOLS = ['Claim', 'Evidence', 'Reason', 'Proof', '8 × ½', '∴', '∵', '≠', 'Always', 'Sometimes', 'Never', 'Counterexample'];
const COUNT = 16;

export default function FloatingSymbols() {
  const [items] = useState(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      sym: SYMBOLS[i % SYMBOLS.length],
      left: `${(i * 6.2 + Math.random() * 3) % 94}%`,
      size: `${1.1 + (i % 3) * 0.4}rem`,
      duration: `${14 + (i % 5) * 3}s`,
      delay: `${-(i * 2)}s`,
    }))
  );

  return (
    <div className="floating-symbols" aria-hidden="true">
      {items.map(({ id, sym, left, size, duration, delay }) => (
        <span
          key={id}
          className="float-sym"
          style={{ left, fontSize: size, animationDuration: duration, animationDelay: delay }}
        >
          {sym}
        </span>
      ))}
    </div>
  );
}
