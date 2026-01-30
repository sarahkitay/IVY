import { ModuleOutput } from '@/types';

/**
 * Assesses the quality of answers in a module output
 * Returns a score from 0-10 that can be converted to Board Credibility points
 */
export function assessAnswerQuality(moduleOutput: ModuleOutput | undefined): number {
  if (!moduleOutput) return 0;

  let qualityScore = 0;
  let totalChecks = 0;

  // Check required outputs quality
  if (moduleOutput.requiredOutputs) {
    Object.entries(moduleOutput.requiredOutputs).forEach(([key, value]) => {
      totalChecks++;
      if (value) {
        const text = String(value);
        // Quality indicators:
        // - Length (more thoughtful = longer, but not too long)
        if (text.length > 20 && text.length < 500) qualityScore += 1;
        // - Specificity (contains numbers, names, concrete details)
        if (/\d+/.test(text) || /[A-Z][a-z]+ [A-Z][a-z]+/.test(text)) qualityScore += 1;
        // - No generic phrases
        const genericPhrases = ['good', 'better', 'nice', 'great', 'awesome', 'cool'];
        const hasGeneric = genericPhrases.some(phrase => 
          text.toLowerCase().includes(phrase)
        );
        if (!hasGeneric) qualityScore += 1;
        // - Contains strategic keywords (shows depth)
        const strategicKeywords = ['advantage', 'competitor', 'customer', 'market', 'value', 'differentiation', 'risk', 'assumption'];
        const hasKeywords = strategicKeywords.some(keyword => 
          text.toLowerCase().includes(keyword)
        );
        if (hasKeywords) qualityScore += 1;
      }
    });
  }

  // Check worksheet quality
  if (moduleOutput.worksheets) {
    Object.values(moduleOutput.worksheets).forEach((worksheet) => {
      if (worksheet.fields) {
        Object.entries(worksheet.fields).forEach(([key, value]) => {
          totalChecks++;
          if (value) {
            const text = String(value);
            if (text.length > 20 && text.length < 500) qualityScore += 1;
            if (/\d+/.test(text) || /[A-Z][a-z]+ [A-Z][a-z]+/.test(text)) qualityScore += 1;
            const genericPhrases = ['good', 'better', 'nice', 'great', 'awesome', 'cool'];
            const hasGeneric = genericPhrases.some(phrase => 
              text.toLowerCase().includes(phrase)
            );
            if (!hasGeneric) qualityScore += 1;
          }
        });
      }
    });
  }

  // Check Cold Call response quality
  if (moduleOutput.coldCallResponse) {
    totalChecks++;
    const text = moduleOutput.coldCallResponse;
    if (text.length > 30) qualityScore += 2; // Cold calls should be thoughtful
    if (!text.toLowerCase().includes('maybe') && !text.toLowerCase().includes('probably')) {
      qualityScore += 1; // No hedging
    }
  }

  // Check Red Team response quality
  if (moduleOutput.redTeamResponse) {
    totalChecks++;
    const text = moduleOutput.redTeamResponse;
    if (text.length > 50) qualityScore += 2; // Red Team responses should be detailed
    if (text.toLowerCase().includes('risk') || text.toLowerCase().includes('threat') || text.toLowerCase().includes('weakness')) {
      qualityScore += 1; // Shows self-awareness
    }
  }

  // Normalize to 0-10 scale
  if (totalChecks === 0) return 0;
  const normalizedScore = Math.min(10, (qualityScore / totalChecks) * 10);
  return Math.round(normalizedScore * 10) / 10; // Round to 1 decimal
}

/**
 * Calculates Board Credibility points for completing a module
 * Base: 2 points for completion
 * Quality bonus: 0-8 points based on answer quality (max 10 total per module)
 */
export function calculateBoardCredibilityPoints(moduleOutput: ModuleOutput | undefined): number {
  const basePoints = 2; // Base points for completion
  const qualityScore = assessAnswerQuality(moduleOutput);
  const qualityBonus = Math.round((qualityScore / 10) * 8); // 0-8 points based on quality
  
  return basePoints + qualityBonus;
}
