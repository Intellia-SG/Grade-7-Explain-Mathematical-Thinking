// src/generators/index.js
import { mulberry32, hashSeed, shuffle, pick, randInt } from '../utils/prng.js';
import { CLAIMS, isCounterexample, evaluateTest } from '../data/claims.js';
import { ERROR_FAMILIES } from '../data/errorFamilies.js';
import { NAMES, CITIES } from '../data/contextPools.js';

// Q1: Order Reasoning
function genOrderReasoning(rng, tier, world) {
  const name = pick(rng, NAMES);
  const city = pick(rng, CITIES);
  const a = randInt(rng, 5, 17) | 1; // odd
  const b = randInt(rng, 5, 17) | 1; // odd
  const sum = a + b;

  const lines = [
    { role: 'claim', text: `Claim: The sum of two odd numbers is always an even number.` },
    { role: 'evidence', text: `Evidence: For example, ${a} + ${b} = ${sum}, and ${sum} is an even number.` },
    { role: 'reason', text: `Reason: Every odd number is pairs of dots with 1 left over; two leftovers always combine into a new pair.` },
    { role: 'conclusion', text: `Conclusion: Therefore, two odd numbers will always sum to an even number with no leftovers.` }
  ];

  return {
    type: 'order_reasoning',
    questionText: `${name} in ${city} is explaining why two odd numbers add to an even number. Which order creates a complete mathematical argument?`,
    options: [
      'Claim → Evidence → Reason → Conclusion',
      'Evidence → Claim → Conclusion → Reason',
      'Reason → Conclusion → Evidence → Claim',
      'Conclusion → Evidence → Claim → Reason'
    ],
    correct: 0,
    hint1: 'A convincing argument begins with what you claim, backs it with evidence, and explains why it works every time.',
    explanation: 'A solid mathematical proof starts with a clear Claim, shows supporting Evidence, explains the underlying Reason, and summarizes with a Conclusion.',
    signature: `Q1|odd_sum|${world}`
  };
}

// Q2: Complete Explanation
function genCompleteExplanation(rng, tier, world) {
  const name = pick(rng, NAMES);
  const n = randInt(rng, 3, 9);
  const doubled = n * 2;

  return {
    type: 'complete_explanation',
    questionText: `Complete ${name}'s explanation: "I claim that multiplying ${n} by 2 gives an even number, ___ every group of 2 can be paired with no leftovers."`,
    options: [
      'because',
      'sometimes',
      'although',
      'instead'
    ],
    correct: 0,
    hint1: 'Look for the linking word that introduces the reason behind the claim.',
    explanation: '"Because" links a mathematical claim directly to its justification or structural reason.',
    signature: `Q2|complete_frame|${n}|${world}`
  };
}

// Q3: Best Justification
function genBestJustification(rng, tier, world) {
  const name = pick(rng, NAMES);
  return {
    type: 'best_justification',
    questionText: `${name} wants to PROVE that the sum of any two even numbers is always even. Which explanation is a true proof, not just an example?`,
    options: [
      'Any even number is made of whole pairs of 2; combining two sets of pairs leaves zero unpaired items.',
      '4 + 6 = 10 and 10 + 12 = 22, so it works for those numbers.',
      'Even numbers are nice numbers that always end in 0, 2, 4, 6, or 8.',
      'My teacher told me that even plus even is always even.'
    ],
    correct: 0,
    hint1: 'Testing two examples shows that a rule can work, but a proof explains why it must work for EVERY possible pair of even numbers.',
    explanation: 'A proof must address the general structure of even numbers (multiples of 2), not just list specific calculations.',
    signature: `Q3|best_justification|${world}`
  };
}

// Q4: Match Representation
function genMatchRepresentation(rng, tier, world) {
  const k = randInt(rng, 2, 4);
  const m = randInt(rng, 3, 7);

  return {
    type: 'match_representation',
    questionText: `Which verbal description matches the algebraic expression ${k}(x + ${m})?`,
    options: [
      `Add ${m} to x first, then multiply the entire sum by ${k}`,
      `Multiply x by ${k}, then add ${m}`,
      `Add ${k} to x, then multiply by ${m}`,
      `Multiply ${m} by x, then add ${k}`
    ],
    correct: 0,
    hint1: 'Parentheses group terms together before multiplication occurs.',
    explanation: `${k}(x + ${m}) means you evaluate the sum inside parentheses (x + ${m}) and then multiply the result by ${k}.`,
    signature: `Q4|match_rep|${k}|${m}|${world}`
  };
}

