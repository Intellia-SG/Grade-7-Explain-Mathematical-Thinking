# Product Requirements Document (PRD)

## Explain Mathematical Thinking — Claims, Evidence, Reasons & Proof | Grade 7 Math

### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Global Think-Aloud Club — Explain Mathematical Thinking"**, an interactive, gamified, simulation-based lesson module for **Grade 7 students (age 12–13)**. The module teaches students to **explain, justify, test and critique mathematical thinking** using Grade 7 number, ratio and algebra content as the vehicle (odd/even reasoning, integers, percentages, proportional reasoning, patterns, simple equations).

The module is a standalone **React (Vite + JSX)** web application and **strictly mirrors the visual language, UX structure and interaction patterns** of the reference product:

- Reference site: **<https://grade5-time-intervals.vercel.app/>**
- Reference repository (structural template for UI, PRD/TRD and audio scripts): **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>**

The module is uploaded to the Intellia course catalogue at:

```
https://intelliasg.com/courses/grade-3-math
```

The lesson must sit visually and structurally alongside the other modules listed on that page (same top bar, phase tracker, bottom bar, card styles, mascot treatment and badge language).

Audio narration follows the **ElevenLabs pipeline** documented in `audio_generation_pipeline.md` (Voice: **Alice**, Voice ID `Xb7hH8MSUJpSbSDYk0k2`, Model `eleven_multilingual_v2`), with the same hybrid pre-generation + dynamic-fallback architecture, the same per-style voice-settings table, and the same strict rule: **only paragraph text and questions are narrated — never titles, headings, world names or section labels.**

The lesson follows a global, multicultural story featuring students named **John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima and Diego**, who enter the online **World Math Fair** and discover that *a correct answer is only half the job — you must explain why it is correct.*

The module follows Intellia's proven **learner journey: INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT**, with **learning first** (Wonder, Story, Simulate) and **practice second** (Play), where **every practice question is randomly generated**.

---

## 2. Product Vision & Goals

**Vision** To help 12–13 year-old learners move from "I got the answer" to "I can prove it" — by letting them build arguments, hunt for counterexamples and catch errors inside hands-on simulations, then practise with an endless supply of freshly generated questions.

**Goals**

| Goal                        | Metric                                                                   |
| --------------------------- | ------------------------------------------------------------------------ |
| Learning Completion         | ≥85% of students complete all 6 phases                                   |
| Practice Engagement         | ≥90% attempt at least 10 practice questions                              |
| Score Achievement           | Average Play score ≥70% on first attempt                                 |
| Session Duration            | Average engagement ≥20 minutes per session                               |
| Curriculum Alignment        | 100% aligned to global Grade 7 reasoning/communication expectations      |
| Phase Progression           | ≥80% reach Play phase in a single session                                |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations                                   |
| Randomization Integrity     | 0% repeated question sets across sessions; 0 duplicate questions in one session |
| Explanation Quality         | ≥70% of students complete the Reflect "explain it" frame with all 3 parts (claim, evidence, reason) |

---

## 3. Target Users

**Primary: Grade 7 Students (Age 12–13)**

- Ready for abstract reasoning, formal vocabulary and multi-step arguments, still supported by visuals and manipulatives
- Learn best through "try it, break it, then prove it" exploration before formal practice
- Motivated by streaks, badges, leaderboards-of-self, world maps and a story with a mystery
- Global classroom context: international schools, mixed-curriculum classrooms, home learners

**Secondary: Parents & Teachers**

- Assign as classwork, homework or enrichment for the "mathematical processes / reasoning" strand
- Expect alignment to recognised frameworks (see Section 4)
- Monitor completion through in-lesson phase indicators and the Reflect summary

---

## 4. Curriculum Alignment — Global Grade 7 Mathematics

**Topic:** Explain Mathematical Thinking
**Programme:** Intellia Grade 7 Math — Mathematical Processes: Reasoning, Communication & Justification
**Upload target:** `https://intelliasg.com/courses/grade-3-math`

Only reasoning/communication-related content from each framework is used. Content topics (numbers, ratios, expressions, equations) act as the *vehicle* for reasoning and stay within Grade 7 scope.

**Source References (cross-referenced against major global frameworks — verify exact wording against the current official documents before publishing):**

