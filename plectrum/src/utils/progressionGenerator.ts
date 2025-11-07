import { Chord } from "../types/chord";
import { Key } from "../types/key";

/**
 * Common chord progression patterns (using Roman numerals)
 * I = 1st degree, ii = 2nd degree, etc.
 */
export type ProgressionPattern = 
  | 'I-V-vi-IV'      // Very common (C-G-Am-F)
  | 'I-vi-IV-V'      // 50s progression (C-Am-F-G)
  | 'vi-IV-I-V'      // Pop progression (Am-F-C-G)
  | 'I-IV-V'         // Blues/rock (C-F-G)
  | 'ii-V-I'         // Jazz (Dm-G-C)
  | 'I-vi-ii-V'      // Jazz turnaround
  | 'random';        // Random selection

/**
 * Convert Roman numeral to degree index (0-based)
 */
function romanNumeralToIndex(roman: string): number {
  const mapping: Record<string, number> = {
    'I': 0,   // 1st degree
    'ii': 1,  // 2nd degree
    'iii': 2, // 3rd degree
    'IV': 3,  // 4th degree
    'V': 4,   // 5th degree
    'vi': 5,  // 6th degree
    'vii': 6, // 7th degree
  };
  return mapping[roman] ?? 0;
}

/**
 * Generate a chord progression from a pattern
 */
export function generateProgression(
  key: Key,
  pattern: ProgressionPattern,
  length?: number
): Chord[] {
  if (pattern === 'random') {
    return generateRandomProgression(key, length || 4);
  }

  // Parse the pattern (e.g., "I-V-vi-IV")
  const degrees = pattern.split('-').map(romanNumeralToIndex);
  
  // Repeat the pattern to reach desired length, or use as-is
  const progression: Chord[] = [];
  const targetLength = length || degrees.length;
  
  for (let i = 0; i < targetLength; i++) {
    const degreeIndex = degrees[i % degrees.length];
    progression.push(key.chords[degreeIndex]);
  }
  
  return progression;
}

/**
 * Generate a random chord progression within a key
 */
function generateRandomProgression(key: Key, length: number): Chord[] {
  const progression: Chord[] = [];
  
  for (let i = 0; i < length; i++) {
    // Randomly select a chord from the key
    const randomIndex = Math.floor(Math.random() * key.chords.length);
    progression.push(key.chords[randomIndex]);
  }
  
  return progression;
}

/**
 * Get all available progression patterns
 */
export function getAllProgressionPatterns(): ProgressionPattern[] {
  return [
    'I-V-vi-IV',
    'I-vi-IV-V',
    'vi-IV-I-V',
    'I-IV-V',
    'ii-V-I',
    'I-vi-ii-V',
    'random',
  ];
}

