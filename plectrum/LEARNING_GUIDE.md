# Learning Guide: What We Built Today

## 📚 Overview

Today we built a guitar chord visualizer app. Here's what each piece does and why it matters.

---

## 1. TypeScript Union Types (`src/types/constants.ts`)

### What it is:
```typescript
export type RootNote = 'C' | 'C#' | 'D' | ... | 'B';
```

### Why it's useful:
- **Type Safety**: TypeScript will error if you try to use an invalid note (like 'Z')
- **Autocomplete**: Your editor knows exactly what values are allowed
- **Self-documenting**: The type tells you what's valid without reading docs

### Key concept:
**Union types** = "This value can be ONE of these specific options"
- Like an enum, but simpler
- `'C' | 'D'` means "either 'C' OR 'D', nothing else"

### The arrays:
```typescript
export const ALL_ROOT_NOTES: RootNote[] = ['C', 'C#', ...];
```
- Arrays are useful for **looping** (like rendering buttons)
- The type `RootNote[]` means "array of RootNote values"
- TypeScript ensures you can't put invalid values in the array

---

## 2. Programmatic Chord Generation (`src/types/chord.ts`)

### The function:
```typescript
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
```

### What it does:
1. **Nested loops**: For each root (12), loop through each type (12)
2. **Creates objects**: Builds a `Chord` object for each combination
3. **Template literals**: `` `${root}${type}` `` combines strings (e.g., "C" + "Major" = "CMajor")

### Why this is powerful:
- **144 chords** generated automatically (12 × 12)
- **No manual work**: Add a new root/type, get all combinations
- **DRY principle**: Don't Repeat Yourself - one pattern, many results

### The export:
```typescript
export const ALL_CHORDS = createAllChords();
```
- Runs **once** when the module loads
- Stored in memory, ready to use
- Other files can import and use it

---

## 3. React State (`app/index.tsx`)

### useState Hook:
```typescript
const [selectedRoot, setSelectedRoot] = useState<RootNote>('C');
```

### Breaking it down:
- `selectedRoot` = **current value** (starts as 'C')
- `setSelectedRoot` = **function to change it**
- `useState<RootNote>('C')` = TypeScript type + initial value

### Why state matters:
- **Without state**: Can't change anything (static UI)
- **With state**: User interactions update the UI
- **Re-renders**: When state changes, React automatically updates the screen

### Example flow:
1. User taps "D" button
2. `setSelectedRoot('D')` is called
3. React sees state changed
4. Component re-renders
5. UI shows "D" selected

---

## 4. FlatList Component

### What it is:
```typescript
<FlatList
  data={ALL_ROOT_NOTES}
  renderItem={renderRootButton}
  keyExtractor={(item) => item}
  horizontal
  snapToInterval={itemWidth}
/>
```

### Key props:
- `data`: Array to loop through
- `renderItem`: Function that creates each item
- `keyExtractor`: Unique identifier (React needs this)
- `horizontal`: Scroll left/right instead of up/down
- `snapToInterval`: Snap to positions (for pagination)

### Why FlatList vs map()?
- **Performance**: Only renders visible items (virtualization)
- **Built-in scrolling**: Handles touch gestures
- **Optimized**: React Native's way to handle lists

---

## 5. WebView Integration

### What it does:
```typescript
<WebView source={{ html: chordHTML }} />
```

### Why we need it:
- The chord API uses **JavaScript** (needs a browser)
- React Native **isn't a browser** (can't run that JS)
- WebView = **mini browser** inside your app

### The HTML generation:
```typescript
const chordHTML = generateChordHTML(chordNameForAPI);
```
- Creates HTML string dynamically
- Includes the API script
- Injects the chord name as a parameter

---

## 6. CSS Blend Modes (`src/utils/chordFormatter.ts`)

### The magic:
```css
filter: invert(1) brightness(1.1);
mix-blend-mode: screen;
```

### How it works:

**Step 1: Invert**
- `invert(1)` flips all colors
- Black → White, White → Black

**Step 2: Screen Blend Mode**
- `screen` mode: `result = 1 - (1 - image) × (1 - background)`
- White + Dark = Light (stays visible)
- Black + Dark = Dark (blends away)

### Why this works:
- Original: Black lines on white background
- After invert: White lines on black background
- After screen: White lines visible on dark theme

### Key learning:
**CSS filters and blend modes** can transform images without editing pixels!

---

## 7. Template Literals & String Interpolation

### Example:
```typescript
name: `${root}${type}`  // "C" + "Major" = "CMajor"
```

### What `${}` does:
- **Interpolates** (inserts) variables into strings
- Only works with **backticks** `` ` ` ``, not quotes
- Can do expressions: `` `${root}-${type.toLowerCase()}` ``

### Why it's better:
```typescript
// Old way (concatenation):
name: root + type

// New way (template literals):
name: `${root}${type}`
```
- More readable
- Can include expressions
- Cleaner syntax

---

## 8. Array Methods

### .find():
```typescript
const selectedChord = ALL_CHORDS.find(
  (chord) => chord.root === selectedRoot && chord.type === selectedType
);
```

### What it does:
- **Searches** the array
- Returns **first match** (or `undefined` if none)
- Uses a **predicate function** (returns true/false)

### The predicate:
```typescript
(chord) => chord.root === selectedRoot && chord.type === selectedType
```
- Arrow function syntax
- Checks if both conditions are true (`&&`)
- Returns the matching chord object

---

## 9. Conditional Rendering

### Example:
```typescript
{selectedChord ? (
  <WebView source={{ html: chordHTML }} />
) : (
  <Text>Select a chord</Text>
)}
```

### What it does:
- **Ternary operator**: `condition ? ifTrue : ifFalse`
- Shows WebView if chord exists
- Shows message if no chord selected

### Why it's useful:
- **Prevents errors**: Don't try to render nothing
- **Better UX**: Shows helpful message
- **React pattern**: Common way to handle optional content

---

## 10. TypeScript Type Annotations

### Examples throughout:
```typescript
const chords: Chord[] = [];           // Array of Chord objects
const [selectedRoot, setSelectedRoot] = useState<RootNote>('C');  // RootNote type
function formatChordForAPI(root: string, type: string): string {  // Returns string
```

### Why types matter:
- **Catch errors early**: Before code runs
- **Better autocomplete**: Editor knows what's available
- **Self-documenting**: Types tell you what to expect
- **Refactoring safety**: Change a type, see all places that break

---

## 🎯 Key Concepts You Learned

1. **Union Types**: Restricting values to specific options
2. **Nested Loops**: Generating combinations programmatically
3. **React State**: Managing changing data in UI
4. **FlatList**: Efficient list rendering in React Native
5. **WebView**: Embedding web content in native apps
6. **CSS Blend Modes**: Transforming images with CSS
7. **Template Literals**: String interpolation
8. **Array Methods**: `.find()`, `.map()`, etc.
9. **Conditional Rendering**: Showing different UI based on state
10. **TypeScript Types**: Type safety and better DX

---

## 🚀 What You Can Experiment With

1. **Add more chord types** - Just add to `ALL_CHORD_TYPES` array
2. **Change colors** - Modify the Tailwind config
3. **Add features** - Favorites, history, etc.
4. **Try different blend modes** - See what looks cool
5. **Optimize performance** - Use `useMemo` for expensive calculations

---

## 💡 Questions to Think About

1. Why did we use `const` for arrays but can still push to them?
2. What happens if you remove `keyExtractor` from FlatList?
3. Could we use `.map()` instead of `.find()`? When would you use each?
4. What's the difference between `let`, `const`, and `var`?
5. Why do we need `!important` in some CSS rules?

---

Great work today! You built a fully functional app with TypeScript, React Native, and some clever CSS tricks! 🎸