- **U.S. Common Core** — Standards for Mathematical Practice: MP1 (make sense of problems), MP3 (construct viable arguments and critique the reasoning of others), MP6 (attend to precision), MP7 (look for and make use of structure); content vehicles from Grade 7 Number System, Ratios & Proportional Relationships and Expressions & Equations
- **Singapore MOE Secondary 1 Mathematics Syllabus** — Mathematical Processes: Reasoning, Communication and Connections
- **UK National Curriculum — Key Stage 3** — Aim "reason mathematically": follow a line of enquiry, conjecture relationships, develop an argument, justification or proof using mathematical language
- **Cambridge Lower Secondary Mathematics** — Thinking and Working Mathematically: specialising, generalising, conjecturing, convincing, characterising, classifying, critiquing and improving
- **Australian Curriculum (Year 7)** — Mathematical proficiencies: Reasoning (explaining reasoning, justifying choices, evaluating claims)
- **CBSE/ICSE (India) Class 7** — reasoning and mathematical-communication expectations across Integers, Simple Equations, Ratio and Percentage, Algebraic Expressions and Patterns chapters, consistent with the National Curriculum Framework emphasis on reasoning

**Learning Objectives Covered:**

| LO   | Description                                                                                              |
| ---- | -------------------------------------------------------------------------------------------------------- |
| LO1  | Distinguish a **claim**, **evidence** and a **reason** in a mathematical argument                        |
| LO2  | Explain why a result is true using words, diagrams and symbols (multiple representations)                |
| LO3  | Decide whether a statement is **always, sometimes or never** true                                        |
| LO4  | Find and use a **counterexample** to disprove a general claim                                            |
| LO5  | Explain why one example (or several) is **not a proof** but a generalised argument can be                |
| LO6  | Locate, explain and correct an error in a worked solution (error analysis)                               |
| LO7  | Compare two solution strategies and justify which is more efficient or appropriate                       |
| LO8  | Describe a pattern with a rule and justify why the rule works (generalising)                             |
| LO9  | Use precise mathematical vocabulary and sentence frames when explaining                                  |
| LO10 | Write a complete explanation (claim + evidence + reason + conclusion) for a real-world word problem      |

**Concrete → Pictorial → Abstract (CPA) Progression:**

- **Concrete:** Drag counters, tiles and sentence blocks to *build* an argument (Station A)
- **Pictorial:** Number-line and calculator probes that *show* why a claim breaks (Station B)
- **Abstract:** Step-by-step worked solutions in symbols where the student explains the mistake (Station C)

**Number Ranges (content vehicle):**

- Easy: whole numbers to 50; odd/even; simple multiples; small positive/negative integers to ±10
- Medium: integers to ±20; halves, quarters and decimals to 2 d.p.; percentages of 10/25/50; one-step and two-step equations
- Hard: rational numbers, percentage change, consecutive-number structures, two-step equations with negatives, multi-claim reasoning

**Vocabulary Focus:** "claim", "evidence", "reason", "because", "therefore", "conjecture", "example", "counterexample", "always / sometimes / never", "justify", "prove", "generalise", "representation", "strategy", "efficient", "error", "verify", "precise"

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ Welcome: "Hello, Explorer! Ready to explain your thinking? 🦉🌍"           │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                 │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈1–2 min)                                                │
│ Hook: Sofia says "Multiplying two numbers always makes the answer bigger." │
│ Carlos says "Not always!" Who is right — and how can we PROVE it?          │
│ Visual: two speech bubbles over a world map, calculator flickering 8 × ½   │
│ Mascot Whyzo the Reasoning Owl tilts head, curious                         │
│ Narration: Alice reads the hook warmly                                     │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈3 min) — "The Global Think-Aloud Club"                   │
│ 6 illustrated panels; the club enters the World Math Fair and learns the   │
│ Explain-It Toolkit: CLAIM → EVIDENCE → REASON (+ counterexample, error     │
│ check, representation). Key vocabulary highlighted; world-map pins.        │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈7–9 min) — learn by doing                             │
│ Station A — Proof Builder (Concrete)                                       │
│ Station B — Counterexample Lab (Pictorial)                                 │
│ Station C — Error Detective (Abstract)                                     │
│ All 3 must be completed to advance. Every round is randomly generated.     │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈9–12 min)                                                 │
│ IntelliPlay™: 100 randomly generated questions across 10 world-landmark    │
│ levels; 10 questions per world; world unlocks at ≥6/10 correct             │
│ Stars (1–3), XP, badges, streak fire, hints and encouragement-first        │
│ feedback                                                                   │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈2 min)                                                 │
│ "Explain-It Frame" journal: choose a claim, add evidence, add a reason.    │
│ Self-check checklist (Claim? Evidence? Because?). Completion badge,        │
│ XP + badge summary, "Share with your teacher" export.                      │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 2 — Story: "The Global Think-Aloud Club"