// Q5: Always, Sometimes, Never
function genAlwaysSometimesNever(rng, tier, world) {
  const claim = pick(rng, CLAIMS);
  const name = pick(rng, NAMES);
  const city = pick(rng, CITIES);

  const verdictLabels = {
    always: 'Always true',
    sometimes: 'Sometimes true',
    never: 'Never true'
  };

  const options = ['Always true', 'Sometimes true', 'Never true'];
  const correctIdx = options.indexOf(verdictLabels[claim.verdict]);

  return {
    type: 'always_sometimes_never',
    questionText: `${name} in ${city} claims: "${claim.text}" Is this statement Always, Sometimes, or Never true?`,
    options,
    correct: correctIdx,
    hint1: 'Try testing different numbers: whole numbers, 0, fractions between 0 and 1, and negative numbers.',
    explanation: claim.verdict === 'always' ? claim.reasonAlways : claim.reasonBreaks,
    signature: `Q5|${claim.id}|${world}`
  };
}

// Q6: Counterexample
function genCounterexample(rng, tier, world) {
  const sometimesClaims = CLAIMS.filter(c => c.verdict === 'sometimes');
  const claim = pick(rng, sometimesClaims);
  const name = pick(rng, NAMES);

  let qText = '';
  let options = [];
  let correctIdx = 0;

  if (claim.id === 'mul_bigger') {
    qText = `${name} says: "${claim.text}" Which test case is a COUNTEREXAMPLE that proves ${name} wrong?`;
    options = ['8 × 0.5 = 4', '5 × 3 = 15', '10 × 2 = 20', '4 × 6 = 24'];
    correctIdx = 0;
  } else if (claim.id === 'square_bigger') {
    qText = `${name} says: "Squaring a number always makes it larger." Which value disproves this claim?`;
    options = ['0.5 (since 0.5² = 0.25)', '4 (since 4² = 16)', '10 (since 10² = 100)', '3 (since 3² = 9)'];
    correctIdx = 0;
  } else if (claim.id === 'primes_sum_even') {
    qText = `${name} says: "The sum of two prime numbers is always even." Which prime pair is a counterexample?`;
    options = ['2 + 3 = 5 (odd sum)', '3 + 5 = 8 (even sum)', '7 + 11 = 18 (even sum)', '5 + 7 = 12 (even sum)'];
    correctIdx = 0;
  } else {
    qText = `${name} says: "Doubling a number always makes it bigger." Which value is a counterexample?`;
    options = ['−4 (since 2 × (−4) = −8, which is smaller)', '5 (since 2 × 5 = 10)', '8 (since 2 × 8 = 16)', '12 (since 2 × 12 = 24)'];
    correctIdx = 0;
  }

  return {
    type: 'counterexample',
    questionText: qText,
    options,
    correct: correctIdx,
    hint1: 'A counterexample is a specific case that satisfies the condition but makes the statement false.',
    explanation: claim.reasonBreaks,
    signature: `Q6|counterexample|${claim.id}|${world}`
  };
}

// Q7: Compare Strategies
function genCompareStrategies(rng, tier, world) {
  const nameA = pick(rng, NAMES);
  const nameB = pick(rng, NAMES.filter(n => n !== nameA));
  const val = pick(rng, [40, 60, 80, 120]);

  return {
    type: 'compare_strategies',
    questionText: `To calculate 25% of ${val}: ${nameA} divides ${val} by 4. ${nameB} calculates 10% twice, then adds 5%. Who has a valid strategy?`,
    options: [
      `Both ${nameA} and ${nameB} are correct; ${nameA}'s method is more efficient.`,
      `Only ${nameA} is correct because 25% has nothing to do with 10%.`,
      `Only ${nameB} is correct because you must always find 10% first.`,
      `Neither method works for finding percentages.`
    ],
    correct: 0,
    hint1: 'Check if 25% is equal to 1/4, and if 10% + 10% + 5% also totals 25%.',
    explanation: `Both methods are mathematically sound! Dividing by 4 is equivalent to multiplying by 1/4 (25%), while decomposing 25% into 10% + 10% + 5% is a great mental math strategy.`,
    signature: `Q7|strategies|${val}|${world}`
  };
}

