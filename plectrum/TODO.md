# TODO / Future Improvements

## Key Generator - Extended Chord Types

**Task:** Update the key generator to include extended chord types (7ths, 9ths, sus chords, etc.) for each key, not just basic triads.

**Current State:**
- Only generates basic triads: Major, Minor, dim
- Pattern: I, ii, iii, IV, V, vi, vii°

**What to Add:**
For each scale degree in a major key, generate all diatonic chord variations:

1. **I (Major)** - Can include: Major, maj7, maj9, 6, 6/9, sus2, sus4
2. **ii (Minor)** - Can include: Minor, m7, m9, m11, m6, m7b5
3. **iii (Minor)** - Can include: Minor, m7, m9, m11, m6
4. **IV (Major)** - Can include: Major, maj7, maj9, 6, 6/9, sus2, sus4
5. **V (Major/Dominant)** - Can include: Major, 7, 9, 13, sus4, 7sus4
6. **vi (Minor)** - Can include: Minor, m7, m9, m11, m6
7. **vii° (Diminished)** - Can include: dim, dim7, m7b5

**Rules:**
- Major chords (I, IV, V) use major extensions: maj7, maj9, 6, 6/9
- Minor chords (ii, iii, vi) use minor extensions: m7, m9, m11, m6
- V (dominant) uses dominant 7th: 7, 9, 13 (not maj7)
- Suspended chords (sus2, sus4) can be on any degree, most common on V, I, IV
- Diminished (vii°) can be dim or dim7

**Files to Update:**
- `src/utils/keyGenerator.ts` - Update `generateChordsForMajorKey()` function