### 6.1 Premise

Ten friends from ten countries — **John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos and Yuki** — meet online as the **Global Think-Aloud Club** to enter the **World Math Fair**. The judge is **Whyzo the Reasoning Owl**, who has one rule: *"A right answer is not enough. Explain why it is right!"* To win the **Golden Logic Trophy**, the club must travel (virtually) through ten landmark cities and defend their thinking at every stop. **Priya, Fatima and Diego** join as rival teams whose claims the club must test and critique — giving the story recurring "mystery" hooks (Who made the mistake? Is this claim really true?).

### 6.2 Story Panels (6 panels)

| Panel | Setting              | Content (on-screen = narrated, 1:1)                                                                                                           | Learning purpose                         |
| ----- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 1     | World map, 10 pins   | John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Think-Aloud Club. They meet online from ten countries to enter the World Math Fair. | Sets context; global inclusion           |
| 2     | Whyzo's podium       | The judge, Whyzo the owl, has one rule. A right answer is not enough. You must explain why it is right!                                       | Introduces the goal of the lesson (LO1)  |
| 3     | New York classroom   | Mike in New York says, seven plus nine is sixteen, so two odd numbers always add to an even number. Whyzo asks, does one example prove it?    | Example ≠ proof (LO5)                    |
| 4     | Tokyo robot lab      | Yuki in Tokyo shows a picture. Each odd number is a pair of dots with one dot left over. Two leftover dots make a new pair, so the total is even! | Evidence + reason via diagram (LO2)      |
| 5     | Mumbai spice market  | Aisha in Mumbai checks her friend's work. Negative three minus negative five equals two, not negative eight. She points to the exact step where the mistake happened. | Error analysis (LO6)                     |
| 6     | Fair stage, trophy   | Claim, evidence, reason! With these three tools, every explorer can explain their thinking and earn the Golden Logic Trophy!                  | Toolkit recap (LO1, LO9)                 |

**Panel visuals:** animated slide-in illustrations; panel 3 shows the odd-plus-odd sum with counters, panel 4 animates dots pairing up, panel 5 shows a 3-line worked solution with one line glowing red, panel 6 shows the **Explain-It Toolkit card** (CLAIM 🟦 · EVIDENCE 🟨 · REASON 🟩) with colour tags reused in every later phase.

### 6.3 Recurring Story Devices (used in Play word problems)

- **Rival teams:** Priya (Mumbai), Fatima (Cairo), Diego (Mexico City) post claims; the student judges them
- **Whyzo's Verdicts:** "Convincing!", "Needs evidence!", "Needs a reason!" — appear as feedback chips
- **World Math Fair booths:** each world's landmark hosts a themed "booth" (market prices, train timetables, recipe ratios, sports stats) that supplies the word-problem context

---

## 7. Phase 3 — Simulation Design (Detailed)

All three stations are **randomly generated per round** from parameter pools (never the same numbers twice in one session). Mascot Whyzo reacts to each round; every instruction and feedback line is narrated by Alice.

### 7.1 Station A — "Proof Builder" (Concrete)

**Goal:** Build a short, complete argument by combining a hands-on demonstration with sentence blocks.

**Visual:**

- A **Counter Board** with draggable counters (circles) and a "pairing / grouping zone"
- A **Claim Card** at the top (colour-tagged blue): e.g., *"The sum of two odd numbers is even."*
- A tray of **argument tiles** in three colours: 🟦 Claim · 🟨 Evidence · 🟩 Reason, plus a *weak-reasoning distractor tile* (e.g., "I tried one example so it always works.")

**Interaction:**

1. Student generates two random numbers that fit the claim (e.g., 7 and 9) — counters appear
2. Student drags counters into pairs/groups; leftovers highlight to *show the structure*
3. Student drags tiles into the **Argument Frame** in order: Claim → Evidence → Reason → Conclusion
4. Submit checks both tile order and tile content; the weak-reasoning tile must be rejected
5. Tap-to-select + tap-to-place fallback for accessibility

**Round pool (4 rounds drawn randomly, 1 per claim family):**

