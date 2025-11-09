import { Chord } from "../types/chord";
import { ALL_ROOT_NOTES, ChordType, RootNote } from "../types/constants";
import { Key } from "../types/key";

const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

const EXTENDED_CHORD_TYPES_BY_DEGREE: ChordType[][] = [
  ['Major', '5', 'sus2', 'sus4',"maj7", 'maj9','maj11','maj13','6add9', '6'],
  ['Minor', '5', 'sus2', 'sus4', 'm7','7sus4', 'm6', 'm9', 'm11','m13',],
  ['Minor','5', 'sus4','m7','7sus4',],
  ['Major', '5', 'sus2', 'maj9','6add9','maj7b5', '6'],
  ['Major','7', '5', 'sus2', 'sus4','7sus4', '6add9', '6', '9','11', '13'],
  ['Minor','5', 'sus2', 'sus4', 'm9', 'm11','m7#5'],
  ['dim', 'm7b5','m7#5'],
];

function getNoteAtOffset(root: RootNote, semitones: number): RootNote {
  const rootIndex = ALL_ROOT_NOTES.indexOf(root);
  const targetIndex = (rootIndex + semitones) % 12;
  return ALL_ROOT_NOTES[targetIndex];
}
function formatChordName(root: RootNote, type: ChordType): string {
  if (type === 'Major') {
    return root;
  } else if (type === 'Minor') {
    return `${root}m`;
  } else if (type === 'dim') {
    return `${root}dim`;
  } else if (type === 'maj7') {
    return `${root}maj7`;
  } else if (type === 'm7') {
    return `${root}m7`;
  } else if (type === 'maj9') {
    return `${root}maj9`;
  } else if (type === 'm9') {
    return `${root}m9`;
  } else if (type === '9') {
    return `${root}9`;
  } else if (type === '6') {
    return `${root}6`;
  } else if (type === 'm6') {
    return `${root}m6`;
  } else if (type === '6add9') {
    return `${root}6add9`;
  } else if (type === '7') {
    return `${root}7`;
  } else if (type === 'dim7') {
    return `${root}dim7`;
  } else if (type === 'm7b5') {
    return `${root}m7b5`;
  } else if (type === 'sus2') {
    return `${root}sus2`;
  } else if (type === 'sus4') {
    return `${root}sus4`;
  } else if (type === '7sus2') {
    return `${root}7sus2`;
  } else if (type === '7sus4') {
    return `${root}7sus4`;
  } else if (type === '9sus2') {
    return `${root}9sus2`;
  } else if (type === '9sus4') {
    return `${root}9sus4`;
  } else if (type === 'm11') {
    return `${root}m11`;
  } else if (type === 'm13') {
    return `${root}m13`;
  } else if (type === '13') {
    return `${root}13`;
  } else if (type === '5') {
    return `${root}5`;
  } else if (type === 'maj11') {
    return `${root}maj11`;
  } else if (type === 'maj13') {
    return `${root}maj13`;
  } else if (type === 'maj7b5') {
    return `${root}maj7b5`;
  } else if (type === '11') {
    return `${root}11`;
  } else if (type === 'm7#5') {
    return `${root}m7#5`;
  }
  return `${root}${type}`;
}

function generateChordsForMajorKey(root: RootNote): Chord[] {
  const chords: Chord[] = [];
  
  for (let i = 0; i < 7; i++) {
    const semitoneOffset = MAJOR_SCALE_INTERVALS[i];
    const chordRoot = getNoteAtOffset(root, semitoneOffset);
    const extendedTypes = EXTENDED_CHORD_TYPES_BY_DEGREE[i];
    
    for (const chordType of extendedTypes) {
      const chordName = formatChordName(chordRoot, chordType);
      
      chords.push({
        name: chordName,
        root: chordRoot,
        type: chordType,
      });
    }
  }
  
  return chords;
}

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
export function getKeyByRoot(root: RootNote): Key | undefined {
  const allKeys = createAllMajorKeys();
  return allKeys.find(key => key.root === root && key.type === 'Major');
}

