// Re-export both types so you can import them together
export type { Chord } from './chord';
export type { Key } from './key';

// Export union types and constants
export { ALL_CHORD_TYPES, ALL_ROOT_NOTES, IMPORTANT_CHORD_TYPES } from './constants';
export type { ChordType, RootNote } from './constants';

