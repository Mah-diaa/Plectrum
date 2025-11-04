// Re-export both types so you can import them together
export type { Chord } from './chord';
export type { Key } from './key';

// Export union types and constants
export type { RootNote, ChordType } from './constants';
export { ALL_ROOT_NOTES, ALL_CHORD_TYPES } from './constants';

