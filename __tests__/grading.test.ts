/**
 * Unit tests for rubric-based grading. Stable, deterministic scoring.
 */

import { deterministicGrade, keywordModifier, DEFAULT_RUBRIC } from '@/utils/grading';

const QUESTION = 'What is your defensible advantage, and what would have to be true for it to hold in 18 months?';
const EXPECTED = 'defensible advantage, time-bound, assumption, replication';

describe('deterministicGrade', () => {
  test('1) Perfect answer (high score)', () => {
    const answer = `Our advantage is proprietary data on SMB inventory that took 3 years to build. Because switching cost is high (customers rely on our benchmarks), we retain 94% annually. For this to hold in 18 months we need: (1) no direct competitor with equivalent data coverage, (2) CAC under $400. We are not betting on speed—we are betting on data depth and integration.`;
    const r = deterministicGrade(QUESTION, answer, { expectedAnswer: 'defensible advantage data retention switching 18 months CAC' });
    expect(r.finalScore).toBeGreaterThanOrEqual(65);
    expect(r.verdict).toBe('pass');
    expect(r.criteria.correctness).toBeGreaterThanOrEqual(20);
    expect(r.criteria.reasoning).toBeGreaterThanOrEqual(8);
    expect(r.source).toBe('deterministic');
  });

  test('2) Partially correct but incomplete (mid score)', () => {
    const answer = `We have a defensible advantage in data. Our customers stay because of switching costs. In 18 months we need to keep CAC under control.`;
    const r = deterministicGrade(QUESTION, answer, { expectedAnswer: EXPECTED });
    expect(r.finalScore).toBeGreaterThanOrEqual(40);
    expect(r.finalScore).toBeLessThan(80);
    expect(['pass', 'borderline', 'fail']).toContain(r.verdict);
    expect(r.criteria.completeness).toBeLessThanOrEqual(20);
  });

  test('3) Fluent nonsense with keywords (low score)', () => {
    const answer = `Our moat is our moat. We have differentiation and defensible advantage. The market is full of advantage and differentiation. Moat moat moat. Our defensible advantage is key. We leverage synergy and optimize for scale.`;
    const r = deterministicGrade(QUESTION, answer, { expectedAnswer: EXPECTED });
    expect(r.finalScore).toBeLessThan(55);
    expect(r.criteria.correctness).toBeLessThan(25);
    expect(r.criteria.penalties).toBeLessThanOrEqual(0);
  });

  test('4) Correct but poorly structured (good correctness, lower clarity)', () => {
    const answer = `defensible advantage is data 3 years to build 94% retention switching cost 18 months need no competitor with same data and CAC under 400 we are not betting on speed`;
    const r = deterministicGrade(QUESTION, answer, { expectedAnswer: 'defensible advantage data retention 18 months CAC' });
    expect(r.criteria.correctness).toBeGreaterThanOrEqual(15);
    expect(r.criteria.clarity).toBeLessThan(10);
    expect(r.finalScore).toBeGreaterThanOrEqual(35);
  });

  test('5) Wrong answer with confident tone (penalty)', () => {
    const answer = `We will definitely dominate. Our advantage is clearly unbeatable. Obviously we have the best product. I guarantee we will win. No competitor can ever catch us.`;
    const r = deterministicGrade(QUESTION, answer);
    expect(r.criteria.penalties).toBeLessThanOrEqual(-5);
    expect(r.finalScore).toBeLessThan(60);
  });

  test('6) Very short answer that hits 1 key point (partial credit)', () => {
    const answer = `Defensible advantage is our data.`;
    const r = deterministicGrade(QUESTION, answer, { expectedAnswer: EXPECTED });
    expect(r.finalScore).toBeGreaterThanOrEqual(10);
    expect(r.finalScore).toBeLessThan(50);
    expect(r.criteria.completeness).toBeLessThan(20);
  });

  test('7) Edge: empty answer', () => {
    const r = deterministicGrade(QUESTION, '', { expectedAnswer: EXPECTED });
    expect(r.finalScore).toBe(0);
    expect(r.verdict).toBe('fail');
    expect(r.criteria.correctness).toBe(0);
    expect(r.criteria.completeness).toBe(0);
  });

  test('8) Edge: very long answer with irrelevant tangents', () => {
    const longTangent = 'The history of strategy goes back to Sun Tzu. In modern times we have Porter and Christensen. Many frameworks exist. Synergy and leverage are often mentioned. Ecosystem and paradigm shifts. ';
    const answer = longTangent.repeat(8) + ' Our advantage is data. 94% retention. 18 months we need CAC under 400.';
    const r = deterministicGrade(QUESTION, answer, { expectedAnswer: EXPECTED });
    expect(r.criteria.clarity).toBeLessThan(10);
    expect(r.criteria.penalties).toBeLessThanOrEqual(0);
    expect(r.finalScore).toBeLessThan(75);
  });
});

describe('keywordModifier', () => {
  test('unique positive keywords add up to max +5', () => {
    const text = 'We have advantage, differentiation, and a moat. Our constraint is margin. Evidence shows retention.';
    const mod = keywordModifier(text);
    expect(mod).toBeGreaterThanOrEqual(0);
    expect(mod).toBeLessThanOrEqual(5);
  });

  test('repeating same keyword does not keep increasing (anti-gaming)', () => {
    const spam = 'moat moat moat moat moat moat moat moat moat moat advantage advantage advantage';
    const mod = keywordModifier(spam);
    expect(mod).toBeLessThanOrEqual(5);
    expect(mod).toBeLessThan(keywordModifier('moat advantage differentiation'));
  });

  test('negative keywords reduce modifier', () => {
    const text = 'We are unsure. Maybe we have a commodity. Probably generic. Hope for the best.';
    const mod = keywordModifier(text);
    expect(mod).toBeLessThanOrEqual(0);
    expect(mod).toBeGreaterThanOrEqual(-5);
  });

  test('empty string returns 0', () => {
    expect(keywordModifier('')).toBe(0);
    expect(keywordModifier('   ')).toBe(0);
  });
});

describe('rubric weights and clamping', () => {
  test('finalScore is clamped to [0, 100]', () => {
    const r = deterministicGrade(QUESTION, 'x');
    expect(r.finalScore).toBeGreaterThanOrEqual(0);
    expect(r.finalScore).toBeLessThanOrEqual(100);
  });

  test('DEFAULT_RUBRIC positive weights sum to 95; penalties -15 and -10', () => {
    const sum =
      DEFAULT_RUBRIC.correctness +
      DEFAULT_RUBRIC.completeness +
      DEFAULT_RUBRIC.reasoning +
      DEFAULT_RUBRIC.specificity +
      DEFAULT_RUBRIC.clarity;
    expect(sum).toBe(95);
    expect(DEFAULT_RUBRIC.hallucinationPenaltyMax).toBe(-15);
    expect(DEFAULT_RUBRIC.fluffPenaltyMax).toBe(-10);
  });
});
