import { BusinessState } from '@/types';
import { assessAnswerQuality } from './answerQuality';

/** Keywords that signal stronger strategy → profit up */
const POSITIVE_KEYWORDS = [
  'advantage', 'differentiation', 'moat', 'defensible', 'switching cost',
  'network effect', 'margin', 'unit economics', 'retention', 'LTV',
  'segment', 'positioning', 'job-to-be-done', 'constraint', 'wedge',
];

/** Keywords that signal risk / weak strategy → profit down */
const NEGATIVE_KEYWORDS = [
  'commodity', 'price war', 'commoditized', 'fragile', 'copyable',
  'unsure', 'maybe', 'probably', 'hope', 'assume', 'generic',
];

/**
 * Derives a profit-impact delta (-1 to +1) from all module answers.
 * Used to drive the strategic trajectory graph on the dashboard.
 */
export function getStrategicTrajectoryScore(state: BusinessState): number {
  let totalDelta = 0;
  let count = 0;

  Object.values(state.moduleOutputs || {}).forEach((output) => {
    const quality = assessAnswerQuality(output);
    // Quality 0–10 maps to roughly -0.2 to +0.5 per module
    const qualityDelta = (quality / 10) * 0.7 - 0.2;
    totalDelta += qualityDelta;
    count++;

    // Scan all text for keywords
    const allText: string[] = [];
    if (output.worksheets) {
      Object.values(output.worksheets).forEach((ws) => {
        if (ws.fields) {
          Object.values(ws.fields).forEach((v) => {
            if (typeof v === 'string') allText.push(v);
            if (Array.isArray(v)) v.forEach((x) => typeof x === 'string' && allText.push(x));
          });
        }
      });
    }
    if (output.coldCallResponse) allText.push(output.coldCallResponse);
    if (output.redTeamResponse) allText.push(output.redTeamResponse);
    if (output.requiredOutputs) {
      Object.values(output.requiredOutputs).forEach((v) => typeof v === 'string' && allText.push(v));
    }

    const text = allText.join(' ').toLowerCase();
    const positiveHits = POSITIVE_KEYWORDS.filter((k) => text.includes(k)).length;
    const negativeHits = NEGATIVE_KEYWORDS.filter((k) => text.includes(k)).length;
    const keywordDelta = (positiveHits - negativeHits) * 0.05;
    totalDelta += keywordDelta;
  });

  if (count === 0) return 0;
  const avg = totalDelta / count;
  return Math.max(-1, Math.min(1, avg));
}

/**
 * Returns a series of "profit" values over module completion for the dashboard graph.
 * Each completed module adds a step; the step direction/size is driven by quality + keywords.
 */
export function getStrategicTrajectorySeries(state: BusinessState): { step: number; profit: number; label: string }[] {
  const completed = Object.keys(state.moduleOutputs || {}).length;
  if (completed === 0) {
    return [{ step: 0, profit: 0, label: 'Start' }];
  }

  const series: { step: number; profit: number; label: string }[] = [{ step: 0, profit: 0, label: 'Start' }];
  let profit = 0;

  Object.entries(state.moduleOutputs || {}).forEach(([moduleId, output], idx) => {
    const quality = assessAnswerQuality(output);
    const qualityDelta = (quality / 10) * 12 - 2; // roughly -2 to +10 per module

    const allText: string[] = [];
    if (output.worksheets) {
      Object.values(output.worksheets).forEach((ws) => {
        if (ws.fields) {
          Object.values(ws.fields).forEach((v) => {
            if (typeof v === 'string') allText.push(v);
            if (Array.isArray(v)) v.forEach((x) => typeof x === 'string' && allText.push(x));
          });
        }
      });
    }
    if (output.coldCallResponse) allText.push(output.coldCallResponse);
    if (output.redTeamResponse) allText.push(output.redTeamResponse);
    const text = allText.join(' ').toLowerCase();
    const pos = POSITIVE_KEYWORDS.filter((k) => text.includes(k)).length;
    const neg = NEGATIVE_KEYWORDS.filter((k) => text.includes(k)).length;
    const keywordDelta = (pos - neg) * 0.5;
    profit += qualityDelta + keywordDelta;
    series.push({
      step: idx + 1,
      profit: Math.round(profit * 10) / 10,
      label: `M${moduleId.replace(/\D/g, '').slice(0, 2) || idx + 1}`,
    });
  });

  return series;
}
