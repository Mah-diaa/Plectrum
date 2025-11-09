import { Chord, Key } from "../types/types";

const cMajorChord: Chord = {
  name: "C",
  root: "C",
  type: "Major",
};

const dMinorChord: Chord = {
  name: "Dm",
  root: "D",
  type: "Minor",
};

const dMajorChord: Chord = {
  name: "D",
  root: "D",
  type: "Major",
};

const eMinorChord: Chord = {
  name: "Em",
  root: "E",
  type: "Minor",
};

const fMajorChord: Chord = {
  name: "F",
  root: "F",
  type: "Major",
};

const gMajorChord: Chord = {
  name: "G",
  root: "G",
  type: "Major",
};

const aMinorChord: Chord = {
  name: "Am",
  root: "A",
  type: "Minor",
};
const bMinorChord: Chord = {
  name: "Bm",
  root: "B",
  type: "Minor",
};

const bDiminishedChord: Chord = {
  name: "Bdim",
  root: "B",
  type: "Diminished",
};
const fSharpDiminishedChord: Chord = {
  name: "F#dim",
  root: "F#",
  type: "Diminished",
};

const cMajor: Key = {
  root: "C",
  type: "Major",
  chords: [
    cMajorChord,
    dMinorChord,
    eMinorChord,
    fMajorChord,
    gMajorChord,
    aMinorChord,
    bDiminishedChord,
  ],
};

const gMajor: Key = {
  root: "G",
  type: "Major",
  chords: [
    gMajorChord,
    aMinorChord,
    bMinorChord,
    cMajorChord,
    dMajorChord,
    eMinorChord,
    fSharpDiminishedChord,
  ],
};

export const keys: Key[] = [cMajor, gMajor];
