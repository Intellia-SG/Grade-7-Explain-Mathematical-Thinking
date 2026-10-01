# Global Think-Aloud Club — Explain Mathematical Thinking (Grade 7)

An interactive, gamified, simulation-based learning module for Grade 7 Mathematics covering **Claims, Evidence, Reasons & Proof** with **Whyzo the Reasoning Owl 🦉**.

Built with **React 19**, **Vite**, and **Vanilla CSS Design System**, strictly mirroring the visual aesthetics, UX structure, and interaction patterns of [variables-grade-6.vercel.app](https://variables-grade-6.vercel.app/).

---

## 🎯 Design Brief

### 1. Learning Objectives Covered
- **LO1**: Distinguish between a **Claim 🟦**, **Evidence 🟨**, and a **Reason 🟩** in a mathematical argument.
- **LO2**: Explain why a result is true using words, diagrams, and concrete manipulatives (multiple representations).
- **LO3**: Classify statements as **Always, Sometimes, or Never** true.
- **LO4**: Formulate and apply a **Counterexample** to disprove a general claim.
- **LO5**: Explain why one example (or several) is **not a proof**, but a structural argument can be.
- **LO6**: Locate, explain, and correct errors in worked solutions (Forensic error analysis).
- **LO7**: Compare solution strategies and evaluate mathematical efficiency.
- **LO8**: Generalize patterns into algebraic rules and justify why they work.
- **LO9**: Demonstrate algebraic equation equivalence using the physical balance principle.

### 2. Guided Escalating Mission List & Real-World Scenarios
1. **Level 1 — The Tokyo Bento Rush** (Easy | Concrete Manipulation)
   - *Real-World Scenario:* Zero-waste packaging in a Tokyo bento kitchen.
   - *Mission:* Pack dumplings into 2-pack boxes. Observe leftover singles and fuse them to prove why two odd orders ALWAYS total an even number with zero waste!
2. **Level 2 — The Cairo Market Discount** (Medium | Number Line Telemetry)
   - *Real-World Scenario:* Khan el-Khalili Bazaar discount pricing.
   - *Mission:* A vendor claims multiplying a price always makes it larger. Launch a rocket probe at factor $\times 0.5$ (50% off) to crash the claim with a counterexample!
3. **Level 3 — The Shrinking Solar Panel Myth** (Medium | Decimals & Fractions)
   - *Real-World Scenario:* Space station micro-solar array efficiency.
   - *Mission:* Test the claim that squaring numbers always expands them. Discover that squaring decimals between $0$ and $1$ ($0.5^2 = 0.25$) actually shrinks them!
4. **Level 4 — The Bandra-Worli Bridge Load Audit** (Tricky | Sign Errors)
   - *Real-World Scenario:* Wind tension calculations on the Bandra-Worli Sea Link.
   - *Mission:* Scan negative wind load calculations. Spot the $-5 - (-8)$ error that threatened bridge stability, diagnose the misconception, and heal the structural stress cracks!
5. **Level 5 — Mumbai Port Container Sequence** (Tricky | Order of Operations)
   - *Real-World Scenario:* Automated freight gantry cranes at Jawaharlal Nehru Port.
   - *Mission:* Audit the cargo formula $6 + 4 \times 5$. Catch the operator adding first ($10 \times 5 = 50$) instead of multiplying first ($6 + 20 = 26$), resolving a 24-ton cargo error!
6. **Level 6 — The Grand Proof Tribunal (Boss Level)** (Boss Level | Physical Balance Beam)
   - *Real-World Scenario:* London Supreme Court of Scientific Logic.
   - *Mission:* A rival team asserts an illegal equation step. Use the physical balance beam to solve $2x + 6 = 20$ step-by-step by applying inverse operations to both pans simultaneously!

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Local Development
```bash
npm install
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```

---

## 🕹️ Core Experience Features

1. **Toy-First & Play-First Design:**
   - **Odd/Even Particle Collider:** Real-time dumpling pairing and magnetic leftover fusion.
   - **Rocket Catapult & Crash Cannon:** Launchable probe over a live SVG number line coordinate axis.
   - **Laser Blueprint Scanner:** Interactive tension scanner with dynamic bridge stress cracks.
   - **Balance Scale of Truth:** 2-pan physics beam with tilt response to torque differences.
2. **Predict First, Then Test:**
   - Before running the simulation, learners guess the outcome. They run the simulation to see if their prediction was confirmed by the model!
3. **Curiosity Triggers & "Break It!" Mode:**
   - Free Play Sandbox includes a dedicated "BREAK IT!" mode allowing extreme settings (fractions $<1$, negative numbers, $0$, large numbers, unbalanced pans) to stress-test the model.
4. **3-Step Hint Ladder:**
   - Nudge $\rightarrow$ Clue $\rightarrow$ Worked Solution.
5. **In the Real World... Cards:**
   - Contextual cards linking mathematical proof to zero-waste logistics, retail discounts, satellite engineering, and civil infrastructure.
6. **"Why Do You Think That Happened?" Reflection:**
   - Pedagogical debrief after each challenge with positive reinforcement.

---

## 🕹️ The 5-Beat Simulation Loop

Every simulation level runs on a rigorous, gamified 5-beat cognitive loop:
1. **PREDICT (The Reasoning Bet):**
   - Students select a prediction and stake a confidence level (*Just Guessing / Pretty Sure / 100% Locked In*).
   - Calibrated bets earn bonus XP. If the prediction is wrong, Whyzo celebrates: *"Whoa, plot twist!"* and awards a Curiosity Bonus (+10 XP) with zero penalty.
2. **EXPERIMENT (Hands-on Sandbox):**
   - Students manipulate dynamic, animated physical toys (dumpling conveyors, haggling price meters, resizable solar arrays, bridge load gauges, port container cranes, physical balance scales).
   - Enforces a 5-second discovery tracker to encourage genuine manipulation before rushing.
   - Every action plays synthesized audio feedback and logs data directly to the live Evidence Board.
3. **NOTICE (The Live Evidence Board):**
   - Collects trials automatically as structured cards.
   - Whyzo asks one curiosity question: *"Do you see a pattern in the evidence cards?"*
   - A Pattern Meter fills to 100% as consistent evidence accumulates.
4. **CHALLENGE (Can You Break It?):**
   - Students stress-test claims with edge cases and extreme values.
   - For false claims (Levels 2 & 3), students trigger counterexamples, firing a spectacular **"CLAIM BUSTED! 💥"** animation.
   - For always-true claims (Levels 1, 4, 5, 6), students discover that no matter how many examples are tested, infinite cases remain, showing why formal proof is indispensable!
5. **GENERALISE / PROVE (Visual Proof & CER Sentence Builder):**
   - Explores a generalized visual representation (Mystery Crates with $n$ pairs, Multiplier Spectrum, Unit Square Partition, Vector Physics, Sequence Growth Formula, Equality Invariance).
   - Concludes with the **Claim-Evidence-Reason (CER)** builder: drag or tap word chips into `[Claim 🟦]`, `[Evidence 🟨]`, and `[Reason 🟩]` slots, verified by Whyzo.

---

## 📚 What Each Level's Simulation Teaches

| Level | Mission & World | Mathematical Claim & Concept | Interactive Toy Mechanic | Proof / Generalisation |
|---|---|---|---|---|
| **L1** | **The Tokyo Bento Rush** (Tokyo) | Odd + Odd = Even (Parity) | 2-Pack Dumpling Packing Machine & Conveyor Belt. Leftovers slide and magnetically fuse into a new box. | **Mystery Bento Crate:** Any unknown odd order $(2n + 1) + (2m + 1)$ leaves zero leftovers because $1 + 1 = 2$. |
| **L2** | **The Cairo Market Discount** (Cairo) | Multiplying by positive numbers does NOT always increase value ($x \times m > x$ is only sometimes true). | Khan el-Khalili Bazaar Haggling Machine with live discount multipliers, price tag cards, and stacked discounts ($20\% + 10\% \neq 30\%$). | **Multiplier Spectrum Map:** Visualizing the Shrink Zone ($0 < m < 1$), Identity ($m = 1$), and Growth Zone ($m > 1$). |
| **L3** | **The Shrinking Solar Panel Myth** (Space Station) | Squaring numbers between 0 and 1 shrinks area ($0.5^2 = 0.25 < 0.5$). | Resizable micro-solar array on a satellite roof. Dynamic edge dragging vs actual unit-square area count. | **Fractional Area Grid:** 100 hundredths grid showing why half of a half is 25 hundredths ($0.25\text{ m}^2$). |
| **L4** | **Bandra-Worli Bridge Load Audit** (Mumbai) | Subtracting a negative vector is equivalent to adding a positive vector ($-5 - (-8) = -5 + 8 = +3\text{ MN}$). | Sea Link bridge cable tension scanner with dynamic stress needle gauge, wind gusts, and sign auditor. | **Vector Reversal Number Line:** Facing left and walking backwards moves in the positive direction ($+8$). |
| **L5** | **Mumbai Port Container Sequence** (JN Port) | Order of Operations (PEMDAS/BODMAS) & Sequence Rules ($6 + 4 \times 5 = 26\text{t}$, not $50\text{t}$). | Gantry crane stacking 5-ton crates on a 6-ton base container, with ⚡ Fast-Forward button for large terms. | **Algebraic Sequence Formula:** $T(n) = 6 + 5n$, showing why grouped multiplication must evaluate before addition. |
| **L6** | **The Grand Proof Tribunal** (Supreme Court) | Algebraic equivalence invariance and inverse operations ($2x + 6 = 20 \Rightarrow x = 7$). | 2-pan physical balance beam. Rebutting Skeptic flaws and executing balanced inverse operations to drop Skeptic doubt to 0%. | **Golden Axiom of Equality:** If $A = B$, then $A - C = B - C$ and $A \div D = B \div D$. |

---

## 🛠️ How to Add a New Simulation Level

1. **Open [`src/data/simulationLevelsData.js`](file:///c:/Users/asus/OneDrive/Desktop/Grade-7-Explain%20Mathematical%20Thinking/src/data/simulationLevelsData.js):**
   Add a new level definition following the 5-beat schema:
   ```javascript
   {
     id: 7,
     levelNumber: 7,
     title: "My New Challenge",
     difficulty: "Tricky",
     theme: "custom",
     toy: "custom_toy",
     realWorld: { scenario: "...", title: "...", icon: "⚡", story: "...", fact: "..." },
     mission: "...",
     claimText: "...",
     claimVerdict: "always", // 'always' | 'sometimes' | 'never'
     predict: { question: "...", options: [...], confidenceLevels: [...] },
     experiment: { instructions: "...", minSeconds: 5, presets: [...] },
     notice: { curiosityQuestion: "...", patternInsight: "...", targetTrialsNeeded: 3 },
     challenge: { prompt: "...", hint: "...", isCounterexamplePossible: false, ... },
     prove: {
       title: "...",
       subtitle: "...",
       slots: { claim: "...", evidence: "...", reason: "..." },
       chips: [ { id: 'c1', type: 'claim', text: "..." }, ... ]
     },
     hintLadder: [ "Nudge...", "Strategy...", "Worked Step..." ],
     misconception: "..."
   }
   ```
2. **Create the Interactive Toy Component in `src/components/simulate/toys/L7CustomToy.jsx`:**
   - Accepts `{ onTrialComplete, isMysteryMode }`.
   - Calls `onTrialComplete({ trialText, leftoverNote, isCounterexample, tag })` whenever the user manipulates the toy.
   - When `isMysteryMode === true`, renders the general proof visualizer.
3. **Register the Toy in `src/components/SimulatePhase.jsx`:**
   - Import the lazy component:
     ```javascript
     const L7CustomToy = lazy(() => import('./simulate/toys/L7CustomToy'));
     ```
   - Add to `TOY_COMPONENTS`:
     ```javascript
     const TOY_COMPONENTS = {
       ...
       7: L7CustomToy
     };
     ```
4. The level tabs, 5-beat stepper, Evidence Board, Pattern Meter, XP rewards, and CER validation will automatically configure and run!

---

## 🔧 What to Tweak

- **Difficulty & Thresholds:** Adjust hint ladders, prediction options, and tolerance ranges directly in [`src/data/simulationLevels.js`](file:///c:/Users/asus/OneDrive/Desktop/Grade-7-Explain%20Mathematical%20Thinking/src/data/simulationLevels.js).
- **Sound Effects & Music:** Toggle Web Audio synthesizers or replace static `.mp3` voice lines in `public/audio/` using the mappings in [`src/utils/audioMap.js`](file:///c:/Users/asus/OneDrive/Desktop/Grade-7-Explain%20Mathematical%20Thinking/src/utils/audioMap.js).
- **Theme & Colors:** Colors, glassmorphism intensities, and responsive breakpoints are centralized in [`src/index.css`](file:///c:/Users/asus/OneDrive/Desktop/Grade-7-Explain%20Mathematical%20Thinking/src/index.css).
- **Practice Question Pool:** Procedural questions in the Play phase can be expanded by adjusting generator templates in [`src/generators/index.js`](file:///c:/Users/asus/OneDrive/Desktop/Grade-7-Explain%20Mathematical%20Thinking/src/generators/index.js) and claim rules in [`src/data/claims.js`](file:///c:/Users/asus/OneDrive/Desktop/Grade-7-Explain%20Mathematical%20Thinking/src/data/claims.js).

---

## 🔮 Ideas for v2

1. **Multiplayer Debate Arena (Peer Review):**
   - Real-time "Court of Mathematical Logic" where two learners submit claims with evidence cards, and the audience votes on whether the proof is air-tight or has counterexamples.
2. **Custom Proof Toy Sandbox Builder:**
   - Allow students and teachers to create and publish their own interactive simulation toys (e.g. geometric angle sum proofers, fraction pizza slicers, tessellation generators).
3. **AI Voice Explanations with Speech Recognition:**
   - Allow learners to speak their mathematical thinking into their microphone; an on-device/streaming speech-to-text pipeline analyzes their reasoning and gives tailored feedback.
4. **Exportable Mathematical Thinking Portfolio:**
   - Students can export a downloadable, illustrated "Detective Casebook" PDF containing their journal entries, solved proofs, and earned badges to share with their math teachers.

