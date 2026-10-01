// src/data/simulationLevelsData.js
// Complete structured data for the 6 Simulate Phase levels
// Follows the 5-beat loop: Predict -> Experiment -> Notice -> Challenge -> Generalise/Prove

export const SIMULATION_LEVELS_DATA = [
  {
    id: 1,
    levelNumber: 1,
    title: "The Tokyo Bento Rush",
    difficulty: "Easy",
    theme: "tokyo",
    toy: "dumpling_conveyor",
    realWorld: {
      scenario: "Tokyo Dumpling Factory & Bento Packing",
      title: "Zero-Waste Food Packaging",
      icon: "🍱",
      story: "In high-efficiency kitchens, food is packed in 2-packs. Two separate odd-numbered orders will ALWAYS combine with zero wasted dumplings!",
      fact: "Mathematicians and logistics engineers in Japan use parity (odd/even math) to schedule assembly lines without single leftover items."
    },
    mission: "Can you prove that any two odd customer orders (like 7 and 9) will ALWAYS leave ZERO leftover dumplings?",
    claimText: "The sum of any two odd numbers is ALWAYS an even number.",
    claimVerdict: "always", // 'always' | 'sometimes' | 'never'
    baseValues: { a: 7, b: 9 },

    // BEAT 1: PREDICT (A calibrated bet)
    predict: {
      question: "Before running the packing machine: What will happen when we combine an order of 7 and an order of 9 into 2-pack boxes?",
      options: [
        {
          id: 'opt1',
          text: "Both leftovers will join into a new 2-pack, leaving ZERO leftovers!",
          correct: true,
          explanation: "7 has 3 pairs + 1 leftover. 9 has 4 pairs + 1 leftover. The two leftovers combine into 1 new pair!"
        },
        {
          id: 'opt2',
          text: "There will be 1 leftover dumpling that cannot be packed.",
          correct: false,
          explanation: "Each odd order has 1 leftover. 1 + 1 = 2, so they make a pair!"
        },
        {
          id: 'opt3',
          text: "The total will be an odd number of dumplings.",
          correct: false,
          explanation: "7 + 9 = 16. Since 16 is divisible by 2, it is even."
        }
      ],
      confidenceLevels: [
        { id: 'guessing', label: "Just Guessing (1x XP)", mult: 1, xp: 10 },
        { id: 'pretty_sure', label: "Pretty Sure (1.5x XP)", mult: 1.5, xp: 15 },
        { id: 'locked_in', label: "100% Locked In (2x XP)", mult: 2, xp: 20 }
      ]
    },

    // BEAT 2: EXPERIMENT (Hands-on sandbox)
    experiment: {
      instructions: "Adjust the order sliders or tap quick presets. Watch dumplings pack into 2-boxes on the conveyor, then tap 'Pack & Combine' to test!",
      minSeconds: 5,
      sliderA: { min: 1, max: 15, default: 7, step: 2 },
      sliderB: { min: 1, max: 15, default: 9, step: 2 },
      presets: [
        { label: "7 + 9 (Base Case)", a: 7, b: 9 },
        { label: "3 + 5 (Small)", a: 3, b: 5 },
        { label: "11 + 13 (Medium)", a: 11, b: 13 },
        { label: "6 + 4 (Even Contrast)", a: 6, b: 4, isContrast: true }
      ]
    },

    // BEAT 3: NOTICE (Evidence Board & Pattern)
    notice: {
      curiosityQuestion: "Look at the Evidence Board cards. When both orders are ODD, how many leftovers remain after combining?",
      patternInsight: "Every odd number has exactly 1 lonely leftover dot. When you combine two odd numbers, those two lonely dots ALWAYS meet to form a brand-new pair!",
      targetTrialsNeeded: 3
    },

    // BEAT 4: CHALLENGE (Can you break it?)
    challenge: {
      prompt: "Can you BREAK this claim? Try to find ANY two odd numbers that leave 1 leftover dumpling when combined!",
      hint: "Try tiny odd numbers (1 + 1), huge odd numbers (99 + 99), or different pairs.",
      isCounterexamplePossible: false,
      breakAttemptSuccessMessage: "It is IMPOSSIBLE to break! No matter what odd numbers you pick, the 1 + 1 leftovers will always snap into a pair.",
      takeaway: "You tested multiple examples, but you can NEVER test all infinite odd numbers. That's why we need a GENERAL PROOF!"
    },

    // BEAT 5: GENERALISE / PROVE
    prove: {
      title: "Visual Proof: The Mystery Bento Crate",
      subtitle: "Let Order A have 'n' unknown pairs + 1 leftover, and Order B have 'm' unknown pairs + 1 leftover.",
      cerQuestion: "Complete Whyzo's Proof Argument by placing the correct reasoning chips:",
      slots: {
        claim: "The sum of any two odd numbers is always even.",
        evidence: "Every odd number can be written as pairs plus 1 leftover: (2n + 1).",
        reason: "When combined, the two single leftovers (1 + 1) unite into 1 new complete pair, leaving zero leftovers."
      },
      chips: [
        { id: 'c1', type: 'claim', text: "The sum of any two odd numbers is always even." },
        { id: 'c2', type: 'claim', text: "Odd numbers sometimes add to odd numbers." }, // distractor
        { id: 'e1', type: 'evidence', text: "Every odd number can be written as pairs plus 1 leftover: (2n + 1)." },
        { id: 'e2', type: 'evidence', text: "7 + 9 = 16, which worked once in Tokyo." }, // distractor (weak)
        { id: 'r1', type: 'reason', text: "When combined, the two single leftovers (1 + 1) unite into 1 new complete pair, leaving zero leftovers." },
        { id: 'r2', type: 'reason', text: "Because even numbers are friendlier than odd numbers." } // distractor
      ]
    },

    hintLadder: [
      "Nudge: Look closely at the single yellow leftover dumpling at the end of each odd box.",
      "Strategy: Notice that Odd = (Pairs + 1). So combining two odds gives (Pairs + 1) + (Pairs + 1). Focus on the (1 + 1).",
      "Worked Step: 1 + 1 = 2, which forms a brand-new complete 2-pack! Since every dumpling is now paired, the sum is ALWAYS even."
    ],
    misconception: "Students often believe testing 3 or 4 examples proves a rule for all infinite numbers. True proof requires structural reasoning (algebraic parity), not just repeated testing."
  },

  {
    id: 2,
    levelNumber: 2,
    title: "The Cairo Market Discount",
    difficulty: "Medium",
    theme: "cairo",
    toy: "discount_haggler",
    realWorld: {
      scenario: "Khan el-Khalili Bazaar Price Discounts",
      title: "Retail Pricing & Haggling",
      icon: "🏷️",
      story: "A vendor claims multiplying a price ALWAYS makes it larger. But applying a 50% discount multiplier (× 0.5) cuts the price in half!",
      fact: "Retail pricing software relies on multiplier factors between 0 and 1 to apply discounts, flash sales, and clearance markdowns."
    },
    mission: "A vendor claims: 'Multiplying a positive price ($20) by any positive number ALWAYS makes the price higher.' Can you find a counterexample?",
    claimText: "Multiplying a positive number by another positive number ALWAYS makes it bigger.",
    claimVerdict: "sometimes", // False as an "always" claim!
    baseValues: { base: 20, testMultiplier: 0.5 },

    // BEAT 1: PREDICT
    predict: {
      question: "If you multiply the $20 bazaar carpet price by 0.5, where will the price land compared to $20?",
      options: [
        {
          id: 'opt1',
          text: "It will land lower than $20 ($10), proving the vendor's claim FALSE!",
          correct: true,
          explanation: "Multiplying by 0.5 means taking 1/2 of $20, which is $10."
        },
        {
          id: 'opt2',
          text: "It will land higher than $20 (e.g., $40).",
          correct: false,
          explanation: "Multiplying by numbers less than 1 decreases the value."
        },
        {
          id: 'opt3',
          text: "It will stay exactly $20.",
          correct: false,
          explanation: "Multiplying by 0.5 changes the value to half."
        }
      ],
      confidenceLevels: [
        { id: 'guessing', label: "Just Guessing (1x XP)", mult: 1, xp: 10 },
        { id: 'pretty_sure', label: "Pretty Sure (1.5x XP)", mult: 1.5, xp: 15 },
        { id: 'locked_in', label: "100% Locked In (2x XP)", mult: 2, xp: 20 }
      ]
    },

    // BEAT 2: EXPERIMENT
    experiment: {
      instructions: "Drag the haggling multiplier slider or stamp discount tags on the $20 item. Watch the live price bar and number line react!",
      minSeconds: 5,
      basePrice: 20,
      slider: { min: 0.1, max: 2.5, default: 0.5, step: 0.1 },
      presets: [
        { label: "× 0.5 (50% Off)", mult: 0.5 },
        { label: "× 0.8 (20% Off)", mult: 0.8 },
        { label: "× 1.0 (Same)", mult: 1.0 },
        { label: "× 1.5 (50% Markup)", mult: 1.5 },
        { label: "× 0.8 then × 0.9 (Stack)", mult: 0.72, isStack: true }
      ]
    },

    // BEAT 3: NOTICE
    notice: {
      curiosityQuestion: "Look at the Evidence Board. What happens to the final price when the multiplier is between 0 and 1?",
      patternInsight: "Whenever you multiply by a fraction or decimal between 0 and 1, you are taking only a fraction of the original quantity, so the result shrinks!",
      targetTrialsNeeded: 3
    },

    // BEAT 4: CHALLENGE (Counterexample Hunt)
    challenge: {
      prompt: "The vendor said 'ALWAYS makes it bigger'. Fire a test that proves the vendor wrong with a single counterexample!",
      hint: "Pick any multiplier strictly between 0 and 1, like 0.5 or 0.25.",
      isCounterexamplePossible: true,
      targetCondition: (mult) => mult > 0 && mult < 1,
      breakAttemptSuccessMessage: "💥 CLAIM BUSTED! 20 × 0.5 = 10, which is LESS than 20! A single counterexample destroys an 'always' claim.",
      takeaway: "In mathematics, to disprove an 'always' claim, you only need ONE valid counterexample!"
    },

    // BEAT 5: GENERALISE / PROVE
    prove: {
      title: "The Multiplier Spectrum Map",
      subtitle: "Visualizing the three multiplier zones: Shrink Zone (0 < m < 1), Identity (m = 1), and Growth Zone (m > 1).",
      cerQuestion: "Complete the Claim-Evidence-Reason argument that refutes the vendor's claim:",
      slots: {
        claim: "Multiplying a positive number by another positive number only SOMETIMES makes it bigger.",
        evidence: "Testing 20 × 0.5 produces 10, which is strictly smaller than the original 20.",
        reason: "Multiplying by a value between 0 and 1 scales down the quantity, providing a decisive counterexample."
      },
      chips: [
        { id: 'c1', type: 'claim', text: "Multiplying a positive number by another positive number only SOMETIMES makes it bigger." },
        { id: 'c2', type: 'claim', text: "Multiplying numbers always makes them smaller." },
        { id: 'e1', type: 'evidence', text: "Testing 20 × 0.5 produces 10, which is strictly smaller than the original 20." },
        { id: 'e2', type: 'evidence', text: "The vendor sounded very confident." },
        { id: 'r1', type: 'reason', text: "Multiplying by a value between 0 and 1 scales down the quantity, providing a decisive counterexample." },
        { id: 'r2', type: 'reason', text: "Because 10 is an even number." }
      ]
    },

    hintLadder: [
      "Nudge: What happens during a 50% off sale in real life? Think of multiplying by 1/2.",
      "Strategy: Multiplying by a number less than 1 takes only a portion of the original amount.",
      "Worked Step: 20 × 0.5 = 10. Since 10 < 20, this single counterexample disproves the vendor's claim!"
    ],
    misconception: "Students over-generalize elementary whole-number multiplication ('multiplication makes bigger') to fractions and decimals."
  },

  {
    id: 3,
    levelNumber: 3,
    title: "The Shrinking Solar Panel Myth",
    difficulty: "Medium",
    theme: "solar",
    toy: "solar_grid",
    realWorld: {
      scenario: "Space Station Micro-Solar Array Efficiency",
      title: "Satellite Energy Modeling",
      icon: "🛰️",
      story: "Engineers often assume squaring a number makes it bigger. But for fractions (like 0.5 meters squared), the area is smaller than the edge!",
      fact: "Aerospace engineers calculating light absorption for space probes must account for fractions shrinking when squared."
    },
    mission: "An engineer claims: 'Squaring any positive number ALWAYS produces a larger result.' Can you crash this myth with the solar grid?",
    claimText: "Squaring any positive number ALWAYS produces a result greater than the number.",
    claimVerdict: "sometimes", // False as "always"
    baseValues: { base: 0.5, formula: "x²" },

    // BEAT 1: PREDICT
    predict: {
      question: "What is 0.5 squared (0.5 × 0.5), and is it bigger or smaller than 0.5?",
      options: [
        {
          id: 'opt1',
          text: "0.25, which is SMALLER than 0.5! The claim breaks.",
          correct: true,
          explanation: "0.5 × 0.5 = 0.25. Since 0.25 < 0.5, squaring made it smaller!"
        },
        {
          id: 'opt2',
          text: "1.0, which is bigger than 0.5.",
          correct: false,
          explanation: "Squaring 0.5 is 0.5 × 0.5, not 0.5 + 0.5."
        },
        {
          id: 'opt3',
          text: "0.5, which is unchanged.",
          correct: false,
          explanation: "Only 1² = 1 and 0² = 0 remain unchanged."
        }
      ],
      confidenceLevels: [
        { id: 'guessing', label: "Just Guessing (1x XP)", mult: 1, xp: 10 },
        { id: 'pretty_sure', label: "Pretty Sure (1.5x XP)", mult: 1.5, xp: 15 },
        { id: 'locked_in', label: "100% Locked In (2x XP)", mult: 2, xp: 20 }
      ]
    },

    // BEAT 2: EXPERIMENT
    experiment: {
      instructions: "Drag the resizable solar panel corner handle. Compare the side length (m) to the total surface area (m²) on the roof grid!",
      minSeconds: 5,
      slider: { min: 0.1, max: 2.5, default: 0.5, step: 0.1 },
      presets: [
        { label: "x = 0.5 (Half meter)", val: 0.5 },
        { label: "x = 0.2 (Micro tile)", val: 0.2 },
        { label: "x = 1.0 (Unit square)", val: 1.0 },
        { label: "x = 2.0 (Large array)", val: 2.0 }
      ]
    },

    // BEAT 3: NOTICE
    notice: {
      curiosityQuestion: "Look at the Evidence Board. For which side lengths is the area SMALLER than the side length itself?",
      patternInsight: "When 0 < x < 1, squaring multiplies a fraction by a fraction. A half of a half is a quarter (0.25), which is smaller than the original half!",
      targetTrialsNeeded: 3
    },

    // BEAT 4: CHALLENGE (Crash the myth)
    challenge: {
      prompt: "Find a counterexample where x² < x to bust the engineer's 'always larger' claim!",
      hint: "Drag the panel to any side length between 0 and 1 (like 0.4 or 0.5).",
      isCounterexamplePossible: true,
      targetCondition: (x) => x > 0 && x < 1,
      breakAttemptSuccessMessage: "💥 MYTH BUSTED! At side = 0.5, Area = 0.25. 0.25 is strictly LESS than 0.5! Squaring shrunk the value.",
      takeaway: "The claim fails for every number between 0 and 1. One counterexample is all that's required to prove an 'always' claim false."
    },

    // BEAT 5: GENERALISE / PROVE
    prove: {
      title: "Fractional Area Grid Visual Proof",
      subtitle: "A 1m × 1m square contains 100 hundredths. A 0.5m × 0.5m panel covers only 25 of those hundredths (0.25 m²).",
      cerQuestion: "Assemble the scientific CER statement to deliver to the satellite team:",
      slots: {
        claim: "Squaring a positive number does NOT always make it larger.",
        evidence: "For x = 0.5, x² = 0.25, and 0.25 is strictly less than 0.5.",
        reason: "Taking a fraction of a fraction produces a smaller portion of the whole unit."
      },
      chips: [
        { id: 'c1', type: 'claim', text: "Squaring a positive number does NOT always make it larger." },
        { id: 'c2', type: 'claim', text: "Squaring always doubles the side length." },
        { id: 'e1', type: 'evidence', text: "For x = 0.5, x² = 0.25, and 0.25 is strictly less than 0.5." },
        { id: 'e2', type: 'evidence', text: "The solar panel was made of blue glass." },
        { id: 'r1', type: 'reason', text: "Taking a fraction of a fraction produces a smaller portion of the whole unit." },
        { id: 'r2', type: 'reason', text: "Because solar panels only work in sunlight." }
      ]
    },

    hintLadder: [
      "Nudge: What is half of one half? Think of cutting a half-sandwich in half.",
      "Strategy: 1/2 × 1/2 = 1/4. In decimal notation, 0.5 × 0.5 = 0.25.",
      "Worked Step: 0.25 is less than 0.5. Squaring any number strictly between 0 and 1 shrinks it!"
    ],
    misconception: "Students believe squaring is an inherently enlarging operation because they only practice with whole integers (2² = 4, 3² = 9)."
  },

  {
    id: 4,
    levelNumber: 4,
    title: "The Bandra-Worli Bridge Load Audit",
    difficulty: "Tricky",
    theme: "mumbai_bridge",
    toy: "bridge_stress_audit",
    realWorld: {
      scenario: "Bandra-Worli Sea Link Structural Engineering",
      title: "Civil Infrastructure & Vector Physics",
      icon: "🌉",
      story: "Wind gusts pull against bridge cables with negative force vectors. Subtracting a negative wind vector MUST increase tension!",
      fact: "Civil engineering software runs automated audits on sign conventions so structural loads don't accidentally reverse in windstorms."
    },
    mission: "Draft calculation says: Tension = −5 − (−8) MN. A contractor wrote: −5 − 8 = −13 MN. Scan the calculation and audit the sign bug!",
    claimText: "Subtracting a negative number (−a − (−b)) is mathematically identical to adding a positive number (−a + b).",
    claimVerdict: "always",
    baseValues: { a: -5, b: -8 },

    // BEAT 1: PREDICT
    predict: {
      question: "What happens mathematically when you calculate −5 − (−8)?",
      options: [
        {
          id: 'opt1',
          text: "Subtracting a negative means ADDING positive 8: −5 + 8 = +3 MN!",
          correct: true,
          explanation: "Subtracting a negative reverses direction: −(−8) = +8, so −5 + 8 = +3 MN."
        },
        {
          id: 'opt2',
          text: "You combine them into −13 MN because negatives always stay negative.",
          correct: false,
          explanation: "That would be −5 − 8, ignoring the double negative."
        },
        {
          id: 'opt3',
          text: "The answer is 0 MN because the signs cancel out.",
          correct: false,
          explanation: "−5 and +8 have different magnitudes: 8 − 5 = 3."
        }
      ],
      confidenceLevels: [
        { id: 'guessing', label: "Just Guessing (1x XP)", mult: 1, xp: 10 },
        { id: 'pretty_sure', label: "Pretty Sure (1.5x XP)", mult: 1.5, xp: 15 },
        { id: 'locked_in', label: "100% Locked In (2x XP)", mult: 2, xp: 20 }
      ]
    },

    // BEAT 2: EXPERIMENT
    experiment: {
      instructions: "Drop loads and wind vectors onto the Sea Link span. Toggle the sign switch to see how removing negative drag adds net tension to the gauge!",
      minSeconds: 5,
      defaultA: -5,
      defaultB: -8,
      presets: [
        { label: "−5 − (−8) (Blueprint Case)", a: -5, b: -8 },
        { label: "−2 − (−6) (Moderate Gust)", a: -2, b: -6 },
        { label: "0 − (−10) (Pure Reversal)", a: 0, b: -10 },
        { label: "−5 − (+8) (Contractor Error)", a: -5, b: 8, isBug: true }
      ]
    },

    // BEAT 3: NOTICE
    notice: {
      curiosityQuestion: "Look at the Evidence Board. What happens to the bridge stress gauge when you subtract a negative drag force?",
      patternInsight: "Subtracting means 'removing'. When you remove downward drag or debt, the net result pushes UPWARD into the positive tension zone!",
      targetTrialsNeeded: 3
    },

    // BEAT 4: CHALLENGE (Can you break the double-negative rule?)
    challenge: {
      prompt: "Can you find ANY pair of numbers where subtracting a negative number does NOT equal adding a positive?",
      hint: "Try zero, huge negative numbers, or equal values like −7 − (−7).",
      isCounterexamplePossible: false,
      breakAttemptSuccessMessage: "Unbreakable! On the number line, subtraction faces left, and the negative sign reverses direction to face right (+). Two reversals always face forward!",
      takeaway: "The double-negative principle is an algebraic axiom that holds across all real numbers without exception."
    },

    // BEAT 5: GENERALISE / PROVE
    prove: {
      title: "Vector Reversal Number Line Proof",
      subtitle: "On a directional coordinate axis, subtracting a vector means adding its opposite: x − (−y) = x + y.",
      cerQuestion: "Complete the audit report for the chief bridge engineer:",
      slots: {
        claim: "Subtracting a negative force vector always increases net tension.",
        evidence: "Calculating −5 − (−8) yields −5 + 8 = +3 MN on the sensor gauge.",
        reason: "Removing a negative drag force eliminates opposing resistance, shifting the net force in the positive direction."
      },
      chips: [
        { id: 'c1', type: 'claim', text: "Subtracting a negative force vector always increases net tension." },
        { id: 'c2', type: 'claim', text: "All negative signs make bridge cables collapse." },
        { id: 'e1', type: 'evidence', text: "Calculating −5 − (−8) yields −5 + 8 = +3 MN on the sensor gauge." },
        { id: 'e2', type: 'evidence', text: "The bridge is painted light gray." },
        { id: 'r1', type: 'reason', text: "Removing a negative drag force eliminates opposing resistance, shifting the net force in the positive direction." },
        { id: 'r2', type: 'reason', text: "Because 8 is a lucky number in engineering." }
      ]
    },

    hintLadder: [
      "Nudge: If you remove a cold air debt from a room, does the temperature go up or down?",
      "Strategy: On a number line, subtraction means moving left. But a negative sign flips your facing direction 180° to the right!",
      "Worked Step: − (−8) = +8. Therefore, −5 + 8 = +3 MN. Safe positive tension!"
    ],
    misconception: "Students memorize 'two negatives make a positive' blindly and misapply it to addition (thinking −5 + (−8) = +13)."
  },

  {
    id: 5,
    levelNumber: 5,
    title: "Mumbai Port Container Sequence",
    difficulty: "Tricky",
    theme: "mumbai_port",
    toy: "crane_sequence",
    realWorld: {
      scenario: "Jawaharlal Nehru Port Cargo Container Weight",
      title: "Maritime Freight & Sequence Rules",
      icon: "🚢",
      story: "A cargo crane weighs a 6-ton container plus 4 crates of 5 tons each: 6 + 4 × 5. Adding first causes a catastrophic 50-ton reading!",
      fact: "Automated port gantry cranes use programmed order of operations (PEMDAS/BODMAS) so ship weight distributions remain seaworthy."
    },
    mission: "The manifest says: Total = 6 + 4 × 5. A crane operator added 6 + 4 = 10 first, then × 5 = 50 Tons! Audit the crane and discover the sequence rule.",
    claimText: "In the linear expression 6 + 4 × 5, multiplication MUST be calculated before addition.",
    claimVerdict: "always",
    baseValues: { base: 6, crateCount: 4, crateWeight: 5 },

    // BEAT 1: PREDICT
    predict: {
      question: "According to mathematical order of operations, what must be calculated first in 6 + 4 × 5?",
      options: [
        {
          id: 'opt1',
          text: "4 × 5 = 20 first, then 6 + 20 = 26 Tons!",
          correct: true,
          explanation: "4 crates of 5 tons is a single grouped cargo unit of 20 tons. Adding the 6 ton base gives 26 tons."
        },
        {
          id: 'opt2',
          text: "6 + 4 = 10 first, because it is written on the left.",
          correct: false,
          explanation: "Operations are not simply evaluated left-to-right; multiplication has higher binding priority."
        },
        {
          id: 'opt3',
          text: "All numbers can be added and multiplied in any arbitrary order.",
          correct: false,
          explanation: "Order of operations is an agreed mathematical convention to avoid ambiguity."
        }
      ],
      confidenceLevels: [
        { id: 'guessing', label: "Just Guessing (1x XP)", mult: 1, xp: 10 },
        { id: 'pretty_sure', label: "Pretty Sure (1.5x XP)", mult: 1.5, xp: 15 },
        { id: 'locked_in', label: "100% Locked In (2x XP)", mult: 2, xp: 20 }
      ]
    },

    // BEAT 2: EXPERIMENT
    experiment: {
      instructions: "Stack containers with the automated crane! Test terms n = 1, 2, 3, 4, then use the ⚡ Fast-Forward button to test the 10th and 50th terms!",
      minSeconds: 5,
      baseWeight: 6,
      unitWeight: 5,
      slider: { min: 1, max: 20, default: 4, step: 1 },
      presets: [
        { label: "n = 1 (6 + 1×5 = 11t)", n: 1 },
        { label: "n = 4 (6 + 4×5 = 26t)", n: 4 },
        { label: "n = 10 (10th term)", n: 10 },
        { label: "n = 50 (50th term)", n: 50, isFastForward: true }
      ]
    },

    // BEAT 3: NOTICE
    notice: {
      curiosityQuestion: "Look at the Evidence Board. What is the pattern in total weight as each new crate is stacked?",
      patternInsight: "The weight starts at 6 (the base container) and increases by exactly 5 tons for every additional crate. The formula for n crates is 6 + 5n!",
      targetTrialsNeeded: 3
    },

    // BEAT 4: CHALLENGE (Predicting the 100th term)
    challenge: {
      prompt: "Can you use the general rule to predict the weight of the 100th container term BEFORE the crane builds it?",
      hint: "Use Base + (n × rate): 6 + (100 × 5) = 6 + 500.",
      targetAnswer: 506,
      isCounterexamplePossible: false,
      breakAttemptSuccessMessage: "🎯 EXACT MATCH! 6 + (100 × 5) = 506 Tons! The general formula predicts terms infinitely faster than stacking one by one.",
      takeaway: "Order of operations reflects physical reality: 100 crates of 5 tons is 500 tons. Adding the 6 ton base produces 506 tons, not (6 + 100) × 5 = 530 tons!"
    },

    // BEAT 5: GENERALISE / PROVE
    prove: {
      title: "Algebraic Sequence Generalisation: T(n) = 6 + 5n",
      subtitle: "Multiplication represents repeated addition of grouped units, which must be consolidated before combining with individual base constants.",
      cerQuestion: "Complete the mathematical proof for the port authority:",
      slots: {
        claim: "In 6 + 4 × 5, multiplication must be evaluated first to yield 26 tons.",
        evidence: "4 crates of 5 tons physically group into 20 tons; adding the 6 ton base equals 26 tons.",
        reason: "Multiplication denotes grouped quantities, which must be evaluated before combining with external constants."
      },
      chips: [
        { id: 'c1', type: 'claim', text: "In 6 + 4 × 5, multiplication must be evaluated first to yield 26 tons." },
        { id: 'c2', type: 'claim', text: "Operations should always be read left-to-right like a storybook." },
        { id: 'e1', type: 'evidence', text: "4 crates of 5 tons physically group into 20 tons; adding the 6 ton base equals 26 tons." },
        { id: 'e2', type: 'evidence', text: "The crane operator has 10 years of experience." },
        { id: 'r1', type: 'reason', text: "Multiplication denotes grouped quantities, which must be evaluated before combining with external constants." },
        { id: 'r2', type: 'reason', text: "Because 50 tons is an even round number." }
      ]
    },

    hintLadder: [
      "Nudge: What do the 4 crates actually weigh altogether before touching the base container?",
      "Strategy: Group the crates first: 4 crates × 5 tons = 20 tons.",
      "Worked Step: 6 + (4 × 5) = 6 + 20 = 26 tons. Adding 6 + 4 first creates an imaginary 24-ton error!"
    ],
    misconception: "Students often calculate left-to-right mechanically without recognizing that multiplication represents grouped items."
  },

  {
    id: 6,
    levelNumber: 6,
    title: "The Grand Proof Tribunal (Boss Level)",
    difficulty: "Boss Level",
    theme: "tribunal",
    toy: "balance_tribunal",
    realWorld: {
      scenario: "Supreme Court of Scientific Logic",
      title: "Algebraic Invariance & Rigor",
      icon: "⚖️",
      story: "A rival team claims: 'In 2x + 6 = 20, if we add 6 to both sides, we get 2x = 26, so x = 13.' The jury needs you to prove why this breaks equality!",
      fact: "In legal and algorithmic verification, formal algebraic proofs must maintain equivalence at every step without breaking balance."
    },
    mission: "Defend mathematical truth against the Skeptic Magistrate! Operate the physical Balance Scale to solve 2x + 6 = 20 step-by-step using inverse operations.",
    claimText: "In 2x + 6 = 20, the unique solution x = 7 is proved by applying inverse operations equally to both sides of the equation.",
    claimVerdict: "always",
    baseValues: { coeff: 2, constant: 6, result: 20 },

    // BEAT 1: PREDICT
    predict: {
      question: "To undo adding 6 on the left pan and maintain exact equilibrium, what operation MUST you perform on BOTH pans?",
      options: [
        {
          id: 'opt1',
          text: "SUBTRACT 6 from both pans, leaving 2x = 14.",
          correct: true,
          explanation: "Subtraction is the inverse of addition (+6 − 6 = 0). Doing it to both pans keeps the scale balanced!"
        },
        {
          id: 'opt2',
          text: "ADD 6 to both pans, making 2x = 26.",
          correct: false,
          explanation: "Adding 6 would make the left pan 2x + 12, moving further away from isolating x."
        },
        {
          id: 'opt3',
          text: "DIVIDE by 6 on the left pan only.",
          correct: false,
          explanation: "Doing an operation to one pan only immediately destroys balance!"
        }
      ],
      confidenceLevels: [
        { id: 'guessing', label: "Just Guessing (1x XP)", mult: 1, xp: 10 },
        { id: 'pretty_sure', label: "Pretty Sure (1.5x XP)", mult: 1.5, xp: 15 },
        { id: 'locked_in', label: "100% Locked In (2x XP)", mult: 2, xp: 20 }
      ]
    },

    // BEAT 2: EXPERIMENT
    experiment: {
      instructions: "Operate the physical balance beam! The Skeptic will challenge you with flawed steps. Apply the true inverse operations to prove x = 7.",
      minSeconds: 5,
      leftX: 2,
      leftConst: 6,
      rightTotal: 20,
      flawedArguments: [
        { id: 'flaw1', text: "Rival says: 'Add 6 to both sides! It makes the equation stronger!'", action: 'add_six', feedback: "💥 DISASTER: 2x + 12 = 26. Adding 6 increases the clutter instead of isolating x!" },
        { id: 'flaw2', text: "Skeptic says: 'Just guess x = 7 once. One example proves it forever!'", action: 'guess_once', feedback: "❌ OBJECTION: Guessing one number doesn't prove that no other numbers work!" },
        { id: 'flaw3', text: "Rival says: 'Subtract 6 from left only to get 2x immediately!'", action: 'left_only', feedback: "⚖️ SCALE CRASHES: Removing weight from one side only breaks equality!" }
      ]
    },

    // BEAT 3: NOTICE
    notice: {
      curiosityQuestion: "Look at the Evidence Board. What happens to the balance beam whenever an operation is applied to BOTH pans equally?",
      patternInsight: "As long as the EXACT SAME operation is applied to both sides, the beam stays in perfect horizontal equilibrium. This is the definition of mathematical equivalence!",
      targetTrialsNeeded: 3
    },

    // BEAT 4: CHALLENGE (Rebutting the Skeptic)
    challenge: {
      prompt: "The Skeptic Magistrate demands: 'Prove that x = 7 is the ONLY solution that keeps the scale balanced!'",
      hint: "Execute Step 1 (Subtract 6 from both sides) and Step 2 (Divide both sides by 2). Watch the Skeptic's confidence drop to 0%!",
      isCounterexamplePossible: false,
      breakAttemptSuccessMessage: "🏛️ SKEPTIC DEFEATED! Step 1: 2x = 14. Step 2: x = 7. Every step maintained strict algebraic equality!",
      takeaway: "In algebra, an equation is a statement of balance. A valid proof maintains balance at every single step."
    },

    // BEAT 5: GENERALISE / PROVE
    prove: {
      title: "The Golden Axiom of Equality",
      subtitle: "If a = b, then a - c = b - c, and a / d = b / d. Truth is invariant under balanced inverse transformations.",
      cerQuestion: "Present the Tribunal's Final Verdict by building the formal Claim-Evidence-Reason proof:",
      slots: {
        claim: "In 2x + 6 = 20, x must equal 7 to satisfy equality.",
        evidence: "Subtracting 6 from both sides leaves 2x = 14; dividing both sides by 2 leaves x = 7.",
        reason: "Applying inverse operations equally to both sides preserves equilibrium and uniquely isolates the variable."
      },
      chips: [
        { id: 'c1', type: 'claim', text: "In 2x + 6 = 20, x must equal 7 to satisfy equality." },
        { id: 'c2', type: 'claim', text: "In 2x + 6 = 20, x can be any number we vote on." },
        { id: 'e1', type: 'evidence', text: "Subtracting 6 from both sides leaves 2x = 14; dividing both sides by 2 leaves x = 7." },
        { id: 'e2', type: 'evidence', text: "The Skeptic wore a very imposing black robe." },
        { id: 'r1', type: 'reason', text: "Applying inverse operations equally to both sides preserves equilibrium and uniquely isolates the variable." },
        { id: 'r2', type: 'reason', text: "Because 7 is widely considered a lucky number." }
      ]
    },

    hintLadder: [
      "Nudge: To undo '+ 6', you must perform its inverse: '− 6'.",
      "Strategy: Whatever you do to the left side, you MUST do to the right side to keep the scale balanced.",
      "Worked Step: 20 − 6 = 14, so 2x = 14. Divide both sides by 2 to get x = 7!"
    ],
    misconception: "Students often treat the equals sign as an 'action' button (like on a calculator) rather than a relational state of exact equivalence between two expressions."
  }
];
