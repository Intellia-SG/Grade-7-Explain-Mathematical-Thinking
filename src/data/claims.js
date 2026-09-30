// src/data/claims.js

const isInt = Number.isInteger;
const isPrime = (n) =>
  isInt(n) && n > 1 &&
  Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0);

export function evaluateTest(claim, x, y) {
  if (!claim.domain(x, y)) return { valid: false };
  return { valid: true, held: claim.holds(x, y) };
}

export const isCounterexample = (claim, x, y) => {
  const r = evaluateTest(claim, x, y);
  return r.valid && !r.held;
};

export const CLAIMS = [
  {
    id: 'mul_bigger',
    tier: 2,
    verdict: 'sometimes',
    arity: 2,
    text: 'Multiplying a positive number by another positive number always makes it bigger.',
    domain: (x, y) => x > 0 && y > 0,
    holds: (x, y) => x * y > x,
    reasonBreaks: 'Multiplying by a number between 0 and 1, or by 1, does not make the original number bigger (e.g. 8 × 0.5 = 4).',
  },
  {
    id: 'add_pos_greater',
    tier: 1,
    verdict: 'always',
    arity: 2,
    text: 'Adding a positive number to any number always gives a greater number.',
    domain: (x, y) => y > 0,
    holds: (x, y) => x + y > x,
    reasonAlways: 'Adding a positive amount moves the number to the right on the number line, so the result is always greater.',
  },
  {
    id: 'consec_sum_odd',
    tier: 1,
    verdict: 'always',
    arity: 1,
    text: 'The sum of two consecutive whole numbers is always odd.',
    domain: (x) => isInt(x) && x >= 0,
    holds: (x) => (x + (x + 1)) % 2 !== 0,
    reasonAlways: 'One number is even and the other is odd. An even plus an odd always equals an odd number.',
  },
  {
    id: 'even_times_any_even',
    tier: 1,
    verdict: 'always',
    arity: 2,
    text: 'An even number times any whole number is always even.',
    domain: (x, y) => isInt(x) && isInt(y) && x % 2 === 0,
    holds: (x, y) => (x * y) % 2 === 0,
    reasonAlways: 'An even number has a factor of 2, so multiplying it by any whole number keeps that factor of 2.',
  },
  {
    id: 'double_bigger',
    tier: 1,
    verdict: 'sometimes',
    arity: 1,
    text: 'Doubling a number always makes it bigger.',
    domain: (x) => typeof x === 'number',
    holds: (x) => 2 * x > x,
    reasonBreaks: 'Doubling 0 gives 0, and doubling a negative number makes it smaller (e.g. 2 × (−3) = −6, which is less than −3).',
  },
  {
    id: 'div_smaller',
    tier: 2,
    verdict: 'sometimes',
    arity: 2,
    text: 'Dividing a positive number by a positive number always makes it smaller.',
    domain: (x, y) => x > 0 && y > 0,
    holds: (x, y) => x / y < x,
    reasonBreaks: 'Dividing by a fraction between 0 and 1 makes the number larger (e.g. 6 ÷ 0.5 = 12).',
  },
  {
    id: 'square_bigger',
    tier: 3,
    verdict: 'sometimes',
    arity: 1,
    text: 'Squaring a number always makes it larger.',
    domain: (x) => typeof x === 'number',
    holds: (x) => x * x > x,
    reasonBreaks: 'Squaring 0 gives 0, 1² = 1, and squaring numbers between 0 and 1 makes them smaller (e.g. 0.5² = 0.25).',
  },
  {
    id: 'primes_sum_even',
    tier: 3,
    verdict: 'sometimes',
    arity: 2,
    text: 'The sum of two prime numbers is always even.',
    domain: (x, y) => isPrime(x) && isPrime(y),
    holds: (x, y) => (x + y) % 2 === 0,
    reasonBreaks: 'Two is a prime number and it is even. Two plus any odd prime (like 3) equals an odd number (2 + 3 = 5).',
  },
  {
    id: 'up_down_10',
    tier: 3,
    verdict: 'never',
    arity: 1,
    text: 'Increasing a number by 10% and then decreasing the result by 10% returns the original number.',
    domain: (x) => x > 0,
    holds: (x) => Math.abs(x * 1.1 * 0.9 - x) < 1e-9,
    reasonBreaks: 'The 10% decrease is calculated from the new, larger amount, so you take away more than you originally added (e.g. 100 → 110 → 99).',
  },
  {
    id: 'neg_times_neg_pos',
    tier: 2,
    verdict: 'always',
    arity: 2,
    text: 'A negative number multiplied by a negative number is always positive.',
    domain: (x, y) => x < 0 && y < 0,
    holds: (x, y) => x * y > 0,
    reasonAlways: 'Multiplying by a negative reverses the direction on the number line. Reversing twice faces the positive direction.',
  },
];
