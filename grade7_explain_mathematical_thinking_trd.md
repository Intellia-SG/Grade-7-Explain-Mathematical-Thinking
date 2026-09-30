# Technical Requirements Document (TRD)

## Explain Mathematical Thinking — Claims, Evidence, Reasons & Proof | Grade 7 Math

### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, random question generation, simulation logic, gamification, audio pipeline and quality standards for **"Global Think-Aloud Club — Explain Mathematical Thinking"**, an interactive lesson module for Grade 7 Math.

The module is a **React (Vite + JSX) application** structured to mirror the reference repository **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>** (folders: `public/assets`, `scripts`, `src`; root files `index.html`, `package.json`, `postcss.config.js`, `tailwind.config.js`, `vite.config.js`, `.gitignore`) and styled to strictly match **<https://grade5-time-intervals.vercel.app/>**. It is uploaded to the Intellia course catalogue at:

```
https://intelliasg.com/courses/grade-3-math
```

Audio narration uses **ElevenLabs exclusively**, implementing the pipeline in `audio_generation_pipeline.md` (offline pre-generation → `audioMap.js` → runtime engine with queue management, eager preloading and dynamic fallback).

**Key technical differences from the Grade 5 reference module**

| Area                 | Grade 5 Time Intervals                  | This module                                                                  |
| -------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| Math engine          | Minute-based time arithmetic            | **Claim/validator engine**, error-injection engine, expression formatter     |
| Questions            | Fixed 100-question bank + shuffle       | **Seeded procedural generators** — nothing stored, every session differs     |
| Key diagrams         | Clock face, timeline bar                | Counter Board, Argument Frame, Number Line Probe, Step Ladder, Balance Scale |
| Audio for questions  | Mostly pre-generated phrases            | Fixed lines pre-generated; **generated question text narrated dynamically** via speech normaliser |

> **Implementation note:** copy dependency versions, Tailwind theme tokens, global CSS and layout components (top bar, bottom bar, phase wrapper, world map, feedback overlay, badge toast) directly from the reference repo, then swap content and diagrams. This guarantees UI parity. The TRD-level values below (e.g., colour hex codes) are fall-backs only when the reference token is unavailable.

---

## 2. Technology Stack

| Layer            | Technology                                   | Rationale                                              |
| ---------------- | -------------------------------------------- | ------------------------------------------------------ |
| UI Framework     | React (JSX) + Vite                           | Matches reference repo structure                       |
| State Management | `useReducer` + `useState`                    | Sufficient for a single-module experience              |
| Styling          | Tailwind CSS + PostCSS (+ small `App.css`)   | Matches `tailwind.config.js` / `postcss.config.js`     |
| Icons            | Lucide React                                 | Consistent icon set                                    |
| Animation        | CSS keyframes + transitions                  | No external dependency; respects reduced motion        |
| Diagrams         | Inline SVG (React components)                | Counters, number lines, balance scale, step ladder     |
| Drag & Drop      | Pointer Events (custom hook) + tap fallback  | Touch-friendly, no heavy dependency                    |
| Randomness       | `mulberry32` seeded PRNG + `crypto.getRandomValues` for seeds | Reproducible sessions, restorable after refresh |
| Persistence      | `localStorage` (seed + progress)             | 24-hour resume; no backend                             |
| Audio            | ElevenLabs API + HTML5 `Audio`               | Alice voice, per-style settings                        |
| Build / Deploy   | Vite → Vercel (static + serverless proxy)    | Matches reference deployment                           |

---

## 3. Project Structure (mirrors the reference repo)

```
grade7-explain-mathematical-thinking/
├── public/
│   └── assets/
│       ├── audio/                          # Pre-generated .mp3 (ElevenLabs)
│       └── images/
│           ├── whyzo-idle.svg
│           ├── whyzo-happy.svg
│           ├── whyzo-thinking.svg
│           ├── whyzo-celebrate.svg
│           ├── whyzo-curious.svg
│           ├── whyzo-encourage.svg
│           ├── world-map-bg.svg
│           └── landmarks/                  # cairo, mumbai, paris, tokyo, sydney,
│                                           # rio, capetown, nairobi, istanbul, london
├── scripts/
│   ├── generate_audio.js                   # Offline ElevenLabs pre-generation
│   ├── clean_audio.js                      # Remove orphaned .mp3
│   └── check_parity.js                     # Diff narration.js vs phrases[] (CI)
├── api/
│   └── elevenlabs.js                       # Serverless proxy (server-side key)
├── src/
│   ├── main.jsx
│   ├── App.jsx                             # Root + useReducer game state
│   ├── App.css                             # Global styles (ported from reference)
│   ├── components/
│   │   ├── IntroScreen.jsx
│   │   ├── ProgressMap.jsx                 # 6-phase dot tracker
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx
│   │   │   ├── StoryPhase.jsx
│   │   │   ├── SimulatePhase.jsx
│   │   │   ├── PlayPhase.jsx
│   │   │   └── ReflectPhase.jsx
│   │   ├── simulations/
│   │   │   ├── ProofBuilderStation.jsx     # Station A
│   │   │   ├── CounterexampleLabStation.jsx# Station B
│   │   │   └── ErrorDetectiveStation.jsx   # Station C
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx        # Dispatcher by question.type
│   │   │   ├── OrderReasoningQ.jsx         # Q1
│   │   │   ├── CompleteExplanationQ.jsx    # Q2
│   │   │   ├── BestJustificationQ.jsx      # Q3
│   │   │   ├── MatchRepresentationQ.jsx    # Q4
│   │   │   ├── AlwaysSometimesNeverQ.jsx   # Q5
│   │   │   ├── CounterexampleQ.jsx         # Q6
│   │   │   ├── CompareStrategiesQ.jsx      # Q7
│   │   │   ├── ErrorDetectiveQ.jsx         # Q8
│   │   │   ├── PatternGeneraliseQ.jsx      # Q9
│   │   │   ├── ExplainAnswerQ.jsx          # Q10
│   │   │   └── HintOverlay.jsx
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx
│   │   │   ├── StarRating.jsx
│   │   │   ├── BadgePanel.jsx
│   │   │   ├── StreakCounter.jsx
│   │   │   └── WorldMap.jsx                # 10 landmark worlds
│   │   └── shared/
│   │       ├── Mascot.jsx                  # Whyzo with mood states
│   │       ├── CounterBoard.jsx
│   │       ├── ArgumentFrame.jsx           # Claim/Evidence/Reason/Conclusion slots
│   │       ├── ArgumentTile.jsx
│   │       ├── NumberLineProbe.jsx
│   │       ├── StepLadder.jsx
│   │       ├── BalanceScale.jsx
│   │       ├── RepresentationCard.jsx
│   │       ├── ToolkitDrawer.jsx           # Sentence frames, always available
│   │       ├── VerdictChip.jsx             # "Convincing!" / "Needs evidence!" ...
│   │       └── FeedbackOverlay.jsx
│   ├── data/
│   │   ├── storyContent.js                 # 6 story panels (text + visuals)
│   │   ├── claims.js                       # Claim library + validators
│   │   ├── errorFamilies.js                # Error-injection templates
│   │   ├── contextPools.js                 # Names, cities, booths, sentence frames
│   │   └── badges.js
│   ├── generators/
│   │   ├── index.js                        # generateWorld(), registry, dedupe
│   │   ├── q01_orderReasoning.js
│   │   ├── q02_completeExplanation.js
│   │   ├── q03_bestJustification.js
│   │   ├── q04_matchRepresentation.js
│   │   ├── q05_alwaysSometimesNever.js
│   │   ├── q06_counterexample.js
│   │   ├── q07_compareStrategies.js
│   │   ├── q08_errorDetective.js
│   │   ├── q09_patternGeneralise.js
│   │   └── q10_explainAnswer.js
│   ├── hooks/
│   │   ├── useAudio.js
│   │   ├── useGameState.js
│   │   ├── useLocalStorage.js
│   │   └── useDragTile.js
│   └── utils/
│       ├── audio.js                        # Engine (say/ask/cheer/... + narrate)
│       ├── audioMap.js                     # AUTO-GENERATED
│       ├── narration.js                    # Phase scripts (1:1 with UI)
│       ├── speech.js                       # toSpoken() speech normaliser
│       ├── prng.js                         # mulberry32, pick, randInt, shuffle, hashSeed
│       ├── mathFormat.js                   # minus sign, fractions, rounding helpers
│       ├── misconceptions.js               # Distractor factories by misconception
│       ├── scoring.js                      # XP + stars
│       └── badgeEngine.js
├── audio_generation_pipeline.md            # Provided pipeline doc
├── grade7_explain_mathematical_thinking_prd.md
├── grade7_explain_mathematical_thinking_trd.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```js
const initialState = {
  // Navigation
  phase: 'intro',              // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,               // 0–5
  currentSimStation: 0,        // 0=ProofBuilder, 1=CounterexampleLab, 2=ErrorDetective
  simStationsComplete: [false, false, false],
  simRound: 0,                 // round index in current station

  // Session randomness
  sessionSeed: null,           // uint32, created on first load, persisted
  worldRetries: Array(10).fill(0),

  // Play phase
  worldQuestions: Array(10).fill(null), // generated lazily per world
  currentWorld: 0,             // 0–9
  currentIndexInWorld: 0,      // 0–9
  worldScores: Array(10).fill(null),
  attemptCount: 0,             // per question, max 3
  hintsUsed: 0,
  bonusUnlocked: Array(10).fill(false),

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  counterexampleFirstTry: 0,   // Counterexample Hunter progress (Q5 + Q6)
  errorFirstTry: 0,            // Error Detective progress (Q8)
  stationAPerfect: false,

  // Reflect
  reflection: { claimId: null, evidence: '', reason: '' },

  // Phase completion
  phaseComplete: { wonder: false, story: false, simulate: false, play: false, reflect: false },

  // Settings
  audioEnabled: true,
  reducedMotion: false,        // initialised from prefers-reduced-motion
};
```

### 4.2 Reducer Action Types

```js
const ACTIONS = {
  SET_PHASE, NEXT_STORY_PANEL, COMPLETE_SIM_STATION, NEXT_SIM_ROUND,
  INIT_SESSION, LOAD_WORLD, RETRY_WORLD,
  ANSWER_CORRECT, ANSWER_INCORRECT, USE_HINT, NEXT_QUESTION, FINISH_WORLD,
  UNLOCK_BADGE, COMPLETE_PHASE, SAVE_REFLECTION,
  TOGGLE_AUDIO, RESTORE_SESSION, RESET_SESSION,
};
```

### 4.3 Key Reducer Logic

```js
case ACTIONS.ANSWER_CORRECT: {
  const { question } = action.payload;
  const firstTry = state.attemptCount === 0;
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak)
                 + (firstTry && question.explanationBonus ? 3 : 0);
  const newStreak = state.streak + 1;

  const scores = [...state.worldScores];
  scores[state.currentWorld] = (scores[state.currentWorld] ?? 0) + 1;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: scores,
    totalStars: calcTotalStars(scores),
    counterexampleFirstTry: state.counterexampleFirstTry +
      (firstTry && ['always_sometimes_never', 'counterexample'].includes(question.type) ? 1 : 0),
    errorFirstTry: state.errorFirstTry + (firstTry && question.type === 'error_detective' ? 1 : 0),
    attemptCount: 0,
    hintsUsed: 0,
  };
}

