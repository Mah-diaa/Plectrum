import { Chord } from "../types/chord";
import { ALL_ROOT_NOTES, RootNote } from "../types/constants";
import { Key } from "../types/key";

// Major scale intervals: W-W-H-W-W-W-H (Whole, Half steps)
// Starting from any root, we can calculate the notes in the major scale
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11]; // Semitones from root

// Chord types for each degree in a major key: I, ii, iii, IV, V, vi, vii°
const MAJOR_KEY_CHORD_TYPES: Array<'Major' | 'Minor' | 'dim'> = [
  'Major',    // I
  'Minor',    // ii
  'Minor',    // iii
  'Major',    // IV
  'Major',    // V
  'Minor',    // vi
  'dim'       // vii°
];

/**
 * Get the note at a given semitone offset from a root note
 */
function getNoteAtOffset(root: RootNote, semitones: number): RootNote {
  const rootIndex = ALL_ROOT_NOTES.indexOf(root);
  const targetIndex = (rootIndex + semitones) % 12;
  return ALL_ROOT_NOTES[targetIndex];
}

/**
 * Generate all 7 chords for a given major key
 */
function generateChordsForMajorKey(root: RootNote): Chord[] {
  const chords: Chord[] = [];
  
  // For each degree in the major scale
  for (let i = 0; i < 7; i++) {
    const semitoneOffset = MAJOR_SCALE_INTERVALS[i];
    const chordRoot = getNoteAtOffset(root, semitoneOffset);
    const chordType = MAJOR_KEY_CHORD_TYPES[i];
    
    // Format chord name
    let chordName: string;
    if (chordType === 'dim') {
      chordName = `${chordRoot}dim`;
    } else if (chordType === 'Minor') {
      chordName = `${chordRoot}m`;
    } else {
      chordName = chordRoot;
    }
    
    chords.push({
      name: chordName,
      root: chordRoot,
      type: chordType,
    });
  }
  
  return chords;
}

/**
 * Generate all major keys programmatically
 */
export function createAllMajorKeys(): Key[] {
  const keys: Key[] = [];
  
  for (const root of ALL_ROOT_NOTES) {
    const chords = generateChordsForMajorKey(root);
    keys.push({
      root: root,
      type: 'Major',
      chords: chords,
    });
  }
  
  return keys;
}

/**
 * Get a specific key by root note
 */
export function getKeyByRoot(root: RootNote): Key | undefined {
  const allKeys = createAllMajorKeys();
  return allKeys.find(key => key.root === root && key.type === 'Major');
}

