/**
 * Calculates defensibility from objective facts
 * The system infers - the user never chooses the outcome
 */

export interface AdvantageInputs {
  sources: string[]; // Checkboxes: proprietary data, network effects, etc.
  timeToReplicate: string; // 0-3, 3-12, 12-36, 36+ months
  founderDependency: string; // Works without, requires judgment, relationships, reputation
  replicationCost: string; // <$50k, $50k-$250k, $250k-$1M, $1M+
}

export type DefensibilityLevel = 'Fragile' | 'Temporary' | 'Defensible' | 'Strategic Moat';

export interface DefensibilityResult {
  level: DefensibilityLevel;
  score: number;
  reasoning: string;
  warnings: string[];
}

/**
 * Converts time to replicate to numeric value (months)
 */
function timeToReplicateValue(time: string): number {
  // Handle both "0-3 months" and "0-3" formats
  const timeKey = time.replace(' months', '').trim();
  const ranges: { [key: string]: number } = {
    '0-3': 1.5,
    '3-12': 7.5,
    '12-36': 24,
    '36+': 48,
  };
  return ranges[timeKey] || 0;
}

/**
 * Converts replication cost to numeric value (dollars)
 */
function replicationCostValue(cost: string): number {
  const ranges: { [key: string]: number } = {
    '<$50k': 25000,
    '$50k-$250k': 150000,
    '$250k-$1M': 625000,
    '$1M+': 2000000,
  };
  return ranges[cost] || 0;
}

/**
 * Converts founder dependency to multiplier
 * Higher dependency = lower defensibility
 */
function founderDependencyMultiplier(dependency: string): number {
  const multipliers: { [key: string]: number } = {
    'Works without founder involvement': 0.1, // Best case
    'Requires founder judgment': 0.5,
    'Requires founder relationships': 0.8,
    'Requires founder reputation': 1.0, // Worst case - decays
  };
  return multipliers[dependency] || 1.0;
}

/**
 * Calculates copyability score and infers defensibility
 */
export function calculateDefensibility(inputs: AdvantageInputs): DefensibilityResult {
  const warnings: string[] = [];
  
  // Check for "Speed only" - automatically fragile
  if (inputs.sources.length === 1 && inputs.sources[0] === 'Speed / execution only') {
    return {
      level: 'Fragile',
      score: 0,
      reasoning: 'Speed-only advantages are cosmetic differentiation. They do not survive replication pressure.',
      warnings: ['Speed-only advantages are automatically flagged as fragile.'],
    };
  }
  
  // Calculate base score
  const timeValue = timeToReplicateValue(inputs.timeToReplicate);
  const costValue = replicationCostValue(inputs.replicationCost);
  const dependencyMultiplier = founderDependencyMultiplier(inputs.founderDependency);
  
  // Copyability Score = (Time to Replicate × Replication Cost) ÷ Founder Dependency
  // Higher score = more defensible
  const rawScore = (timeValue * costValue) / (dependencyMultiplier * 1000);
  
  // Determine level based on score
  let level: DefensibilityLevel;
  let reasoning: string;
  
  if (rawScore < 10) {
    level = 'Fragile';
    reasoning = 'Cosmetic differentiation. This can be copied quickly and cheaply. No structural moat exists.';
  } else if (rawScore < 50) {
    level = 'Temporary';
    reasoning = 'Must be monetized fast. This advantage has a limited window before replication becomes feasible.';
  } else if (rawScore < 200) {
    level = 'Defensible';
    reasoning = 'Invest & scale. This advantage creates meaningful replication barriers. Protect and leverage it.';
  } else {
    level = 'Strategic Moat';
    reasoning = 'Protect at all costs. This is a structural advantage that creates significant competitive barriers.';
  }
  
  // Additional warnings
  if (inputs.sources.length === 0) {
    warnings.push('No advantage sources selected. This may indicate no real advantage exists.');
  }
  
  if (inputs.timeToReplicate === '0-3') {
    warnings.push('Replication time is very short. This advantage is highly vulnerable.');
  }
  
  if (inputs.founderDependency.includes('reputation') || inputs.founderDependency.includes('relationships')) {
    warnings.push('Founder-dependent advantages decay unless converted to structural moats.');
  }
  
  if (inputs.replicationCost === '<$50k') {
    warnings.push('Low replication cost makes this advantage vulnerable to well-funded competitors.');
  }
  
  return {
    level,
    score: Math.round(rawScore * 10) / 10,
    reasoning,
    warnings,
  };
}