case ACTIONS.ANSWER_INCORRECT:
  return { ...state, streak: 0, attemptCount: state.attemptCount + 1 };

case ACTIONS.RETRY_WORLD: {
  const w = action.payload.world;
  const retries = [...state.worldRetries]; retries[w] += 1;
  const scores = [...state.worldScores]; scores[w] = null;
  const worlds = [...state.worldQuestions]; worlds[w] = null; // regenerated with new retry index
  return { ...state, worldRetries: retries, worldScores: scores, worldQuestions: worlds,
           currentIndexInWorld: 0, attemptCount: 0, hintsUsed: 0 };
}
```

---

## 5. Randomness Engine (`utils/prng.js`)

### 5.1 Seeded PRNG and Helpers

```js
export function newSessionSeed() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0];
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(...parts) {          // FNV-1a over stringified parts
  let h = 2166136261;
  for (const p of parts) {
    for (const ch of String(p)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    h ^= 124; h = Math.imul(h, 16777619);     // separator
  }
  return h >>> 0;
}

export const randInt = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min;
export const pick    = (rng, arr) => arr[Math.floor(rng() * arr.length)];

export function shuffle(rng, arr) {           // Fisher–Yates
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

### 5.2 Why Seeded

- A refresh restores the **same** questions (seed + `worldRetries` are persisted; questions are regenerated deterministically)
- A new lesson session creates a new seed → a different 100 questions
- Unit tests can reproduce any reported bad question from its seed

### 5.3 Determinism Rule

Generators must consume the RNG **only** through the passed `rng` (never `Math.random()`), and must consume it in a fixed order. Any `Math.random()` inside `generators/` fails lint (custom ESLint rule `no-restricted-properties`).

---

## 6. Claim Engine (`data/claims.js`)

A **claim** is a general mathematical statement with a machine-checkable test. The same library powers Station B and question types Q5 and Q6, guaranteeing that every "counterexample" the student submits is **verified by code, not by a hard-coded answer**.

### 6.1 Claim Schema

```js
/**
 * @typedef {Object} Claim
 * @property {string}  id
 * @property {string}  text            // Narrated/on-screen statement
 * @property {1|2|3}   tier            // Intended difficulty
 * @property {'always'|'sometimes'|'never'} verdict
 * @property {1|2}     arity           // number of test inputs
 * @property {(x:number,y?:number)=>boolean} domain   // Is this input allowed by the claim?
 * @property {(x:number,y?:number)=>boolean} holds    // Does the claim hold for this input?
 * @property {string}  reasonAlways?   // Best general reason (verdict 'always')
 * @property {string}  reasonBreaks?   // Explanation once a counterexample is found
 */
```

### 6.2 Validation Helpers

```js
export function evaluateTest(claim, x, y) {
  if (!claim.domain(x, y)) return { valid: false };
  return { valid: true, held: claim.holds(x, y) };
}
export const isCounterexample = (claim, x, y) => {
  const r = evaluateTest(claim, x, y);
  return r.valid && !r.held;
};

const isInt = Number.isInteger;
const isPrime = (n) =>
  isInt(n) && n > 1 &&
  Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0);
```

### 6.3 Claim Library (≥ 18 claims; 12 "sometimes", 5 "always", 1 "never")

| id                 | Claim (abridged)                                                | Tier | Verdict   | Domain                      |
| ------------------ | --------------------------------------------------------------- | ---- | --------- | --------------------------- |
| `add_pos_greater`  | Adding a positive number always gives a greater number          | 1    | always    | y > 0                       |
| `consec_sum_odd`   | The sum of two consecutive whole numbers is odd                 | 1    | always    | integer x                   |
| `even_times_any_even` | An even number times any whole number is even                | 1    | always    | x even, y integer           |
| `odd_times_odd_odd`| An odd number times an odd number is odd                        | 1    | always    | x, y odd                    |
| `double_bigger`    | Doubling a number always makes it bigger                        | 1    | sometimes | any x                       |
| `add_makes_bigger` | Adding a number always makes it bigger                          | 1    | sometimes | any x, y                    |
| `triple_bigger`    | Tripling a number always makes it bigger                        | 1    | sometimes | any x                       |
| `mul_bigger`       | Multiplying a positive number by a positive number makes it bigger | 2 | sometimes | x > 0, y > 0               |
| `div_smaller`      | Dividing a positive number by a positive number makes it smaller| 2    | sometimes | x > 0, y > 0                |
| `sub_makes_smaller`| Subtracting a number always makes it smaller                    | 2    | sometimes | any x, y                    |
| `halve_smaller`    | Halving a number always makes it smaller                        | 2    | sometimes | any x                       |
| `abs_positive`     | The absolute value of a number is always positive               | 2    | sometimes | any x                       |
| `neg_times_neg_pos`| A negative number times a negative number is positive           | 2    | always    | x < 0, y < 0                |
| `square_bigger`    | Squaring a number always makes it larger                        | 3    | sometimes | any x                       |
| `cube_bigger`      | Cubing a number always makes it larger                          | 3    | sometimes | any x                       |
| `sqrt_smaller`     | The square root of a positive number is always smaller          | 3    | sometimes | x > 0                       |
| `primes_sum_even`  | The sum of two prime numbers is even                            | 3    | sometimes | x, y prime                  |
| `up_down_10`       | Increasing by 10% then decreasing by 10% returns the original   | 3    | never     | x > 0                       |

### 6.4 Example Definitions

```js
export const CLAIMS = [
  {
    id: 'mul_bigger', tier: 2, verdict: 'sometimes', arity: 2,
    text: 'Multiplying a positive number by another positive number always makes it bigger.',
    domain: (x, y) => x > 0 && y > 0,
    holds:  (x, y) => x * y > x,
    reasonBreaks: 'Multiplying by a number between 0 and 1, or by exactly 1, does not make the first number bigger.',
  },
  {
    id: 'add_pos_greater', tier: 1, verdict: 'always', arity: 2,
    text: 'Adding a positive number to any number always gives a greater number.',
    domain: (x, y) => y > 0,
    holds:  (x, y) => x + y > x,
    reasonAlways: 'Adding a positive amount moves the number to the right on the number line, so the result is always greater.',
  },
  {
    id: 'primes_sum_even', tier: 3, verdict: 'sometimes', arity: 2,
    text: 'The sum of two prime numbers is always even.',
    domain: (x, y) => isPrime(x) && isPrime(y),
    holds:  (x, y) => (x + y) % 2 === 0,
    reasonBreaks: 'Two is a prime number and it is even. Two plus an odd prime is odd.',
  },
  {
    id: 'up_down_10', tier: 3, verdict: 'never', arity: 1,
    text: 'Increasing a number by ten percent and then decreasing the result by ten percent gives the original number.',
    domain: (x) => x > 0,
    holds:  (x) => Math.abs(x * 1.1 * 0.9 - x) < 1e-9,
    reasonBreaks: 'The decrease is ten percent of the new, bigger number, so you take away more than you added.',
  },
  // ... remaining claims follow the same pattern
];
```

### 6.5 Library Self-Test (runs in CI)

For every claim, brute-force a grid of candidate inputs (`[-3,-2,-1,0,0.25,0.5,1,2,3,4,5,7,8,10]` for arity 1; its square for arity 2) filtered by `domain`:

- `always` → **no** valid input breaks the claim
- `sometimes` → at least one valid input holds **and** at least one breaks
- `never` → **no** valid input holds

A mismatch fails the build, so a wrong verdict can never ship.

---

## 7. Error-Injection Engine (`data/errorFamilies.js`)

Each family builds a **correct** worked solution and a **faulty** copy with exactly one planted mistake.

### 7.1 Family Output Schema

```js
/**
 * @typedef {Object} ErrorProblem
 * @property {string}   familyId
 * @property {1|2|3}    level
 * @property {string[]} lines          // Faulty solution lines (shown to student)
 * @property {string[]} correctLines   // Same length or shorter, correct version
 * @property {number}   faultyIndex    // 0-based index of first wrong line
 * @property {string}   fixLine        // The corrected line at faultyIndex
 * @property {string}   reasonCorrect  // Why the line is wrong
 * @property {string[]} reasonDistractors // 3 plausible but wrong reasons
 * @property {string}   signature
 */
```

### 7.2 Families

| id                        | Level | Planted error                                        |
| ------------------------- | ----- | ---------------------------------------------------- |
| `sign_subtract_negative`  | 1     | − (−b) treated as − b                                |
| `add_denominators`        | 1     | 1/b + 1/d = 2/(b + d)                                |
| `order_of_operations`     | 2     | a + b × c evaluated left-to-right                    |
| `distribute_first_only`   | 2     | k(x + m) = kx + m                                    |
| `inverse_operation_wrong` | 3     | ax + b = c → ax = c + b                              |
| `percent_wrong_base`      | 3     | Reversing "p% off" by adding p% of the **old** price |

### 7.3 Example Families

```js
import { randInt, pick } from '../utils/prng';
import { minus, frac } from '../utils/mathFormat';   // minus(n) → "−3" for negatives

export const ERROR_FAMILIES = {
  sign_subtract_negative: {
    level: 1,
    build(rng) {
      const a = randInt(rng, 2, 9);
      let b = randInt(rng, 2, 9);
      if (b === a) b = a === 9 ? 8 : a + 1;
      return {
        familyId: 'sign_subtract_negative', level: 1,
        lines:        [`−${a} − (−${b})`, `= −${a} − ${b}`, `= −${a + b}`],
        correctLines: [`−${a} − (−${b})`, `= −${a} + ${b}`, `= ${minus(b - a)}`],
        faultyIndex: 1,
        fixLine: `= −${a} + ${b}`,
        reasonCorrect: `Subtracting −${b} is the same as adding ${b}, so the sign must change to a plus.`,
        reasonDistractors: [
          'Negative numbers cannot be subtracted from each other.',
          'Two negative signs always make a negative answer.',
          `The first number should have been written as ${a}.`,
        ],
        signature: `sign_subtract_negative|${a}|${b}`,
      };
    },
  },

  order_of_operations: {
    level: 2,
    build(rng) {
      const a = randInt(rng, 2, 9), b = randInt(rng, 2, 9), c = randInt(rng, 2, 9);
      return {
        familyId: 'order_of_operations', level: 2,
        lines:        [`${a} + ${b} × ${c}`, `= ${a + b} × ${c}`, `= ${(a + b) * c}`],
        correctLines: [`${a} + ${b} × ${c}`, `= ${a} + ${b * c}`, `= ${a + b * c}`],
        faultyIndex: 1,
        fixLine: `= ${a} + ${b * c}`,
        reasonCorrect: 'Multiplication must be done before addition, so ' + `${b} × ${c}` + ' is worked out first.',
        reasonDistractors: [
          'Addition always comes first because it is written first.',
          'Both operations can be done in any order.',
          `The number ${a} should be multiplied by ${c} as well.`,
        ],
        signature: `order_of_operations|${a}|${b}|${c}`,
      };
    },
  },
  // add_denominators, distribute_first_only, inverse_operation_wrong, percent_wrong_base follow the same contract
};
```

**Rules for every family**

- Only **one** faulty line; all lines after it are *consistent with the error* (so the student must find the **first** wrong line)
- `reasonDistractors` are real misconceptions, never obviously silly
- Numbers avoid trivial cases (0, 1, equal operands) via guards
- Decimals rounded with `round2()` from `mathFormat.js` to avoid floating-point artefacts

---

## 8. Question Generation

### 8.1 Question Schema

```js
/**
 * @typedef {Object} Question
 * @property {string} id                  // `${worldIndex}-${indexInWorld}`
 * @property {string} type                // see QuestionType
 * @property {number} world               // 0–9
 * @property {1|2|3}  difficulty
 * @property {string} questionText        // EXACT on-screen + narrated text
 * @property {string} visual              // 'counters' | 'numberLine' | 'stepLadder' | 'balance' | 'cards' | 'none'
 * @property {object} visualProps         // Props for the chosen diagram
 * @property {string} interaction         // 'mcq' | 'order' | 'fill' | 'match' | 'pick-step'
 * @property {string[]} options           // Rendered options (for mcq/fill bank)
 * @property {number|number[]} correct    // Index / indices / order
 * @property {string} hint1               // After attempt 1
 * @property {string} hint2               // After attempt 2 (drives animation)
 * @property {string} explanation         // After attempt 3 (narrated)
 * @property {string} misconceptionTag    // For analytics + feedback wording
 * @property {boolean} explanationBonus   // Q3/Q10 completeness bonus
 * @property {string} signature           // Uniqueness key (no names/cities)
 * @property {{name:string, city:string}} [persona]
 */
type QuestionType =
  | 'order_reasoning'          // Q1
  | 'complete_explanation'     // Q2
  | 'best_justification'       // Q3
  | 'match_representation'     // Q4
  | 'always_sometimes_never'   // Q5
  | 'counterexample'           // Q6
  | 'compare_strategies'       // Q7
  | 'error_detective'          // Q8
  | 'pattern_generalise'       // Q9
  | 'explain_answer';          // Q10
```

### 8.2 World Generator (`generators/index.js`)

Each world is generated **lazily** when the student enters it; retries use a new `retry` index so the 10 questions change.

```js
import { mulberry32, hashSeed, shuffle } from '../utils/prng';

export const WORLD_MIX = [          // [easy, medium, hard] per world (totals 35 / 40 / 25)
  [8, 2, 0], [7, 3, 0], [6, 4, 0], [4, 5, 1], [3, 5, 2],
  [3, 5, 2], [2, 5, 3], [1, 4, 5], [1, 4, 5], [0, 3, 7],
];

export const TYPE_IDS = [
  'order_reasoning', 'complete_explanation', 'best_justification', 'match_representation',
  'always_sometimes_never', 'counterexample', 'compare_strategies', 'error_detective',
  'pattern_generalise', 'explain_answer',
];

export function generateWorld({ seed, world, retry = 0, avoid = new Set() }) {
  const rng = mulberry32(hashSeed(seed, world, retry));
  const [e, m, h] = WORLD_MIX[world];
  const tiers = shuffle(rng, [...Array(e).fill(1), ...Array(m).fill(2), ...Array(h).fill(3)]);
  const types = shuffle(rng, TYPE_IDS);            // exactly one of each type per world
  const used = new Set(avoid);
  const out = [];

  types.forEach((type, i) => {
    let q = null, tries = 0;
    do {
      q = GENERATORS[type](rng, tiers[i], world);
      tries += 1;
    } while (used.has(q.signature) && tries < 60);
    if (used.has(q.signature) && import.meta.env.DEV) {
      console.warn('[generateWorld] pool exhausted for', type, 'tier', tiers[i]); // CI test forbids this
    }
    used.add(q.signature);
    out.push({ ...q, id: `${world}-${i}`, world, difficulty: tiers[i] });
  });

  return out;   // already in random order within the world
}
```

**`avoid` set:** signatures of the *final* attempt of every earlier world plus the previous attempt of the same world (so a retry never repeats a question). Because earlier worlds are regenerated from the persisted seed + retry counts in order, a page refresh reproduces identical questions.

### 8.3 Generator Contract

```js
// Every generator: (rng, tier, world) => Question (without id/world/difficulty)
// - Uses rng only (never Math.random)
// - Draws persona from contextPools (name + city)
// - Builds distractors via misconceptions.js
// - signature excludes persona, so two questions that differ only by name count as duplicates
```

### 8.4 Generator Specifications (10 types)

| Type | Interaction | Randomised elements | Distractor / misconception sources | Template headroom |
| ---- | ----------- | ------------------- | ---------------------------------- | ----------------- |
| Q1 Order reasoning | order (drag/tap) | Claim family, numbers, persona | Swapped evidence/reason; conclusion first; weak-reasoning line | ≥ 15 families × number pairs |
| Q2 Complete explanation | fill (word bank) | Sentence frame, claim, example numbers | Bank includes near-miss words ("so" vs "because", "example" vs "reason") | ≥ 15 frames |
| Q3 Best justification | mcq (4) | Claim family, numbers | "One example", "partial", "restates the claim", "correct general reason" | ≥ 15 families |
| Q4 Match representation | match | Expression family (k(x+m), a−(−b), ratio, percent), values | Wrong distribution, sign flip, wrong diagram | ≥ 20 expressions |
| Q5 Always/Sometimes/Never | mcq (3) + justification | Claim from library (tier ±1), persona | Verdict swap; "one example proves it" | 18 claims |
| Q6 Counterexample | mcq (4 values) | Claim with verdict *sometimes*; candidate values partitioned by `isCounterexample` | Values where the claim **holds** (validated by code) | 12 claims × value sets |
| Q7 Compare strategies | mcq (multi-statement) | Percent/ratio/fraction task, two strategies | Strategy that looks right but is not equivalent; "both are valid" mismatch | ≥ 15 tasks |
| Q8 Error detective | pick-step + reason | Family from `errorFamilies`, numbers | `reasonDistractors` | 6 families × number space |
| Q9 Pattern & generalise | mcq | Linear rule (start, step), representation (table/dots) | "Adds n", "multiplies", "recursive-only" explanations | ≥ 20 rules |
| Q10 Explain the answer | mcq (4) | Booth context, numbers, claim by a rival (Priya/Fatima/Diego) | Incomplete (no reason), imprecise ("it's bigger"), irrelevant detail, correct complete | ≥ 15 contexts |

### 8.5 Example Generator — Q5 (Always / Sometimes / Never)

```js
import { CLAIMS } from '../data/claims';
import { pick, shuffle } from '../utils/prng';
import { NAMES, CITIES } from '../data/contextPools';

export function genAlwaysSometimesNever(rng, tier) {
  const pool = CLAIMS.filter((c) => Math.abs(c.tier - tier) <= 1);
  const claim = pick(rng, pool);
  const name = pick(rng, NAMES);
  const city = pick(rng, CITIES);

  const verdictLabels = { always: 'Always true', sometimes: 'Sometimes true', never: 'Never true' };
  const options = shuffle(rng, Object.values(verdictLabels));

  return {
    type: 'always_sometimes_never',
    interaction: 'mcq',
    visual: claim.arity === 1 ? 'numberLine' : 'none',
    visualProps: { claimId: claim.id },
    questionText: `${name} in ${city} says, "${claim.text}" Is this always, sometimes, or never true?`,
    options,
    correct: options.indexOf(verdictLabels[claim.verdict]),
    hint1: 'Try two or three different numbers. Does the claim hold every time?',
    hint2: claim.verdict === 'always'
      ? 'Try to explain why it works for every number, not just the ones you tested.'
      : 'Try a special number such as zero, one, a fraction between zero and one, or a negative number.',
    explanation: claim.reasonAlways ?? claim.reasonBreaks,
    misconceptionTag: claim.verdict === 'always' ? 'tested-few-means-always' : 'missed-special-case',
    explanationBonus: false,
    signature: `Q5|${claim.id}`,
    persona: { name, city },
  };
}
```

### 8.6 Example Generator — Q6 (Counterexample)

```js
import { CLAIMS, isCounterexample, evaluateTest } from '../data/claims';

const CANDIDATES = [-3, -2, -1, 0, 0.25, 0.5, 1, 2, 3, 4, 5, 7, 8, 10];

export function genCounterexample(rng, tier) {
  const pool = CLAIMS.filter((c) => c.verdict === 'sometimes' && Math.abs(c.tier - tier) <= 1);
  const claim = pick(rng, pool);

  // Build value/pair candidates that satisfy the claim's domain
  const inputs = claim.arity === 1
    ? CANDIDATES.map((x) => [x])
    : CANDIDATES.flatMap((x) => CANDIDATES.map((y) => [x, y]));
  const valid = inputs.filter(([x, y]) => evaluateTest(claim, x, y).valid);

  const breaking = valid.filter(([x, y]) => isCounterexample(claim, x, y));
  const holding  = valid.filter(([x, y]) => !isCounterexample(claim, x, y));

  const correct = pick(rng, breaking);
  const distractors = shuffle(rng, holding).slice(0, 3);       // code-verified "claim holds" values
  const choices = shuffle(rng, [correct, ...distractors]);
  const fmt = (t) => (t.length === 1 ? `${t[0]}` : `${t[0]} and ${t[1]}`);

  const name = pick(rng, NAMES);
  return {
    type: 'counterexample',
    interaction: 'mcq',
    visual: 'numberLine',
    visualProps: { claimId: claim.id, marks: choices },
    questionText: `${name} says, "${claim.text}" Which values prove ${name} wrong?`,
    options: choices.map(fmt),
    correct: choices.indexOf(correct),
    hint1: 'A counterexample is a test where the claim does not hold. Try each choice.',
    hint2: 'Check each choice: does the result match what the claim says?',
    explanation: claim.reasonBreaks,
    misconceptionTag: 'picked-supporting-example',
    explanationBonus: false,
    signature: `Q6|${claim.id}`,
    persona: { name, city: pick(rng, CITIES) },
  };
}
```

> **Guard:** a claim is only eligible for Q6 when `breaking.length ≥ 1` **and** `holding.length ≥ 3` after domain filtering; a CI test verifies this for every `sometimes` claim.

### 8.7 Example Generator — Q8 (Error Detective)

```js
import { ERROR_FAMILIES } from '../data/errorFamilies';

export function genErrorDetective(rng, tier) {
  const families = Object.values(ERROR_FAMILIES).filter((f) => Math.abs(f.level - tier) <= 1);
  const problem = pick(rng, families).build(rng);

  const reasons = shuffle(rng, [problem.reasonCorrect, ...problem.reasonDistractors]);
  return {
    type: 'error_detective',
    interaction: 'pick-step',
    visual: 'stepLadder',
    visualProps: { lines: problem.lines, faultyIndex: problem.faultyIndex },
    questionText: `${pick(rng, NAMES)} wrote these steps. Tap the first step that is not correct, then choose why.`,
    options: reasons,                                     // step is picked via the ladder; reason via MCQ
    correct: { step: problem.faultyIndex, reason: reasons.indexOf(problem.reasonCorrect) },
    hint1: 'Check each line against the line before it. Where does the change stop making sense?',
    hint2: `Look at line ${problem.faultyIndex + 1}. Work it out again yourself and compare.`,
    explanation: `${problem.reasonCorrect} The correct line is ${problem.fixLine}.`,
    misconceptionTag: problem.familyId,
    explanationBonus: false,
    signature: `Q8|${problem.signature}`,
  };
}
```

### 8.8 Distractor Factory (`utils/misconceptions.js`)

```js
// Every distractor must be tagged with a misconception so feedback can name it.
export const MISCONCEPTIONS = {
  'tested-few-means-always': 'Testing a few examples does not prove a claim is always true.',
  'missed-special-case':     'Numbers such as zero, one, fractions and negatives often break a claim.',
  'restates-claim':          'Repeating the claim is not a reason.',
  'one-example-proof':       'One example shows the claim can work, but it does not show it always works.',
  'picked-supporting-example': 'A counterexample must make the claim false, not true.',
  // ...
};

export function makeOptions(rng, correct, distractors, count = 4) {
  const unique = [...new Set(distractors.filter((d) => d !== correct))];
  const chosen = shuffle(rng, unique).slice(0, count - 1);
  if (chosen.length < count - 1) throw new Error('Not enough distinct distractors');
  const options = shuffle(rng, [correct, ...chosen]);
  return { options, correct: options.indexOf(correct) };
}
```

### 8.9 Bonus Challenge

When a world reaches 3 stars, `generateBonus({ seed, world, retry })` returns **3 extra** questions (types chosen by shuffle, tier 3, signature-avoiding the world's 10). Bonus questions give XP but do not change stars.

---

## 9. Simulation Station Specs

### 9.1 Station A — `ProofBuilderStation.jsx` (Concrete)

```js
const round = useMemo(() => genProofRound(rngFor('A', state.simRound)), [state.simRound]);
// round = {
//   claimId: 'odd_plus_odd_even',
//   numbers: [7, 9],
//   tiles: [{ id, role: 'claim'|'evidence'|'reason'|'conclusion'|'weak', text }],
//   correctOrder: ['t1', 't2', 't3', 't4'],
//   counterDemo: 'pairing' | 'grouping' | 'rows'
// }
```

**Round families**

| Family | Claim                                       | Counter demo  | Evidence tile (template)                          | Reason tile (template)                                        |
| ------ | ------------------------------------------- | ------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| A1 | Sum of two odd numbers is even              | pairing       | `{a} + {b} = {a+b}, which is even`                | Each odd number is pairs plus one left over; two left-overs make another pair |
| A2 | Even × any whole number is even             | grouping      | `{a} × {b} = {a*b}, which is even`                | An even number is made of groups of 2, so any multiple is groups of 2 |
| A3 | Sum of two consecutive whole numbers is odd | rows          | `{n} + {n+1} = {2n+1}, which is odd`              | The two numbers differ by one, so one counter is left unpaired |
| A4 | Sum of three consecutive numbers is a multiple of 3 | rows  | `{n-1} + {n} + {n+1} = {3n}`                      | Move one counter from the longest row to the shortest row and all three rows have {n} |

**Interaction flow**

1. Numbers are generated from `rng` within ranges (A1: odd 3–19; A3: n 4–30; etc.) and **re-generated on every replay**
2. `CounterBoard` renders the numbers as counters; student drags counters into pairs / groups / rows; `onSettle` computes leftovers and highlights them
3. `ArgumentFrame` has 4 slots; student drags `ArgumentTile`s (or tap-tap fallback)
4. **Submit check:**
   - All four slots filled
   - Slot roles match tile roles
   - `weak` tile is never accepted
5. Result → `VerdictChip` ("Convincing!" / "Needs evidence!" / "Needs a reason!") + narration

**Completion:** 3 rounds (drawn without replacement from the 4 families). Flag `stationAPerfect` if no wrong submit occurred.

### 9.2 Station B — `CounterexampleLabStation.jsx` (Pictorial)

```js
const claim = useMemo(() => pickStationBClaim(rngFor('B', state.simRound), state.simRound), [state.simRound]);
const [tests, setTests]   = useState([]);     // [{x, y, valid, held}]
const [verdict, setVerdict] = useState(null); // 'always'|'sometimes'|'never'
```

**Rules**

- Student must log **≥ 3 valid tests** before the verdict buttons unlock
- Invalid input (outside `claim.domain`) shows a friendly message ("This claim is only about positive numbers — try another!") and does not count
- `NumberLineProbe` animates the operation for each test (e.g., jump from 8 to 4 for 8 × 0.5) and colours the landing point green/red
- Verdict logic:
  - Student says **Sometimes/Never** → must submit a test that `isCounterexample(claim, x, y)`; for `never`, **any** valid test qualifies
  - Student says **Always** and the claim really is always → asks for the best reason (3 options: weak / partial / general)
  - Student's verdict ≠ `claim.verdict` → shows the decisive test (e.g., auto-runs a counterexample) and retries
- **Rounds:** 3 (tier 1 → 2 → 3), claims drawn randomly per tier, at most one `always` claim per station run

### 9.3 Station C — `ErrorDetectiveStation.jsx` (Abstract)

```js
const problem = useMemo(
  () => pickFamily(rngFor('C', state.simRound), state.simRound + 1).build(rngFor('C-num', state.simRound)),
  [state.simRound]
);
const [pickedStep, setPickedStep] = useState(null);
const [pickedReason, setPickedReason] = useState(null);
const [fixValue, setFixValue] = useState('');
```

**Flow:** pick step → pick reason → enter fix (normalised compare: trim, unify `-`/`−`, strip spaces, compare to `problem.fixLine` or accepted variants) → ladder redraws showing the corrected line in green and the downstream lines recomputed.
**Rounds:** 3 (Level 1 → 2 → 3).

### 9.4 Station Completion

`COMPLETE_SIM_STATION` fires when a station's 3 rounds finish. When all three flags are true → `UNLOCK_BADGE('proof_builder')` and Play becomes available.

### 9.5 Drag & Tap Fallback (`hooks/useDragTile.js`)

- Pointer Events (`pointerdown/move/up`) with `setPointerCapture`
- Tap-select then tap-target works without drag (mandatory for accessibility)
- Keyboard: `Space` selects a tile, arrow keys move between slots, `Enter` places

---

## 10. Diagram Components

| Component          | Props                                                                     | Notes                                                                 |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `CounterBoard`     | `{ groups, mode: 'pairing'\|'grouping'\|'rows', onSettle, animated }`     | SVG circles; leftovers highlighted; mode decides snap targets         |
| `ArgumentFrame`    | `{ slots, tiles, onPlace, locked }`                                       | 4 colour-tagged slots (🟦🟨🟩🟪) with icon + letter for colour-blind use |
| `NumberLineProbe`  | `{ from, to, range, animated, label }`                                    | Animated jump arrow; auto-scales range to include both ends           |
| `StepLadder`       | `{ lines, faultyIndex?, pickedIndex, onPick, reveal, fixedLine? }`        | Large type; magnifier follows pointer; reveal shows correct fix       |
| `BalanceScale`     | `{ left, right, operation }`                                              | Shows "do the same to both sides" for inverse-operation reasoning     |
| `RepresentationCard` | `{ kind: 'words'\|'symbols'\|'diagram'\|'table', payload, state }`       | Used by Q4 matching                                                   |
| `Mascot`           | `{ mood }`                                                                | `idle \| curious \| happy \| thinking \| celebrating \| encouraging`   |
| `VerdictChip`      | `{ kind: 'convincing'\|'needs-evidence'\|'needs-reason' }`                | Colour + icon + text                                                  |

**Math formatting (`utils/mathFormat.js`)**

```js
export const MINUS = '−';                                     // U+2212
export const minus = (n) => (n < 0 ? `${MINUS}${Math.abs(n)}` : `${n}`);
export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
export const frac = (n, d) => ({ n, d });                     // rendered by <Fraction/>
export const normaliseInput = (s) =>
  s.trim().replace(/[-–—]/g, MINUS).replace(/\s+/g, '').replace(/,/g, '.');
```

---

## 11. Audio Pipeline (ElevenLabs — Matching `audio_generation_pipeline.md`)

### 11.1 Voice Configuration

- **Voice:** Alice · **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2` · **Model:** `eleven_multilingual_v2`
- **API Key:** `VITE_ELEVENLABS_API_KEY` in `.env.local` (used **only** by the offline script and local dev)
- **Content Policy:** narrate paragraphs and questions only — never titles, headings, world names or section labels

### 11.2 Style Settings (`STYLE_SETTINGS`)

| Style                       | Stability | Similarity Boost | Style | Speaker Boost |
| --------------------------- | --------- | ---------------- | ----- | ------------- |
| `celebration`               | 0.12      | 0.45             | 0.75  | ✅             |
| `encouragement`             | 0.16      | 0.50             | 0.65  | ✅             |
| `question`                  | 0.20      | 0.55             | 0.55  | ✅             |
| `emphasis`                  | 0.16      | 0.50             | 0.60  | ✅             |
| `thinking`                  | 0.24      | 0.60             | 0.35  | ✅             |
| `statement` / `instruction` | 0.20      | 0.55             | 0.50  | ✅             |

### 11.3 Offline Pre-generation (`scripts/generate_audio.js`)

Reads `phrases`, applies per-style settings, calls the ElevenLabs TTS endpoint, writes slugified `.mp3` files to `public/assets/audio/`, regenerates `src/utils/audioMap.js`, and waits **500 ms** between calls.

```js
const phrases = [
  // Phase 1 — Wonder
  { text: "Sofia says, when you multiply two numbers, the answer is always bigger.", style: 'thinking' },
  { text: "Carlos says, not always! Who is right, and how can we prove it?", style: 'question' },
  { text: "Let's discover how to explain our mathematical thinking!", style: 'encouragement' },

  // Phase 2 — Story panels (verbatim from storyContent.js)
  { text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Think-Aloud Club. They meet online from ten countries to enter the World Math Fair.", style: 'statement' },
  { text: "The judge, Whyzo the owl, has one rule. A right answer is not enough. You must explain why it is right!", style: 'emphasis' },
  { text: "Mike in New York says, seven plus nine is sixteen, so two odd numbers always add to an even number. Whyzo asks, does one example prove it?", style: 'question' },
  { text: "Yuki in Tokyo shows a picture. Each odd number is a pair of dots with one dot left over. Two leftover dots make a new pair, so the total is even!", style: 'statement' },
  { text: "Aisha in Mumbai checks her friend's work. Negative three minus negative five equals two, not negative eight. She points to the exact step where the mistake happened.", style: 'statement' },
  { text: "Claim, evidence, reason! With these three tools, every explorer can explain their thinking and earn the Golden Logic Trophy!", style: 'emphasis' },

  // Phase 3 — Station instructions
  { text: "Drag the counters into pairs. Then build your argument with a claim, evidence, and a reason!", style: 'instruction' },
  { text: "Test some numbers. Is this claim always, sometimes, or never true?", style: 'question' },
  { text: "Read each step carefully. Can you find the first step where the mistake happens?", style: 'question' },

  // Phase 3/4 — Feedback and verdicts
  { text: "Convincing! You explained your thinking perfectly!", style: 'celebration' },
  { text: "Needs evidence! Add an example that supports your claim.", style: 'encouragement' },
  { text: "Needs a reason! Explain why it works every time.", style: 'encouragement' },
  { text: "One example is a clue, not a proof. Try a reason that works for every case.", style: 'thinking' },
  { text: "Not quite! Let's check that reasoning again.", style: 'encouragement' },
  { text: "Watch closely. Can you see why the claim breaks?", style: 'thinking' },
  { text: "Great detective work! You found the mistake!", style: 'celebration' },

  // Fixed question stems (used by several generators)
  { text: "Put the argument in order: claim, evidence, reason, conclusion.", style: 'question' },
  { text: "Which explanation best proves the claim?", style: 'question' },
  { text: "Is this claim always, sometimes, or never true?", style: 'question' },
  { text: "Tap the first step that is not correct, then choose why.", style: 'question' },

  // Phase 5 — Reflect and badges
  { text: "What an adventure! Can you explain one claim using evidence and a reason?", style: 'thinking' },
  { text: "Lesson complete! You are a Global Think-Aloud Champion!", style: 'celebration' },
  { text: "Badge unlocked! You are a Clear Thinker!", style: 'celebration' },
  { text: "Badge unlocked! Proof Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Reasoning Champion! You scored over eighty percent!", style: 'celebration' },
];
```

> Only paragraph and question text is added to `phrases`. Generated question text is **not** pre-generated (see 11.6).

### 11.4 Audio Engine (`src/utils/audio.js`)

Implements the structure documented in `audio_generation_pipeline.md`:

1. **Segment helpers:** `say()`, `ask()`, `cheer()`, `emphasize()`, `think()`, `celebrate()`, `instruct()` — each returns `{ text, style, spoken? }`
2. **Cache check:** `getAudioUrl(text, style)` checks `audioMap[text]` first
3. **Dynamic request:** else `fetch('/api/elevenlabs')` (production) or direct ElevenLabs call (local dev with `VITE_ELEVENLABS_API_KEY`), using the style's voice settings
4. **Queue management:** `narrate(segments)` uses a `currentQueue` `Symbol`; starting a new narration invalidates the old one; `stopNarration()` halts immediately and aborts in-flight fetches
5. **Preloading:** while playing segment *i*, `getAudioUrl` is called for segment *i + 1*

```js
const STYLE_SETTINGS = { /* table in 11.2, with use_speaker_boost: true */ };
const memoryCache = new Map();
let currentQueue = null;
let controller = null;

export const say       = (text, opts) => ({ text, style: 'statement',     ...opts });
export const ask       = (text, opts) => ({ text, style: 'question',      ...opts });
export const cheer     = (text, opts) => ({ text, style: 'encouragement', ...opts });
export const emphasize = (text, opts) => ({ text, style: 'emphasis',      ...opts });
export const think     = (text, opts) => ({ text, style: 'thinking',      ...opts });
export const celebrate = (text, opts) => ({ text, style: 'celebration',   ...opts });
export const instruct  = (text, opts) => ({ text, style: 'instruction',   ...opts });

export async function getAudioUrl(text, style = 'statement', spoken = text) {
  if (audioMap[text]) return audioMap[text];                    // static asset: zero latency
  const key = `${spoken}::${style}`;
  if (memoryCache.has(key)) return memoryCache.get(key);
  const settings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;
  const res = await fetch('/api/elevenlabs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: spoken, style }),
    signal: controller?.signal,
  });
  if (!res.ok) return null;                                     // silent skip, never block UX
  const url = URL.createObjectURL(await res.blob());
  memoryCache.set(key, url);
  return url;
}

export async function narrate(segments) {
  stopNarration();
  const token = Symbol('queue');
  currentQueue = token;
  controller = new AbortController();
  for (let i = 0; i < segments.length; i++) {
    if (currentQueue !== token) return;
    const { text, style, spoken } = segments[i];
    const url = await getAudioUrl(text, style, spoken ?? text);
    if (currentQueue !== token) return;
    if (i + 1 < segments.length) getAudioUrl(segments[i + 1].text, segments[i + 1].style, segments[i + 1].spoken);
    if (url) await playAudio(url, token);
  }
}

export function stopNarration() { currentQueue = null; controller?.abort(); /* pause active Audio */ }
```

### 11.5 Production Proxy (`api/elevenlabs.js`)

The reference pipeline allows a direct browser call with `VITE_ELEVENLABS_API_KEY`. Because `VITE_` variables are **bundled into the client**, production must use the proxy so the key stays server-side.

```js
// Vercel serverless function
import { STYLE_SETTINGS } from '../src/utils/styleSettings.js';  // shared constant (no DOM code)
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text, style } = req.body ?? {};
  if (typeof text !== 'string' || text.length === 0 || text.length > 400) {
    return res.status(400).json({ error: 'Invalid text' });
  }
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement,
    }),
  });
  if (!r.ok) return res.status(r.status).end();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(await r.arrayBuffer()));
}
```

Add basic abuse protection (length cap above, per-IP rate limit, allowed-origin check) before public launch.

### 11.6 Narrating Random Questions — Speech Normaliser (`utils/speech.js`)

Generated questions contain symbols and digits. The **on-screen** `questionText` stays exactly as generated; the string sent to ElevenLabs is `toSpoken(questionText)`, passed as `spoken` in the segment. The audio engine caches by the spoken string.

```js
const ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven',
  'twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS = ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

