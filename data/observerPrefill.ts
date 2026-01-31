import type { ModuleOutput } from '@/types';
import { getModulesInOrder } from '@/data/all-modules';

/**
 * Prefilled module outputs for Observer Mode so users can browse all content
 * and see example answers without filling anything. Used when creating/loading
 * a project with applicationContext.type === 'observer'.
 */
export function getObserverPrefill(): Record<string, ModuleOutput> {
  const modules = getModulesInOrder();
  const now = new Date().toISOString();
  const out: Record<string, ModuleOutput> = {};

  for (const mod of modules) {
    const requiredOutputs: Record<string, string | number> = {};
    for (const req of mod.requiredOutputs) {
      if (req.type === 'select' && req.options?.length) {
        requiredOutputs[req.id] = req.options[0];
      } else if (req.type === 'number') {
        requiredOutputs[req.id] = 0;
      } else {
        // Use module sample answer for first required output where possible
        const sample = mod.sampleAnswers?.strong?.text;
        requiredOutputs[req.id] = sample && req.id === mod.requiredOutputs[0]?.id
          ? sample.slice(0, 200) + (sample.length > 200 ? '…' : '')
          : 'Sample response (observer mode). Replace with your own when in an active context.';
      }
    }

    const worksheets: Record<string, { worksheetId: string; fields: Record<string, string | number | boolean>; completed: boolean }> = {};
    for (const ws of mod.worksheets) {
      const fields: Record<string, string | number | boolean> = {};
      for (const f of ws.fields) {
        if (f.type === 'checkbox-group' && f.options?.length) {
          fields[f.id] = f.options[0];
        } else if (f.type === 'select' && f.options?.length) {
          fields[f.id] = f.options[0];
        } else if (f.type === 'number') {
          fields[f.id] = 0;
        } else {
          fields[f.id] = mod.sampleAnswers?.strong?.text?.slice(0, 120) ?? 'Sample (observer mode).';
        }
      }
      worksheets[ws.id] = { worksheetId: ws.id, fields, completed: true };
    }

    out[mod.id] = {
      moduleId: mod.id,
      completed: false,
      requiredOutputs,
      worksheets,
      coldCallResponse: mod.coldCall
        ? 'Sample cold-call response (observer mode). In an active context you would answer under time pressure.'
        : undefined,
      redTeamResponse: mod.redTeam
        ? 'Sample red-team response (observer mode). In an active context you would enter your own adversarial answer.'
        : undefined,
      timestamp: now,
      readingSpineCompleted: true,
      synthesisResponse: mod.synthesisDisciplines?.length
        ? 'Sample synthesis: this module connects to the discipline above (observer mode).'
        : undefined,
      whatWouldChangeIn7Days: 'Sample: one concrete change in the next 7 days if this strategy is right (observer mode).',
      legitimacyLensResponses: mod.legitimacyLens
        ? {
            whoCouldAttack: 'Sample: who could credibly attack this (observer mode).',
            whatLooksExploitative: 'Sample: what would make this look exploitative (observer mode).',
            implicitPromise: 'Sample: what promise we are making implicitly (observer mode).',
          }
        : undefined,
    };
  }

  return out;
}

/** All module IDs in order (Pillar 1, 2, 3) for unlocking observer mode. */
export function getAllModuleIds(): string[] {
  return getModulesInOrder().map((m) => m.id);
}