// Q8: Error Detective
function genErrorDetective(rng, tier, world) {
  const families = Object.values(ERROR_FAMILIES);
  const fam = pick(rng, families);
  const prob = fam.build(rng);

  return {
    type: 'error_detective',
    questionText: `Examine the worked solution below: \nLine 1: ${prob.lines[0]}\nLine 2: ${prob.lines[1]}\nLine 3: ${prob.lines[2]}\nWhat is the mistake in this solution?`,
    options: [
      prob.reasonCorrect,
      prob.reasonDistractors[0],
      prob.reasonDistractors[1],
      prob.reasonDistractors[2]
    ],
    correct: 0,
    hint1: 'Check line 2 against line 1 carefully. Where did the rule break?',
    explanation: `${prob.reasonCorrect} The corrected calculation should be ${prob.fixLine}.`,
    signature: `Q8|error_detective|${prob.signature}|${world}`
  };
}

// Q9: Pattern & Generalise
function genPatternGeneralise(rng, tier, world) {
  const step = randInt(rng, 3, 5);
  const start = randInt(rng, 2, 6);
  const term1 = start;
  const term2 = start + step;
  const term3 = start + step * 2;
  const term4 = start + step * 3;

  return {
    type: 'pattern_generalise',
    questionText: `A sequence starts: ${term1}, ${term2}, ${term3}, ${term4}… Which algebraic rule gives the value of term n, and why?`,
    options: [
      `${step}n + ${start - step} because each step adds ${step}, so it grows at rate ${step}n.`,
      `${step}n + ${start} because the first term is ${start}.`,
      `n + ${step} because we add ${step} to get the next number.`,
      `${start}n because the pattern starts at ${start}.`
    ],
    correct: 0,
    hint1: 'The common difference between terms becomes the coefficient in front of n.',
    explanation: `When a sequence increases by ${step} every time, the formula contains ${step}n. Substituting n=1 gives ${step}(1) + (${start - step}) = ${start}, matching the first term.`,
    signature: `Q9|pattern|${start}|${step}|${world}`
  };
}

// Q10: Explain Answer (Real-World Word Problem)
function genExplainAnswer(rng, tier, world) {
  const name = pick(rng, NAMES);
  const originalPrice = pick(rng, [40, 60, 80, 100]);
  const discountPct = 20;
  const salePrice = originalPrice * 0.8;

  return {
    type: 'explain_answer',
    questionText: `A jacket costs $${originalPrice}. A sign says "20% off". ${name} claims the sale price is $${salePrice}. Which response provides the most complete mathematical justification?`,
    options: [
      `Claim is correct: 20% of $${originalPrice} is $${originalPrice * 0.2}, and subtracting that from $${originalPrice} gives $${salePrice}.`,
      `Claim is correct because $${salePrice} sounds like a fair price for a jacket.`,
      `Claim is incorrect because 20% off always means you pay $20 less.`,
      `Claim is correct because $${originalPrice} divided by 2 is $${originalPrice / 2}.`
    ],
    correct: 0,
    hint1: 'A complete justification states whether the claim is correct and shows the exact percentage calculation and subtraction.',
    explanation: `To justify a discount claim, you must calculate the discount amount (20% of $${originalPrice} = $${originalPrice * 0.2}) and subtract it from the original price ($${originalPrice} − $${originalPrice * 0.2} = $${salePrice}).`,
    signature: `Q10|explain_word_problem|${originalPrice}|${world}`
  };
}

export const GENERATOR_FNS = [
  genOrderReasoning,
  genCompleteExplanation,
  genBestJustification,
  genMatchRepresentation,
  genAlwaysSometimesNever,
  genCounterexample,
  genCompareStrategies,
  genErrorDetective,
  genPatternGeneralise,
  genExplainAnswer
];

export function shuffleOptions(rng, options, correctIdx) {
  if (!options || typeof correctIdx !== 'number' || options.length <= 1) {
    return { options, correct: correctIdx };
  }
  const tagged = options.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
  const shuffled = shuffle(rng, tagged);
  return {
    options: shuffled.map(s => s.opt),
    correct: shuffled.findIndex(s => s.isCorrect)
  };
}

export function generateWorldQuestions(worldId, sessionSeed = 12345, retry = 0) {
  const rng = mulberry32(hashSeed(sessionSeed, worldId, retry));
  
  // Create 10 distinct questions (one of each generator type, shuffled)
  const questions = GENERATOR_FNS.map((genFn) => {
    const rawQ = genFn(rng, 2, worldId);
    if (rawQ.options && typeof rawQ.correct === 'number') {
      const { options, correct } = shuffleOptions(rng, rawQ.options, rawQ.correct);
      return {
        ...rawQ,
        options,
        correct
      };
    }
    return rawQ;
  });

  return shuffle(rng, questions);
}