function intToWords(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + intToWords(n % 100) : '');
  return String(n);
}
function numToWords(tok) {
  const [i, f] = tok.split('.');
  const w = intToWords(parseInt(i, 10));
  return f ? `${w} point ${[...f].map((d) => ONES[+d]).join(' ')}` : w;
}

export function toSpoken(text) {
  return text
    .replace(/ − /g, ' minus ')          // binary minus (spaces both sides)
    .replace(/−/g, 'negative ')          // unary minus
    .replace(/ \+ /g, ' plus ')
    .replace(/ × /g, ' times ')
    .replace(/ ÷ /g, ' divided by ')
    .replace(/ = /g, ' equals ')
    .replace(/(\d+)\/(\d+)/g, '$1 over $2')
    .replace(/(\d+(?:\.\d+)?)%/g, '$1 percent')
    .replace(/²/g, ' squared').replace(/³/g, ' cubed')
    .replace(/[()]/g, ' ')
    .replace(/\d+(?:\.\d+)?/g, numToWords)
    .replace(/\s+/g, ' ')
    .trim();
}
```

**Cost control**

- Narrate only the question stem (not every option); options are read on tap/hover via an optional "Read options" button
- Memory-cache per session; `Cache-Control: immutable` on proxy responses so repeat stems across users hit the CDN
- If the proxy fails or audio is disabled, the UI is fully usable (silent skip)

### 11.7 Cleanup and Parity

- `scripts/clean_audio.js` imports `audioMap.js`, scans `public/assets/audio/`, deletes unreferenced `.mp3`
- `scripts/check_parity.js` parses `narration.js` and `generate_audio.js`; fails CI if a **fixed** narrated string in `narration.js` has no matching `phrases` entry (or vice versa)
- Workflow to add or change a fixed line (from the pipeline doc): update `phrases` → `node scripts/generate_audio.js` → optionally `node scripts/clean_audio.js` → update `narration.js` and the UI with the identical string

### 11.8 Wiring Example

```js
import { narrate, stopNarration } from '../utils/audio';
import { wonderNarration } from '../utils/narration';

