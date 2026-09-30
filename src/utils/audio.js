// src/utils/audio.js
// Pre-generated ElevenLabs MP3 playback engine with Web Audio chime fallback
import { audioMap } from './audioMap';

let isMuted = false;
let currentAudio = null;
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Musical chime fallback for correct answers (D5 -> A5, sine wave)
export function playChimeCorrect() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    osc2.frequency.setValueAtTime(880, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.14);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.42);
  } catch (e) {}
}

// Gentle chime fallback for wrong answers
export function playChimeWrong() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(195, now + 0.25);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

export function stopNarration() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }
}

export function playAudio(trackNameOrText) {
  if (isMuted || !trackNameOrText) return;

  stopNarration();

  const key = typeof trackNameOrText === 'string' ? trackNameOrText.trim() : trackNameOrText;
  const assetPath = audioMap[key] || audioMap[trackNameOrText];

  if (assetPath) {
    try {
      const audio = new Audio(assetPath);
      currentAudio = audio;
      audio.play().catch(() => {
        // Autoplay policy or interaction requirement; fallback safely
        if (key === 'very_good' || key === 'correct') playChimeCorrect();
        if (key === 'incorrect' || key === 'wrong') playChimeWrong();
      });
    } catch (e) {
      if (key === 'very_good' || key === 'correct') playChimeCorrect();
      if (key === 'incorrect' || key === 'wrong') playChimeWrong();
    }
  } else {
    // If not in audioMap and it's a feedback signal, play synthesizer chime
    if (key === 'very_good' || key === 'correct') {
      playChimeCorrect();
    } else if (key === 'incorrect' || key === 'wrong') {
      playChimeWrong();
    }
  }
}

export function playCorrect() {
  playAudio('very_good');
}

export function playWrong() {
  playAudio('incorrect');
}

export function setMuted(muted) {
  isMuted = muted;
  if (muted) {
    stopNarration();
  }
}

export function isAudioMuted() {
  return isMuted;
}

// Segment helper methods matching audio pipeline
export const say = (text, opts) => ({ text, ...opts });
export const ask = (text, opts) => ({ text, ...opts });
export const cheer = (text, opts) => ({ text, ...opts });
export const emphasize = (text, opts) => ({ text, ...opts });
export const think = (text, opts) => ({ text, ...opts });
export const celebrate = (text, opts) => ({ text, ...opts });
export const instruct = (text, opts) => ({ text, ...opts });

export async function narrate(segments) {
  if (isMuted || !segments || segments.length === 0) return;
  for (const seg of segments) {
    if (seg?.text) {
      playAudio(seg.text);
      await new Promise(r => setTimeout(r, 2500));
    }
  }
}