| Family | Claim (templated)                                           | Counter demonstration                                   |
| ------ | ----------------------------------------------------------- | ------------------------------------------------------- |
| A1     | The sum of two odd numbers is even                          | Pair dots; two leftovers form a pair                    |
| A2     | The product of an even number and any whole number is even  | Groups of 2 — no leftover                               |
| A3     | The sum of two consecutive whole numbers is odd             | Two rows differ by one dot; one unpaired dot remains    |
| A4     | The sum of three consecutive numbers is a multiple of 3     | Rearrange rows (n−1, n, n+1) into three equal rows of n |

**Feedback:**

- Correct → Whyzo spins, "Convincing! You built a complete argument!" 🎉
- Missing part → Whyzo names it: "Needs a reason!" / "Needs evidence!" plus narrated hint
- Weak tile chosen → "One example is a clue, not a proof. Try a reason that works for every case."

### 7.2 Station B — "Counterexample Lab" (Pictorial)

**Goal:** Decide whether a general claim is always, sometimes or never true, and use test values to break it.

**Visual:**

- **Claim Card** (e.g., *"Multiplying a positive number by another positive number always makes it bigger."*)
- An interactive **Number Line Probe** and a small **calculator panel** where the student enters test values (x, y)
- A results table that logs each test with ✅ (claim held) or ❌ (claim broke)
- Three verdict buttons: **Always · Sometimes · Never**

**Interaction:**