useEffect(() => {
  if (audioEnabled) narrate(wonderNarration());
  return () => stopNarration();
}, [audioEnabled]);
```

```js
// narration.js
export function wonderNarration() {
  return [
    think("Sofia says, when you multiply two numbers, the answer is always bigger."),
    ask("Carlos says, not always! Who is right, and how can we prove it?"),
    cheer("Let's discover how to explain our mathematical thinking!"),
  ];
}
```

---

## 12. Gamification Implementation

### 12.1 XP (`utils/scoring.js`)

```js
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 12.2 Stars and World Unlock

```js
export function calcStars(correct) {
  if (correct >= 9) return 3;
  if (correct >= 7) return 2;
  if (correct >= 5) return 1;     // matches ≥ 5 threshold used by the reference module
  return 0;
}
export const canUnlockWorld = (score) => score !== null && score >= 6;   // PRD: ≥ 6/10 to advance
```

> **Note:** the PRD unlock gate is **≥ 6/10**; 1 star is awarded from 5/10. If the product owner wants strict parity with the reference module (5/10), change `canUnlockWorld` to `>= 5` and update PRD §9.4 accordingly — this is a one-line change.

### 12.3 Badge Engine (`data/badges.js`)

```js
export const BADGES = [
  { id: 'clear_thinker',   label: '🏅 Clear Thinker',   condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story },
  { id: 'proof_builder',   label: '🥈 Proof Builder',   condition: (s) => s.simStationsComplete.every(Boolean) },
  { id: 'reasoning_champion', label: '🥇 Reasoning Champion',
    condition: (s) => s.worldScores.reduce((t, w) => t + (w ?? 0), 0) >= 80 },
  { id: 'perfect_proof',   label: '💎 Perfect Proof',   condition: (s) => s.worldScores.some((w) => w === 10) },
  { id: 'streak_star',     label: '🔥 Streak Star',     condition: (s) => s.maxStreak >= 10 },
  { id: 'global_explorer', label: '🌍 Global Explorer', condition: (s) => Object.values(s.phaseComplete).every(Boolean) },
  { id: 'counterexample_hunter', label: '🔍 Counterexample Hunter', condition: (s) => s.counterexampleFirstTry >= 5 },
  { id: 'error_detective', label: '🕵️ Error Detective', condition: (s) => s.errorFirstTry >= 5 },
  { id: 'golden_logic_trophy', label: '🏆 Golden Logic Trophy', hidden: true,
    condition: (s) => s.worldScores.every((w) => w !== null && calcStars(w) === 3) },
];

export const checkBadges = (state) =>
  BADGES.filter((b) => !state.badges.includes(b.id) && b.condition(state)).map((b) => b.id);
```

