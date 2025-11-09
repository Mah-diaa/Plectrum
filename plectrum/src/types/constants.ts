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

export type ChordType =
  | 'Major'
  | 'Minor'
  | '5'
  | 'dim'
  | 'aug'
  | 'sus2'
  | 'sus4'
  | '6'
  | 'm6'
  | '6add9'
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
  | 'maj9'
  | 'm9'
  | '9'
  | '9b5'
  | '9#5'
  | '9sus2'
  | '9sus4'
  | 'm11'
  | 'maj11'
  | '11'
  | 'm13'
  | '13'
  | 'maj13'
  | 'maj7b5'
  | 'm7#5';

export const ALL_ROOT_NOTES: RootNote[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

export const IMPORTANT_CHORD_TYPES: ChordType[] = [
  'Major',
  'Minor',
  '7',
  'maj7',
  'm7',
  'sus2',
  'sus4',
];

export const ALL_CHORD_TYPES: ChordType[] = [
  'Major',
  'Minor',
  '5',
  'dim',
  'aug',
  'sus2',
  'sus4',
  '6',
  'm6',
  '6add9',
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
  'maj9',
  'm9',
  '9',
  '9b5',
  '9#5',
  '9sus2',
  '9sus4',
  'm11',
  'maj11',
  '11',
  'm13',
  '13',
  'maj13',
  'maj7b5',
  'm7#5',
];