1. Student tests at least **3 values** (input validated against the claim's domain)
2. Student chooses a verdict
3. If *Sometimes / Never*: student must **produce a counterexample** from their own tests (or enter a new one) and it is validated by the claim's test function
4. If *Always*: student chooses the best reason from 3 options (one weak "I tried a few" option, one partial, one general)
5. Number line animates the before/after positions so the failure is visible (e.g., 8 × 0.5 lands left of 8)

**Round pool (3–4 rounds drawn randomly):**

| Claim family | Verdict   | Example counterexample / reason             |
| ------------ | --------- | ------------------------------------------- |
| Multiplying positives makes bigger | Sometimes | 8 × 0.5 = 4 (or × 1) |
| Adding a positive number makes greater | Always | Adding right of zero moves right on the number line |
| Dividing a positive by a positive makes smaller | Sometimes | 6 ÷ 0.5 = 12 |
| Squaring makes a number larger | Sometimes | 0, 1, or 0.5² = 0.25 |
| Sum of two primes is even | Sometimes | 2 + 3 = 5 |
| Increase by 10% then decrease by 10% returns the original | Never | 100 → 110 → 99 |

**Teaching goal:** One counterexample is enough to disprove; many examples can never prove an "always" claim.

### 7.3 Station C — "Error Detective" (Abstract)

**Goal:** Read a worked solution, find the faulty step, explain why, and correct it.

**Visual:**

- A **Step Ladder**: 3–5 lines of a worked solution in large type, one line faulty
- Whyzo holds a magnifying glass that follows the student's finger/cursor
- A **reason picker** (4 options) and a **fix input** (typed or tile-based)

**Interaction:**

1. Tap the line where the mistake first happens
2. Choose the reason that explains *why* it is wrong (one correct, three plausible distractors)
3. Enter or select the corrected line; the ladder re-renders with the fix in green and the downstream lines auto-updating
4. "Show me a check" hint reveals a substitution check (plug the answer back in)

**Error families (random):**

| Level | Error type                                   | Example                                     |
| ----- | -------------------------------------------- | ------------------------------------------- |
| 1     | Sign error when subtracting a negative       | −3 − (−5) = −8                              |
| 1     | Adding denominators when adding fractions    | 1/2 + 1/3 = 2/5                             |
| 2     | Order of operations                          | 2 + 3 × 4 = 20                              |
| 2     | Distributing to only the first term          | 3(x + 4) = 3x + 4                           |
| 3     | Inverse operation applied wrongly            | 2x + 5 = 17 → 2x = 22                       |
| 3     | Percent change applied to the wrong base     | "20% off then 20% more returns the price"   |

**3 rounds, difficulty rising Level 1 → 2 → 3; numbers randomised each round.**

### 7.4 Simulation Completion Rules

- All 3 stations (min 3 rounds in B and C, 3 in A) must be completed to advance
- Stations can be replayed; replays regenerate new numbers
- Completing all 3 unlocks the **Proof Builder** badge and the Play phase

---

## 8. Phase 4 — Random Question Generation (100 per session)

### 8.1 Generation Principle

There is **no fixed 100-question bank**. Each of the 10 question types has a **generator** that builds a fresh question from parameter pools, names, cities, contexts and sentence templates. A session creates exactly **100 questions** (10 types × 10) using a **seeded random generator**; a duplicate-signature check guarantees **no two questions in a session are identical**, and a fresh session seed guarantees a different set every time.

### 8.2 Question Types (10 types × 10 questions = 100)

| Type | Name                              | Description                                                               | Example                                                                                                   |
| ---- | --------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Q1   | Order the Reasoning               | Tap/drag 4 scrambled argument lines into the order Claim → Evidence → Reason → Conclusion | "Put Sarah's argument about 9 + 13 in order."                                          |
| Q2   | Complete the Explanation          | Fill blanks in a sentence frame using a word/phrase bank                  | "I claim that ___ because ___."                                                                          |
| Q3   | Choose the Best Justification     | Pick which explanation *proves* (not just illustrates) a claim            | "Which reason shows the sum of two even numbers is always even?"                                         |
| Q4   | Match Representations             | Match an expression/equation/diagram/words to the same idea               | "Which diagram matches 3(x + 2)?"                                                                        |
| Q5   | Always, Sometimes or Never        | Classify a claim and pick the justification                               | "Doubling a number makes it bigger. Always, sometimes or never?"                                          |
| Q6   | Find the Counterexample           | Choose (or enter) the value that disproves a claim                        | "Liam says squaring makes a number bigger. Which number proves him wrong?"                               |
| Q7   | Compare Strategies                | Compare two methods; decide which is correct/more efficient and why       | "Emma finds 25% of 48 by halving twice. Noah multiplies by 0.25. Which statements are true?"            |
| Q8   | Error Detective                   | Identify the faulty step **and** the reason                               | "Find the first wrong step in Diego's solution."                                                         |
| Q9   | Pattern & Generalise              | Find a rule and justify why it works                                      | "Why does this pattern always add 3? Choose the best explanation."                                       |
| Q10  | Explain the Answer (Word Problem) | Choose the most precise, complete explanation for a real-world context    | "Priya says the discount makes the jacket half price. Which explanation checks her claim?"               |

### 8.3 Distribution Across Worlds

Each world contains **exactly one of each type** (10 questions). Type totals are therefore 10 each; difficulty ramps by world.

| World | Landmark / Booth              | Easy | Medium | Hard | Reasoning focus (difficulty-ramped)        |
| ----- | ----------------------------- | ---- | ------ | ---- | ------------------------------------------ |
| 1     | Cairo — Pyramid Workshop      | 8    | 2      | 0    | What is a claim? Claim/evidence/reason     |
| 2     | Mumbai — Spice Market         | 7    | 3      | 0    | Evidence from examples; checking a claim   |
| 3     | Paris — Louvre Gallery        | 6    | 4      | 0    | Multiple representations                   |
| 4     | Tokyo — Robot Lab             | 4    | 5      | 1    | Comparing strategies; efficiency           |
| 5     | Sydney — Harbour Bridge       | 3    | 5      | 2    | Always / sometimes / never                 |
| 6     | Rio — Carnival Parade         | 3    | 5      | 2    | Counterexamples                            |
| 7     | Cape Town — Table Mountain    | 2    | 5      | 3    | Error analysis                             |
| 8     | Nairobi — Safari Scoreboard   | 1    | 4      | 5    | Patterns and generalising                  |
| 9     | Istanbul — Bazaar Bridge      | 1    | 4      | 5    | Multi-step justification                   |
| 10    | London — Grand Proof Tribunal | 0    | 3      | 7    | Mixed, hardest; critique a rival's proof   |
| **TOTAL** |                           | **35** | **40** | **25** |                                          |

### 8.4 Difficulty Definitions

- **Easy:** single-step claim, whole numbers ≤ 50, one visible representation, 3 options
- **Medium:** two-step reasoning, integers to ±20, simple fractions/decimals/percentages, 4 options, plausible distractors
- **Hard:** rational numbers, structure-based (consecutive numbers, percentage change, inverse operations), critique of a rival's argument, 4–5 options with "partially correct" distractors

### 8.5 Global Context — Names, Places & Objects

**Names (global set):** John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi, Amara, Kenji, Lucia

**Cities / landmarks:** Cairo, Mumbai, Paris, Tokyo, Sydney, Rio de Janeiro, Cape Town, Nairobi, Istanbul, London, New York, Mexico City

**Contexts:** market prices and discounts, train timetables, recipe ratios, sports scoreboards, art-gallery tickets, phone-plan comparisons, school fundraiser tallies

### 8.6 Randomization Requirements

- Every question's numbers, names, cities, contexts and option order are generated at runtime
- Question order within a world is shuffled; worlds stay in progression order
- Options are shuffled; correct-answer position is uniformly distributed across sessions
- Distractors are generated from **common misconceptions** (see TRD), not random noise
- **Retry** of a world regenerates all 10 questions; **Replay** of the lesson starts a new session seed
- A session seed is stored so a page refresh restores the *same* questions

### 8.7 Language & Notation Requirements

- Sentence frames: "I claim that ___ because ___." · "For example, ___." · "This works every time because ___." · "A counterexample is ___, which shows that ___." · "My mistake was in step ___ because ___."
- Signs written with the true minus symbol (−); multiplication as × ; division as ÷
- Percentages, fractions and decimals use standard notation; fractions rendered as stacked fractions in UI
- Narration converts symbols to words (see TRD speech normaliser)

---

## 9. Gamification Design

### 9.1 Reward System

- **Stars (⭐):** 1–3 per 10-question world
- **XP Points:** 10 XP correct first try · 7 XP second try · 5 XP with hint used
- **Streak 🔥:** consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5
- **Explanation Bonus:** +3 XP when the student chooses the most *complete* explanation on the first try in Q3/Q10

### 9.2 Badges (Unlockable)

- 🏅 **"Clear Thinker"** — complete Wonder + Story
- 🥈 **"Proof Builder"** — complete all 3 simulation stations
- 🥇 **"Reasoning Champion"** — score ≥80% across Play
- 💎 **"Perfect Proof"** — 10/10 in any world
- 🔥 **"Streak Star"** — streak of 10 correct answers
- 🌍 **"Global Explorer"** — complete all phases (lesson complete)
- 🔍 **"Counterexample Hunter"** — solve 5 counterexample/always-sometimes-never questions on the first try
- 🕵️ **"Error Detective"** — find 5 faulty steps on the first try
- 🏆 **"Golden Logic Trophy"** — 3 stars in all 10 worlds (bonus, hidden until close)

### 9.3 Feedback Mechanics

**✅ Correct:** bounce animation, Whyzo happy, celebration audio, floating XP, streak increment, Whyzo verdict chip "Convincing!"

**❌ Incorrect (Attempt 1):** gentle shake; audio "Not quite! Let's check that reasoning again."; **Hint 1** highlights the claim/evidence/reason colour-tags in the question

**❌ Incorrect (Attempt 2):** stronger shake; **Hint 2** plays a short visual demonstration (counters pair up, number line jump or substitution check)

**❌ Incorrect (Attempt 3):** answer revealed with an animated worked explanation narrated by Alice; no score penalty

No negative scoring. Encouragement-first feedback always; wrong-answer feedback explains the *misconception*, not just the correct answer.

### 9.4 World Map (IntelliPlay™ Progression — Global Landmarks)

1. **World 1 — "Cairo Pyramid Workshop"** (Q1–10)
2. **World 2 — "Mumbai Spice Market"** (Q11–20)
3. **World 3 — "Paris Louvre Gallery"** (Q21–30)
4. **World 4 — "Tokyo Robot Lab"** (Q31–40)
5. **World 5 — "Sydney Harbour Bridge"** (Q41–50)
6. **World 6 — "Rio Carnival Parade"** (Q51–60)
7. **World 7 — "Cape Town Table Mountain"** (Q61–70)
8. **World 8 — "Nairobi Safari Scoreboard"** (Q71–80)
9. **World 9 — "Istanbul Bazaar Bridge"** (Q81–90)
10. **World 10 — "London Grand Proof Tribunal"** (Q91–100)

**Unlock gate:** ≥6/10 correct to advance. **3 stars** unlock a hidden **Bonus Challenge** (3 extra randomly generated questions).

### 9.5 Mascot — Whyzo the Reasoning Owl

- **Character:** a friendly owl-judge with round glasses and a small gavel
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Simulation feedback, Play hints, Reflect
- **Reactions:** correct answer, badge unlock, streak milestone, world completion, verdict chips
- **Audio:** all mascot speech via the ElevenLabs Alice voice

---

## 10. Audio & Narration Design

Fully aligned with `audio_generation_pipeline.md`.

### 10.1 Pipeline Summary

- **Voice Provider:** ElevenLabs (Alice — Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2` · **Model:** `eleven_multilingual_v2`
- **API Key Env Var:** `VITE_ELEVENLABS_API_KEY`
- **Pre-generation:** `scripts/generate_audio.js` → static `.mp3` in `public/assets/audio/` for all fixed lines (Wonder, Story, station instructions, feedback, badges, Reflect, and fixed question stems)
- **Dynamic fallback:** randomly generated question text is requested on-the-fly and cached for the session
- **Mapping:** auto-generated `src/utils/audioMap.js` (exact text → file path)
- **Cleanup:** `scripts/clean_audio.js` removes orphaned files

### 10.2 Content Policy — Paragraphs & Questions ONLY

> **IMPORTANT:** Audio is generated ONLY for paragraph/story text and question text. Titles, headings, world names and section labels are **never** narrated.

### 10.3 Speech Styles

| Style                       | Stability | Similarity Boost | Style | Speaker Boost | Use case                            |
| --------------------------- | --------- | ---------------- | ----- | ------------- | ----------------------------------- |
| `celebration`               | 0.12      | 0.45             | 0.75  | ✅             | Badge unlock, world complete        |
| `encouragement`             | 0.16      | 0.50             | 0.65  | ✅             | Correct-answer and retry feedback   |
| `question`                  | 0.20      | 0.55             | 0.55  | ✅             | Practice question read-aloud        |
| `emphasis`                  | 0.16      | 0.50             | 0.60  | ✅             | Key vocabulary, toolkit recap       |
| `thinking`                  | 0.24      | 0.60             | 0.35  | ✅             | Wonder hook, mascot thinking        |
| `statement` / `instruction` | 0.20      | 0.55             | 0.50  | ✅             | Story narration, station directions |

### 10.4 Narration Script Examples (exact text is shared with the UI — 1:1 parity)

**Phase 1 (Wonder) — thinking / question / encouragement**
> "Sofia says, when you multiply two numbers, the answer is always bigger."
> "Carlos says, not always! Who is right, and how can we prove it?"
> "Let's discover how to explain our mathematical thinking!"

**Phase 2 (Story) — statement / emphasis** — the six panel texts in Section 6.2 (verbatim).

**Phase 3 (Stations) — instruction / question**
> "Drag the counters into pairs. Then build your argument with a claim, evidence, and a reason!"
> "Test some numbers. Is this claim always, sometimes, or never true?"
> "Read each step carefully. Can you find the first step where the mistake happens?"

**Phase 4 (Feedback)**
> "Convincing! You explained your thinking perfectly!" — celebration
> "Not quite! Let's check that reasoning again." — encouragement
> "Watch closely. Can you see why the claim breaks?" — thinking

**Phase 5 (Reflect) — thinking / celebration**
> "What an adventure! Can you explain one claim using evidence and a reason?"
> "Lesson complete! You are a Global Think-Aloud Champion!"

### 10.5 Strict 1:1 Parity Rule

Every narrated on-screen string in `narration.js` must match UI text **exactly** (same words, punctuation, capitalisation). Any UI text change requires updating both `generate_audio.js`'s `phrases` array and `narration.js`. Random question text is narrated from the exact `questionText` field rendered on screen.

---

## 11. UX & Visual Design Requirements

### 11.1 Visual Theme and UI Parity

- **Brand:** Intellia — Think. Explore. Become.
- **Reference UI (strict match):** `https://grade5-time-intervals.vercel.app/`
- **Reference Repo (strict match):** `https://github.com/p1pachare-cloud/Grade5-Time-Intervals` — reuse its component layout, Tailwind config, PostCSS/Vite setup, phase wrapper, top/bottom bars, card radii, shadows, spacing scale, animation keyframes and button styles; change only content, diagrams, colours of world themes and mascot
- **Parity checklist (must pass before upload):** top bar identical; phase tracker dots identical; bottom bar (XP · stars · streak · nav) identical; intro screen layout identical; world-map scroller identical; feedback overlay identical; badge toast identical; font family and weights identical; responsive breakpoints identical
- **Colour tags (new, scoped to this lesson):** Claim 🟦 · Evidence 🟨 · Reason 🟩 · Conclusion 🟪 — used consistently in Story, stations, hints and Play
- **Typography:** same rounded, playful family as the reference (Nunito/Fredoka-style)
- **Illustrations:** cartoon-style, globally inclusive characters and landmark backdrops (pyramids, Gateway of India, Louvre pyramid, Tokyo skyline, Sydney Harbour Bridge, Christ the Redeemer, Table Mountain, Nairobi skyline, Bosphorus Bridge, Big Ben)

### 11.2 Layout Structure (mirrors the reference app)

- **Top Bar:** Intellia logo | Lesson title "Explain Mathematical Thinking" | 6-phase dot tracker
- **Main Area:** phase content (responsive, smooth transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows | audio toggle
- **Sidebar:** hidden on mobile; vertical phase map on tablet+

### 11.3 Primary Visual Components

- **Counter Board** — draggable counters with pairing/grouping zones
- **Argument Frame** — colour-tagged slots (Claim, Evidence, Reason, Conclusion)
- **Number Line Probe** — animated jumps for multiplication, division and addition
- **Step Ladder** — worked solution with selectable lines
- **Representation Cards** — words ↔ symbols ↔ diagram ↔ table matching
- **Balance Scale** — equation reasoning (inverse operations)
- **Explain-It Toolkit card** — persistent help drawer listing the sentence frames

### 11.4 Accessibility

- Minimum 44×44px tap targets
- WCAG AA contrast (colour tags also carry icons/letters — never colour alone)
- All narration via ElevenLabs (consistent voice); visible text always present
- Keyboard navigable; drag interactions have tap+tap fallback
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Respect `prefers-reduced-motion`

### 11.5 Responsive Design

- Primary: desktop (1024px+) and tablet (768px+)
- Tertiary: mobile (375px+) — single-column stacked layout; Counter Board and Step Ladder scroll within their own containers

---

## 12. Content Requirements

### 12.1 Simulation Visuals

- Counter Board with pairing zones; argument tiles in colour tags
- Number-line probe and calculator panel with ✅/❌ test log
- Step Ladder with magnifier highlighting and fix-it input

### 12.2 Question Generation Coverage

- 10 generators → 100 unique question objects per session (no stored bank)
- Seeded RNG per session; duplicate-signature guard
- Every MCQ distractor maps to a named misconception (e.g., "tested one example", "reversed the operation", "added denominators")

### 12.3 Word-Problem Formats

**Claim-checking sense:**
> "[Name] in [City] says, '[claim]'. Which explanation best shows whether [he/she] is right?"

**Strategy-comparing sense:**
> "[Name A] solves it by [method 1]. [Name B] solves it by [method 2]. Which statements are true?"

**Error-spotting sense:**
> "Here are [Name]'s steps. Find the first step that is not correct, and say why."

### 12.4 Audio Script Parity (Strict 1:1 Rule)

Every narrated on-screen string must match `narration.js` exactly. Fixed strings are pre-generated; generated question text is fetched dynamically using the exact rendered string.

---

## 13. Success Criteria (v1.0)

| Criterion                                                              | Target     |
| ---------------------------------------------------------------------- | ---------- |
| 100 questions generated randomly per session, zero duplicates          | ✅ Required |
| All 3 simulation stations functional with randomised rounds            | ✅ Required |
| All 6 phases navigable end-to-end                                      | ✅ Required |
| Gamification (XP, stars, 9 badges) working                             | ✅ Required |
| World-map 10-world progression logic correct                           | ✅ Required |
| ElevenLabs audio plays for all Wonder/Story/Station/Reflect narration  | ✅ Required |
| Audio pipeline (pre-gen + dynamic fallback) functional                 | ✅ Required |
| Mobile/tablet/desktop responsive layout                                | ✅ Required |
| Global Grade 7 reasoning/communication coverage confirmed              | ✅ Required |
| Loads in < 3 seconds (Vite production build)                           | ✅ Required |
| WCAG AA accessible                                                     | ✅ Required |
| UI parity checklist with the Grade 5 Time Intervals reference passes   | ✅ Required |
| Uploaded and reachable from `intelliasg.com/courses/grade-3-math`      | ✅ Required |

---

## 14. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / cross-device persistence
- Multiplayer or class-competition features
- Free-text automated grading of written explanations (Reflect uses sentence frames and a self-check list)
- Formal proof by induction or algebraic proof beyond Grade 7 (e.g., 2n and 2n+1 notation is shown only as an optional "Challenge" visual)
- Print-worksheet generation
- Full-curriculum assessment engine

---

**Document Version:** 1.0 | September 2026
**Product:** Intellia — Grade 7 Math, Explain Mathematical Thinking
**Lesson Title:** Global Think-Aloud Club — Explain Mathematical Thinking
**Curriculum:** Global Grade 7 Mathematics (Common Core SMP, Singapore MOE, UK NC KS3, Cambridge Lower Secondary, Australian Curriculum, CBSE/ICSE cross-aligned)
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Upload Target:** <https://intelliasg.com/courses/grade-3-math>
