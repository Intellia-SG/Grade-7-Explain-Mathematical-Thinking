// src/data/simulationLevels.js

export const SIMULATION_LEVELS = [
  {
    id: 1,
    levelNumber: 1,
    title: "The Tokyo Bento Rush",
    difficulty: "Easy",
    toy: "dumpling_collider",
    realWorld: {
      scenario: "Tokyo Dumpling Factory & Bento Packing",
      title: "Zero-Waste Food Packaging",
      icon: "🍱",
      story: "In high-efficiency kitchens, food is packed in 2-packs. Two separate odd-numbered orders will ALWAYS combine with zero wasted dumplings!",
      fact: "Mathematicians and logistics engineers in Japan use parity (odd/even math) to schedule assembly lines without single leftover items."
    },
    mission: "Can you prove that any two odd customer orders (like 7 and 9) will ALWAYS leave ZERO leftover dumplings?",
    baseValues: { a: 7, b: 9 },
    predictQuestion: "Before running the packing machine: What will happen when we combine an order of 7 and an order of 9 into 2-pack boxes?",
    predictOptions: [
      { text: "There will be 1 leftover dumpling that cannot be packed.", correct: false },
      { text: "Both leftovers will join into a new 2-pack, leaving ZERO leftovers!", correct: true },
      { text: "The total will be an odd number of dumplings.", correct: false }
    ],
    hintLadder: [
      "Nudge: Look at what happens to the single leftover dumpling in each odd box.",
      "Clue: Odd = Pairs + 1. So you have (Pairs + 1) + (Pairs + 1). What is 1 + 1?",
      "Worked Solution: 1 + 1 = 2, which makes exactly one more complete 2-pack! Total is always even."
    ],
    reflection: {
      question: "Why does adding any two odd numbers ALWAYS result in an even number?",
      options: [
        { text: "Because each odd number has exactly 1 leftover dot; two leftovers always form a new pair.", correct: true },
        { text: "Because 7 + 9 = 16 and 16 is an even number.", correct: false },
        { text: "Because odd numbers cancel each other out.", correct: false }
      ],
      explanation: "Every odd number is made of pairs plus 1 lonely leftover dot. When you combine two odd numbers, those two lonely dots unite into a brand new pair, leaving zero unpaired dots!"
    }
  },
  {
    id: 2,
    levelNumber: 2,
    title: "The Cairo Market Discount",
    difficulty: "Medium",
    toy: "rocket_catapult",
    realWorld: {
      scenario: "Khan el-Khalili Bazaar Price Discounts",
      title: "Retail Pricing & Sales",
      icon: "🏷️",
      story: "A vendor claims multiplying a price always makes it larger. But applying a 50% discount multiplier (× 0.5) cuts the price in half!",
      fact: "Retail pricing software relies on multiplier factors between 0 and 1 to apply discounts, flash sales, and clearance markdowns."
    },
    mission: "A vendor claims: 'Multiplying a positive price ($20) by any positive number ALWAYS makes the price higher.' Can you fire a rocket probe to DISPROVE this with a counterexample?",
    baseValues: { base: 20, target: 10 },
    predictQuestion: "If you multiply the $20 price by 0.5, where will the price land compared to $20?",
    predictOptions: [
      { text: "It will land higher than $20 (e.g., $40).", correct: false },
      { text: "It will land lower than $20 ($10), proving the vendor's claim FALSE!", correct: true },
      { text: "It will stay exactly $20.", correct: false }
    ],
    hintLadder: [
      "Nudge: What does multiplying by 0.5 mean in real life? Think of half-price sales!",
      "Clue: Multiplying by a number between 0 and 1 takes only a portion of the original number.",
      "Worked Solution: 20 × 0.5 = 10. Since 10 is LESS than 20, this single counterexample disproves the claim!"
    ],
    reflection: {
      question: "Why was a single test case (20 × 0.5 = 10) enough to prove the vendor wrong?",
      options: [
        { text: "Because to disprove an 'ALWAYS' claim, you only need ONE counterexample where it fails!", correct: true },
        { text: "Because 0.5 is a magic number in algebra.", correct: false },
        { text: "Because the vendor wasn't using a calculator.", correct: false }
      ],
      explanation: "In mathematical logic, if someone says 'X is ALWAYS true', finding just ONE valid case where it fails completely disproves the claim. That is the power of a counterexample!"
    }
  },
  {
    id: 3,
    levelNumber: 3,
    title: "The Shrinking Solar Panel Myth",
    difficulty: "Medium",
    toy: "rocket_catapult",
    realWorld: {
      scenario: "Space Station Micro-Solar Array Efficiency",
      title: "Satellite Energy Modeling",
      icon: "🛰️",
      story: "Engineers often assume squaring a number makes it bigger. But for fractions (like 0.5 meters squared), the area is smaller than the edge!",
      fact: "Aerospace engineers calculating light absorption for space probes must account for fractions shrinking when squared."
    },
    mission: "An engineer claims: 'Squaring any positive number ALWAYS produces a larger result.' Launch the rocket probe to crash this claim!",
    baseValues: { base: 0.5, formula: "x²" },
    predictQuestion: "What is 0.5 squared (0.5 × 0.5), and is it bigger or smaller than 0.5?",
    predictOptions: [
      { text: "0.25, which is SMALLER than 0.5! The claim breaks.", correct: true },
      { text: "1.0, which is bigger than 0.5.", correct: false },
      { text: "0.5, which is unchanged.", correct: false }
    ],
    hintLadder: [
      "Nudge: Half of half is what fraction?",
      "Clue: 1/2 × 1/2 = 1/4. In decimals, 0.5 × 0.5 = 0.25.",
      "Worked Solution: 0.25 < 0.5. Squaring numbers between 0 and 1 actually shrinks them!"
    ],
    reflection: {
      question: "For which numbers does squaring produce a result that is SMALLER than the original number?",
      options: [
        { text: "All numbers between 0 and 1 (fractions and decimals).", correct: true },
        { text: "Only negative numbers.", correct: false },
        { text: "All odd numbers.", correct: false }
      ],
      explanation: "When you multiply a fraction by another fraction less than 1, you are taking a piece of a piece! So for any number where 0 < x < 1, x² < x."
    }
  },
  {
    id: 4,
    levelNumber: 4,
    title: "The Bandra-Worli Bridge Load Audit",
    difficulty: "Tricky",
    toy: "bridge_scanner",
    realWorld: {
      scenario: "Bandra-Worli Sea Link Structural Engineering",
      title: "Civil Infrastructure & Safety",
      icon: "🌉",
      story: "Wind gusts pull against bridge cables with negative force vectors. Subtracting a negative wind vector MUST increase tension!",
      fact: "Civil engineering software runs automated audits on sign conventions so structural loads don't accidentally reverse in windstorms."
    },
    mission: "The draft blueprint calculation says: Tension = −5 − (−8) MN. The contractor wrote: = −5 − 8 = −13 MN. Scan the calculation and fix the critical sign bug before the bridge cracks!",
    baseValues: { a: -5, b: -8 },
    predictQuestion: "What happens mathematically when you subtract a negative number: −5 − (−8)?",
    predictOptions: [
      { text: "Subtracting a negative means ADDING positive 8: −5 + 8 = +3 MN!", correct: true },
      { text: "You combine them into −13 MN because negatives always stay negative.", correct: false },
      { text: "The answer is 0 MN because the signs cancel out.", correct: false }
    ],
    hintLadder: [
      "Nudge: If you take away a cold temperature debt, does it get warmer or colder?",
      "Clue: On a number line, subtracting moves left, but subtracting a negative reverses direction to the RIGHT (addition).",
      "Worked Solution: − (−8) = +8. So −5 + 8 = +3 MN (safe positive tension)!"
    ],
    reflection: {
      question: "Why does subtracting a negative number mathematically equal addition?",
      options: [
        { text: "Because subtracting the opposite of a number moves in the positive direction on the number line.", correct: true },
        { text: "Because two negative signs side-by-side cancel each other into dust.", correct: false },
        { text: "It's just an arbitrary rule with no physical meaning.", correct: false }
      ],
      explanation: "Subtraction means 'find the difference' or 'remove'. Removing a negative debt or reversing backward steps moves you forward in the positive direction!"
    }
  },
  {
    id: 5,
    levelNumber: 5,
    title: "Mumbai Port Container Sequence",
    difficulty: "Tricky",
    toy: "bridge_scanner",
    realWorld: {
      scenario: "Jawaharlal Nehru Port Cargo Container Weight",
      title: "Maritime Freight & Logistics",
      icon: "🚢",
      story: "A cargo crane weighs a 6-ton container plus 4 crates of 5 tons each: 6 + 4 × 5. Adding first causes a catastrophic 50-ton reading!",
      fact: "Automated port gantry cranes use programmed order of operations (PEMDAS/BODMAS) so ship weight distributions remain seaworthy."
    },
    mission: "The shipping manifest says: Total Weight = 6 + 4 × 5. A crane operator added 6 + 4 = 10 first, then multiplied by 5 = 50 Tons! Audit the equation and restore the true weight.",
    baseValues: { a: 6, b: 4, c: 5 },
    predictQuestion: "According to mathematical order of operations, what must be calculated first in 6 + 4 × 5?",
    predictOptions: [
      { text: "4 × 5 = 20 first, then 6 + 20 = 26 Tons!", correct: true },
      { text: "6 + 4 = 10 first, because it is written on the left.", correct: false },
      { text: "All numbers can be added and multiplied in any order.", correct: false }
    ],
    hintLadder: [
      "Nudge: Does multiplication have priority over addition in BODMAS/PEMDAS?",
      "Clue: Group the crates first: 4 crates of 5 tons is 4 × 5 = 20 tons.",
      "Worked Solution: 6 + (4 × 5) = 6 + 20 = 26 tons. Overlooking order of operations created an imaginary 24-ton error!"
    ],
    reflection: {
      question: "Why does multiplication take priority over addition in mathematical conventions?",
      options: [
        { text: "Because multiplication represents repeated addition of groups, so the groups must be evaluated before combining with other terms.", correct: true },
        { text: "Because multiplication signs are shaped like X, marking the spot.", correct: false },
        { text: "Because addition is easier so it goes last.", correct: false }
      ],
      explanation: "4 × 5 represents 4 groups of 5. You have to know what those 4 crates weigh as a group (20) before you can add them to the base 6 tons!"
    }
  },
  {
    id: 6,
    levelNumber: 6,
    title: "The Grand Proof Tribunal (Boss Level)",
    difficulty: "Boss Level",
    toy: "balance_scale",
    realWorld: {
      scenario: "London Supreme Court of Scientific Logic",
      title: "Algebraic Rigor & Justice",
      icon: "⚖️",
      story: "A rival team claims: 'In 2x + 6 = 20, if we add 6 to both sides, we get 2x = 26, so x = 13.' The jury needs you to prove why this breaks equality!",
      fact: "In legal and algorithmic verification, formal algebraic proofs must maintain equivalence at every step without breaking balance."
    },
    mission: "Operate the physical Balance Scale to solve 2x + 6 = 20 step by step: Apply inverse operations equally to both pans until the scale achieves perfect equilibrium!",
    baseValues: { coeff: 2, constant: 6, result: 20 },
    predictQuestion: "To undo adding 6 on the left pan and maintain exact balance, what operation MUST you perform on BOTH pans?",
    predictOptions: [
      { text: "SUBTRACT 6 from both pans, leaving 2x = 14.", correct: true },
      { text: "ADD 6 to both pans, making 2x = 26.", correct: false },
      { text: "DIVIDE by 6 on the left pan only.", correct: false }
    ],
    hintLadder: [
      "Nudge: To remove +6 weights from a balance scale, you must take away 6, not add more!",
      "Clue: Inverse of addition is subtraction: 20 − 6 = 14.",
      "Worked Solution: Subtract 6 from both sides $\rightarrow$ 2x = 14. Then divide both sides by 2 $\rightarrow$ x = 7!"
    ],
    reflection: {
      question: "What is the golden principle that guarantees an algebraic proof is valid?",
      options: [
        { text: "Whatever operation you perform on one side of the equals sign, you must apply equally to the other side.", correct: true },
        { text: "You must always get a whole number answer.", correct: false },
        { text: "You can move numbers across the equals sign whenever you want.", correct: false }
      ],
      explanation: "The equals sign (=) is a truth statement of identical balance. Preserving truth means any operation applied to the left pan must be mirrored on the right pan!"
    }
  }
];

export const SANDBOX_PRESETS = [
  {
    id: 'odd_even',
    name: 'Bento Particle Collider',
    icon: '🍱',
    desc: 'Slide dumpling counts, watch pairing physics, and fuse leftovers!'
  },
  {
    id: 'number_line',
    name: 'Catapult Cannon & Number Line',
    icon: '🚀',
    desc: 'Fire probes with extreme multipliers, decimals, and negative numbers!'
  },
  {
    id: 'bridge_audit',
    name: 'Laser Blueprint Scanner',
    icon: '🌉',
    desc: 'Scan tension equations with live stress gauges and repair structural flaws!'
  },
  {
    id: 'balance_scale',
    name: 'Physics Balance Beam',
    icon: '⚖️',
    desc: 'Add and remove x-boxes and weights to test live balance physics!'
  }
];
