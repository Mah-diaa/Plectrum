import { Chord } from "../types/chord";
import { ALL_ROOT_NOTES, RootNote } from "../types/constants";
import { Key } from "../types/key";

export type ProgressionPattern = 
  | 'I-V-vi-IV'
  | 'I-vi-IV-V'
  | 'vi-IV-I-V'
  | 'I-IV-V'
  | 'ii-V-I'
  | 'I-vi-ii-V'
  | 'random';

const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

const BASIC_CHORD_TYPES_BY_DEGREE = [
  'Major',
  'Minor',
  'Minor',
  'Major',
  'Major',
  'Minor',
  'dim',
];

function getNoteAtOffset(root: RootNote, semitones: number): RootNote {
  const rootIndex = ALL_ROOT_NOTES.indexOf(root);
  const targetIndex = (rootIndex + semitones) % 12;
  return ALL_ROOT_NOTES[targetIndex];
}

function getBasicChordForDegree(keyRoot: RootNote, degreeIndex: number): Chord {
  const semitoneOffset = MAJOR_SCALE_INTERVALS[degreeIndex];
  const chordRoot = getNoteAtOffset(keyRoot, semitoneOffset);
  const chordType = BASIC_CHORD_TYPES_BY_DEGREE[degreeIndex];
  
  let chordName: string;
  if (chordType === 'dim') {
    chordName = `${chordRoot}dim`;
  } else if (chordType === 'Minor') {
    chordName = `${chordRoot}m`;
  } else {
    chordName = chordRoot;
  }
  
  return {
    name: chordName,
    root: chordRoot,
    type: chordType,
  };
}

function romanNumeralToIndex(roman: string): number {
  const mapping: Record<string, number> = {
    'I': 0,
    'ii': 1,
    'iii': 2,
    'IV': 3,
    'V': 4,
    'vi': 5,
    'vii': 6,
  };
  return mapping[roman] ?? 0;
}

export function generateProgression(
  key: Key,
  pattern: ProgressionPattern,
  length?: number
): Chord[] {
  if (pattern === 'random') {
    return generateRandomProgression(key, length || 4);
  }

  const degrees = pattern.split('-').map(romanNumeralToIndex);
  const progression: Chord[] = [];
  const targetLength = length || degrees.length;
  
  for (let i = 0; i < targetLength; i++) {
    const degreeIndex = degrees[i % degrees.length];
    const chord = getBasicChordForDegree(key.root as RootNote, degreeIndex);
    progression.push(chord);
  }
  
  return progression;
}

function generateRandomProgression(key: Key, length: number): Chord[] {
  const progression: Chord[] = [];
  const availableChords = [...key.chords];
  const maxLength = Math.min(length, availableChords.length);
  
  for (let i = availableChords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableChords[i], availableChords[j]] = [availableChords[j], availableChords[i]];
  }
  
  for (let i = 0; i < maxLength; i++) {
    progression.push(availableChords[i]);
  }
  
  return progression;
}
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

