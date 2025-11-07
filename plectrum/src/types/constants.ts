// Union types for root notes - defines all possible values
export type RootNote =
  | 'C'
  | 'C#'
  | 'D'
  | 'D#'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#'
  | 'A'
  | 'A#'
  | 'B';

// Union types for chord types - defines all possible values
// Based on scales-chords.com API supported chord types only
export type ChordType =
  // Basic triads
  | 'Major'
  | 'Minor'
  | '5'
  | 'dim'
  | 'aug'
  // Suspended chords
  | 'sus2'
  | 'sus4'
  // Sixth chords
  | '6'
  | 'm6'
  | '6add9'
  // Seventh chords
  | '7'
  | 'maj7'
  | 'm7'
  | 'dim7'
  | '7sus2'
  | '7sus4'
  | 'm7b5'
  | '7b5'
  | '7#5'
  | 'mmaj7'
  // Extended chords (9ths)
  | 'maj9'
  | 'm9'
  | '9'
  | '9b5'
  | '9#5'
  | '9sus2'
  | '9sus4'
  // Extended chords (11ths)
  | 'm11'
  // Extended chords (13ths)
  | 'm13'
  | '13';

// Arrays of all possible values (useful for rendering buttons)
export const ALL_ROOT_NOTES: RootNote[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

// Most important/common chord types (shown by default)
export const IMPORTANT_CHORD_TYPES: ChordType[] = [
  'Major',
  'Minor',
  '7',
  'maj7',
  'm7',
  'sus2',
  'sus4',
];

// List of chord types supported by scales-chords.com API
// Based on: major, minor, augmented, diminished, suspended 2nd, suspended 4th, 5th,
// 6th, minor 6th, 6th/9th, 7th, minor 7th, minor chord with major 7th, augmented 7th,
// diminished 7th, minor 7th flat 5th, 7th sharp 5th, 7th flat 5th, 7th suspended 2nd,
// 7th suspended 4th, 9th, minor 9th, major 9th, 9th sharp 5th, 9th flat 5th,
// 9th suspended 2nd, 9th suspended 4th, minor 11th, 13th, minor 13th, augmented 13th
export const ALL_CHORD_TYPES: ChordType[] = [
  // Basic triads
  'Major',
  'Minor',
  '5',
  'dim',
  'aug',
  // Suspended
  'sus2',
  'sus4',
  // Sixth chords
  '6',
  'm6',
  '6add9',
  // Seventh chords
  '7',
  'maj7',
  'm7',
  'dim7',
  '7sus2',
  '7sus4',
  'm7b5',
  '7b5',
  '7#5',
  'mmaj7',
  // Extended (9ths)
  'maj9',
  'm9',
  '9',
  '9b5',
  '9#5',
  '9sus2',
  '9sus4',
  // Extended (11ths)
  'm11',
  // Extended (13ths)
  'm13',
  '13',
];

