import { randInt } from '../utils/prng.js';

export const ERROR_FAMILIES = {
  sign_subtract_negative: {
    familyId: 'sign_subtract_negative',
    level: 1,
    title: 'Subtracting a Negative Integer',
    build(rng) {
      const a = randInt(rng, 2, 8);
      const b = randInt(rng, 3, 9);
      return {
        familyId: 'sign_subtract_negative',
        level: 1,
        lines: [
          `−${a} − (−${b})`,
          `= −${a} − ${b}`,
          `= −${a + b}`
        ],
        correctLines: [
          `−${a} − (−${b})`,
          `= −${a} + ${b}`,
          `= ${b - a >= 0 ? `${b - a}` : `−${Math.abs(b - a)}`}`
        ],
        faultyIndex: 1,
        fixLine: `= −${a} + ${b}`,
        reasonCorrect: `Subtracting −${b} is the same as adding positive ${b}, so the minus sign must turn into a plus sign.`,
        reasonDistractors: [
          'Negative numbers cannot be subtracted from each other.',
          'Two minus signs in an equation always produce a negative answer.',
          `The first number should have been written as positive ${a}.`
        ],
        signature: `sign_sub|${a}|${b}`
      };
    }
  },

  order_of_operations: {
    familyId: 'order_of_operations',
    level: 2,
    title: 'Order of Operations (PEMDAS/BODMAS)',
    build(rng) {
      const a = randInt(rng, 2, 7);
      const b = randInt(rng, 2, 6);
      const c = randInt(rng, 3, 6);
      return {
        familyId: 'order_of_operations',
        level: 2,
        lines: [
          `${a} + ${b} × ${c}`,
          `= ${a + b} × ${c}`,
          `= ${(a + b) * c}`
        ],
        correctLines: [
          `${a} + ${b} × ${c}`,
          `= ${a} + ${b * c}`,
          `= ${a + (b * c)}`
        ],
        faultyIndex: 1,
        fixLine: `= ${a} + ${b * c}`,
        reasonCorrect: `Multiplication must be computed before addition, so ${b} × ${c} must be evaluated first.`,
        reasonDistractors: [
          'Addition always takes priority because it appears first on the left.',
          'The order of operations allows evaluating operations in any order.',
          `The number ${a} must also be multiplied by ${c}.`
        ],
        signature: `order_ops|${a}|${b}|${c}`
      };
    }
  },

  distribute_first_only: {
    familyId: 'distribute_first_only',
    level: 2,
    title: 'Distributive Property',
    build(rng) {
      const k = randInt(rng, 3, 6);
      const m = randInt(rng, 2, 7);
      return {
        familyId: 'distribute_first_only',
        level: 2,
        lines: [
          `${k}(x + ${m})`,
          `= ${k}x + ${m}`,
          `= Done`
        ],
        correctLines: [
          `${k}(x + ${m})`,
          `= ${k}x + ${k * m}`,
          `= Done`
        ],
        faultyIndex: 1,
        fixLine: `= ${k}x + ${k * m}`,
        reasonCorrect: `The outer multiplier ${k} must multiply both terms inside parentheses: ${k} · x and ${k} · ${m}.`,
        reasonDistractors: [
          'You only multiply the term with the variable x.',
          'Parentheses cannot be expanded when there is a variable.',
          `The plus sign should become a multiplication sign.`
        ],
        signature: `distribute|${k}|${m}`
      };
    }
  },

  inverse_operation_wrong: {
    familyId: 'inverse_operation_wrong',
    level: 3,
    title: 'Solving Linear Equations',
    build(rng) {
      const x = randInt(rng, 3, 8);
      const a = randInt(rng, 2, 5);
      const b = randInt(rng, 4, 9);
      const c = a * x + b;
      return {
        familyId: 'inverse_operation_wrong',
        level: 3,
        lines: [
          `${a}x + ${b} = ${c}`,
          `2.  ${a}x = ${c + b}`,
          `3.  x = ${(c + b) / a}`
        ],
        correctLines: [
          `${a}x + ${b} = ${c}`,
          `2.  ${a}x = ${c - b}`,
          `3.  x = ${x}`
        ],
        faultyIndex: 1,
        fixLine: `2.  ${a}x = ${c - b}`,
        reasonCorrect: `To undo adding ${b}, you must subtract ${b} from both sides, not add ${b}.`,
        reasonDistractors: [
          `You should divide by ${a} before removing ${b}.`,
          `The equation has no real solution.`,
          `Both sides must be squared first.`
        ],
        signature: `inverse_op|${a}|${b}|${c}`
      };
    }
  }
};
