import { NextRequest, NextResponse } from 'next/server';
import type { ModuleOutput, AIGrade, BusinessState } from '@/types';
import { heuristicGradeFromModuleOutput, gradeResultToAIGrade } from '@/utils/gradeFallback';
import { deterministicGrade, DEFAULT_RUBRIC } from '@/utils/grading';
import { gradeWithLLM } from '@/utils/llmGrading';

function textFromModuleOutput(output: ModuleOutput): string {
  const parts: string[] = [];
  if (output.requiredOutputs) {
    Object.entries(output.requiredOutputs).forEach(([k, v]) => {
      if (v != null && String(v).trim()) parts.push(`[${k}]: ${String(v)}`);
    });
  }
  if (output.worksheets) {
    Object.values(output.worksheets).forEach((ws) => {
      if (ws.fields) {
        Object.entries(ws.fields).forEach(([id, v]) => {
          if (v != null && String(v).trim()) parts.push(`[${id}]: ${String(v)}`);
        });
      }
    });
  }
  if (output.coldCallResponse?.trim()) parts.push(`Cold Call: ${output.coldCallResponse.trim()}`);
  if (output.redTeamResponse?.trim()) parts.push(`Red Team: ${output.redTeamResponse.trim()}`);
  if (output.whatWouldChangeIn7Days?.trim()) parts.push(`What would change in 7 days: ${output.whatWouldChangeIn7Days.trim()}`);
  if (output.synthesisResponse?.trim()) parts.push(`Synthesis: ${output.synthesisResponse.trim()}`);
  return parts.join('\n\n');
}

type GradeBody =
  | { moduleId: string; moduleOutput: ModuleOutput; stateSnapshot?: Partial<BusinessState>; requestFeedback?: boolean }
  | { questionPrompt: string; userAnswer: string; expectedAnswer?: string; requestFeedback?: boolean; useLLM?: boolean };

export async function POST(request: NextRequest) {
  let body: GradeBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim() ?? '';

  // --- New rubric-based grading: questionPrompt + userAnswer ---
  if ('questionPrompt' in body && 'userAnswer' in body) {
    const { questionPrompt, userAnswer, expectedAnswer, requestFeedback = false, useLLM = false } = body;
    if (!questionPrompt || typeof userAnswer !== 'string') {
      return NextResponse.json({ error: 'questionPrompt and userAnswer required' }, { status: 400 });
    }
    const rubric = DEFAULT_RUBRIC;
    if (useLLM && apiKey) {
      const gradeResult = await gradeWithLLM(
        { questionPrompt, userAnswer, expectedAnswer, rubric, requestFeedback },
        apiKey
      );
      return NextResponse.json({
        gradeResult,
        grade: gradeResultToAIGrade(gradeResult),
      });
    }
    const gradeResult = deterministicGrade(questionPrompt, userAnswer, {
      expectedAnswer,
      rubric,
      includeKeywordModifier: true,
    });
    if (requestFeedback && gradeResult.verdict !== 'pass') {
      gradeResult.feedback = {
        strengths: gradeResult.notes.length ? gradeResult.notes : ['Attempted response.'],
        improvements: ['Add concrete numbers or examples.', 'State cause-effect with "because" or "if...then".'],
        nextStep: 'Revise with one specific metric and one explicit tradeoff.',
      };
    }
    return NextResponse.json({
      gradeResult,
      grade: gradeResultToAIGrade(gradeResult),
    });
  }

  // --- Legacy: moduleId + moduleOutput → AIGrade ---
  if (!('moduleId' in body) || !('moduleOutput' in body)) {
    return NextResponse.json({ error: 'moduleId and moduleOutput required' }, { status: 400 });
  }

  const { moduleId, moduleOutput, requestFeedback = false } = body;
  const text = textFromModuleOutput(moduleOutput);

  if (!text.trim()) {
    const fallback = heuristicGradeFromModuleOutput(moduleOutput);
    return NextResponse.json({ grade: fallback, derivedDeltas: {}, source: 'heuristic' });
  }

  const questionPrompt = `Module: ${moduleId}. Evaluate all answers (required outputs, worksheets, cold call, red team) for correctness, completeness, reasoning, specificity, and clarity. Penalize fluff and unsupported claims.`;
  const rubric = DEFAULT_RUBRIC;

  if (apiKey) {
    try {
      const gradeResult = await gradeWithLLM(
        { questionPrompt, userAnswer: text, rubric, requestFeedback },
        apiKey
      );
      const grade = gradeResultToAIGrade(gradeResult);
      const derivedDeltas = {
        aiQualityIndex: gradeResult.finalScore / 100,
        hasKeywordStuffing: grade.redFlags.some((f) => /keyword|stuffing/i.test(f)),
      };
      return NextResponse.json({
        grade,
        gradeResult,
        derivedDeltas,
        source: 'llm',
      });
    } catch (e) {
      console.error('[grade] LLM failed', e);
    }
  }

  const gradeResult = deterministicGrade(questionPrompt, text, {
    rubric,
    includeKeywordModifier: true,
  });
  const grade = gradeResultToAIGrade(gradeResult);
  const derivedDeltas = {
    aiQualityIndex: gradeResult.finalScore / 100,
    hasKeywordStuffing: false,
  };
  return NextResponse.json({
    grade,
    gradeResult,
    derivedDeltas,
    source: 'deterministic',
  });
}
