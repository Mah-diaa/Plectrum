import { ALL_CHORD_TYPES, ALL_ROOT_NOTES } from "./constants";

export type Chord = {
  name: string;
  root: string;
  type: string;
};

export function createAllChords(): Chord[] {
  const chords: Chord[] = [];
  for (const root of ALL_ROOT_NOTES) {
    for (const type of ALL_CHORD_TYPES) {
      let chord: Chord = {
        name: `${root}${type}`,
        root: root,
        type: type,
      };
      chords.push(chord);
    }
  }
  return chords;
}

export const ALL_CHORDS = createAllChords();