### 12.4 Feedback Flow per Answer

```
correct  → ANSWER_CORRECT → FeedbackOverlay(bounce, +XP) → VerdictChip('convincing') → narrate(cheer/celebrate)
wrong #1 → ANSWER_INCORRECT → shake → narrate("Not quite! …") → HintOverlay(hint1)
wrong #2 → ANSWER_INCORRECT → stronger shake → HintOverlay(hint2 + visual demo)
wrong #3 → ANSWER_INCORRECT → reveal explanation + animated worked example + narrate(explanation)
```

All wrong-answer messages include the **misconception** wording from `misconceptions.js` when `misconceptionTag` matches.

---

## 13. Session Persistence and Resume

```js
const SESSION_KEY = 'intellia_g7_explain_thinking_v1';

// Persisted (questions are NOT stored — they are regenerated from the seed)
{
  sessionSeed, worldRetries, phase, storyPanel,
  simStationsComplete, currentWorld, currentIndexInWorld,
  worldScores, xp, streak, maxStreak, badges,
  counterexampleFirstTry, errorFirstTry,
  phaseComplete, reflection, timestamp,
}
```

- Restore only if `Date.now() - timestamp < 24h`
- On restore, regenerate worlds `0…currentWorld` in order using the persisted seed and retry counts (so the `avoid` sets match and questions are identical)
- Wrap every `localStorage` access in `try/catch` (private browsing / blocked storage must not break the lesson)
- "Start over" creates a **new seed**

