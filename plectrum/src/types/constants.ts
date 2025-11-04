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
export type ChordType =
  | 'Major'
  | 'Minor'
  | '7'
  | '5'
  | 'dim'
  | 'dim7'
  | 'aug'
  | 'sus2'
  | 'sus4'
  | 'maj7'
  | 'm7'
  | '7sus4';

// Arrays of all possible values (useful for rendering buttons)
export const ALL_ROOT_NOTES: RootNote[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

export const ALL_CHORD_TYPES: ChordType[] = [
  'Major', 'Minor', '7', '5', 'dim', 'dim7', 'aug', 'sus2', 'sus4', 'maj7', 'm7', '7sus4'
];