---

## 14. CSS Animation Keyframes (ported from the reference app)

Reuse the reference `App.css` keyframes verbatim (`bounceIn`, `shake`, `floatUp`, `pulseGlow`, `celebrate`, `slideInUp`). Additional keyframes for this lesson only:

```css
@keyframes counterPair {     /* counters slide together when paired */
  from { transform: translate(var(--dx), var(--dy)); }
  to   { transform: translate(0, 0); }
}
@keyframes leftoverPulse {   /* highlight unpaired counters */
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, .55); }
  50%      { box-shadow: 0 0 0 10px rgba(255, 193, 7, 0); }
}
@keyframes jumpArc {         /* number-line jump arrow */
  from { stroke-dashoffset: var(--len); }
  to   { stroke-dashoffset: 0; }
}
@keyframes magnifierGlow {
  0%, 100% { filter: drop-shadow(0 0 0 rgba(74,144,217,.0)); }
  50%      { filter: drop-shadow(0 0 8px rgba(74,144,217,.6)); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

**Lesson colour tags (scoped CSS variables; map to the reference palette where an equivalent token exists)**

```css
:root {
  --tag-claim:      #4A90D9;  /* 🟦 */
  --tag-evidence:   #F5B942;  /* 🟨 */
  --tag-reason:     #4CAF7A;  /* 🟩 */
  --tag-conclusion: #8E6BD1;  /* 🟪 */
}
```

Tags always pair colour with a letter badge (C / E / R / ✓) for accessibility.

---

## 15. Component Prop Contracts

| Component           | Props                                                                                      | Returns                                               |
| ------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `QuestionRenderer`  | `{ question, onAnswer, attemptCount, hintsUsed }`                                          | Type-specific question component                      |
| `HintOverlay`       | `{ level: 1\|2\|3, question, onClose }`                                                    | Hint text + optional animated visual demonstration    |
| `FeedbackOverlay`   | `{ isCorrect, explanation?, xpEarned, verdict, onContinue }`                               | Animated modal                                        |
| `WorldMap`          | `{ worldScores, currentWorld, onSelectWorld, onRetryWorld }`                               | Scrollable 10-world map with stars and locks          |
| `BadgePanel`        | `{ badges, newBadgeId? }`                                                                  | Badge grid with unlock toast                          |
| `ToolkitDrawer`     | `{ open, onClose }`                                                                        | Sentence frames and colour-tag legend                 |
| `ReflectPhase`      | `{ onSave, reflection }`                                                                   | Claim picker + evidence + reason frame + checklist    |

**Reflect phase logic:** student picks a claim from 4 randomly selected library claims, chooses an evidence tile and a reason tile (or writes a short sentence using the frame), and a **self-check checklist** (Claim ✔ Evidence ✔ Reason ✔) must be ticked before the lesson-complete badge unlocks. No free-text grading is performed (out of scope).

---

## 16. Performance Requirements

| Metric                          | Target                                      |
| ------------------------------- | ------------------------------------------- |
| Initial load time               | < 2 seconds (Vite production build)         |
| Time to first meaningful paint  | < 1 second                                  |
| Animation frame rate            | 60 fps on mid-range tablets                 |
| Memory usage                    | < 80 MB                                     |
| Bundle size (gzipped)           | < 600 KB (audio excluded)                   |
| Lighthouse Performance          | ≥ 90                                        |
| Lighthouse Accessibility        | ≥ 90                                        |
| World generation time           | < 30 ms per world (10 questions)            |
| Pre-generated audio TTFB        | ~0 ms (static `.mp3`)                       |
| Dynamic audio TTFB              | < 2 s (proxy + ElevenLabs latency)          |

---

## 17. Browser & Device Support

| Environment           | Support Level |
| --------------------- | ------------- |
| Chrome 110+ (desktop) | Full          |
| Safari 15+ (iPad/Mac) | Full          |
| Firefox 110+          | Full          |
| Edge 110+             | Full          |
| Android Chrome        | Full          |
| iOS Safari 15+        | Full          |
| IE 11                 | Not supported |

**Audio autoplay:** browsers block autoplay until a user gesture. The Intro "Start" button is the gesture that unlocks audio for the session; `narrate()` silently skips until then.

---

## 18. Security & Privacy

- No student accounts, no PII collected; `localStorage` holds progress only
- ElevenLabs key is **server-side only** in production (`ELEVENLABS_API_KEY`); `.env.local` and any `VITE_ELEVENLABS_API_KEY` are listed in `.gitignore` and used only for the offline script/local dev
- Proxy validates input length, rate-limits per IP and restricts origins
- No third-party analytics in v1.0; any future analytics must be privacy-reviewed for a under-13/teen audience

---

## 19. Deployment

**`vercel.json`**

```json
{
  "rewrites": [{ "source": "/((?!api/|assets/).*)", "destination": "/index.html" }],
  "headers": [
    { "source": "/assets/audio/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
```

**Checklist**

1. `npm install` → `node scripts/generate_audio.js` (needs `VITE_ELEVENLABS_API_KEY` locally) → commit `public/assets/audio/` and `src/utils/audioMap.js`
2. `npm run build` → verify bundle size and Lighthouse budgets
3. Set `ELEVENLABS_API_KEY` in Vercel project settings
4. Deploy to Vercel; run the **UI parity checklist** (PRD §11.1) side by side with `grade5-time-intervals.vercel.app`
5. Publish / link the lesson from `https://intelliasg.com/courses/grade-3-math`
6. Smoke test: Intro → all 6 phases → audio on/off → refresh mid-world (same questions restored) → "Start over" (new questions)

---

## 20. Quality & Testing Standards

**Unit tests (Vitest)**

- `prng.js`: same seed → same sequence; different seeds → different sequences; `shuffle` is a permutation
- **Claim library self-test** (§6.5): every verdict matches brute-force evaluation
- `errorFamilies`: for 1,000 random seeds per family, `lines[faultyIndex] !== correctLines[faultyIndex]`, all lines before `faultyIndex` are identical to correct lines, and `fixLine` equals the correct line
- `toSpoken`: table-driven tests (`"−3 − (−5) = 2"` → `"negative three minus negative five equals two"`, `"0.25 × 48"` → `"zero point two five times forty-eight"`, `"25%"` → `"twenty-five percent"`, `"1/2"` → `"one over two"`)
- `scoring.js` and `badgeEngine.js`: boundary conditions (4/5/6/7/9/10 correct; streak 4/5/10)

**Randomisation integrity tests**

- Generate 10,000 sessions (seeds 1…10,000): assert **10 questions per world, exactly one of each type per world, world difficulty mix matches `WORLD_MIX`, totals 100 / 35 / 40 / 25**
- Assert **zero duplicate signatures** within each session and **no pool-exhaustion warnings**
- Assert correct-answer index is uniformly distributed across positions (chi-square within tolerance)
- Assert retrying a world never repeats a signature from the previous attempt
- Assert two different seeds produce different full-session signature lists (collision rate = 0 across the 10,000 runs)

**Generator correctness**

- Every generated MCQ has exactly one correct option, all options unique, correct index valid
- Q6: the correct value satisfies `isCounterexample`; **no** distractor does
- Q5: the keyed verdict equals `claim.verdict`
- Q8: picked-step + reason combination validates only for the planted error

**Component / integration tests**

- Snapshot tests for `CounterBoard`, `NumberLineProbe`, `StepLadder`, `ArgumentFrame`, `BalanceScale` at each size variant
- Drag-and-drop and tap-fallback parity tests (React Testing Library + pointer events)
- Persistence: seed + progress restore reproduces identical questions

**Accessibility**

- Lighthouse + axe automated checks; manual keyboard-only pass through all 6 phases
- Colour tags always accompanied by letter/icon; `prefers-reduced-motion` honoured

**Audio**

- `check_parity.js` in CI (fixed lines)
- Manual listen-through of all pre-generated lines for pronunciation of numbers, names (Aisha, Yuki, Priya, Fatima, Diego) and symbols; dynamic stems spot-checked for 50 random seeds

**Reference parity**

- Side-by-side visual diff of Intro, Story, Simulate, Play (question + feedback), World Map and Reflect screens against `grade5-time-intervals.vercel.app` at 1280px, 768px and 375px

---

**Document Version:** 1.0 | September 2026
**Product:** Intellia — Grade 7 Math, Explain Mathematical Thinking
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Upload Target:** <https://intelliasg.com/courses/grade-3-math>
