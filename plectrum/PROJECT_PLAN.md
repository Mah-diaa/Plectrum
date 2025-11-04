# Guitar Chord & Key App - Simplified V1 Plan

## 🎯 Project Overview

A mobile app for guitar players to quickly see what chords belong in a major key and how to play them.

**V1 Features (Keep It Simple!):**
- Show list of major keys (C, D, E, F, G, A, B)
- User selects a key → See the 7 basic chords in that key
- User taps a chord → See how to play it (diagram/image)

**Tech Stack:**
- React Native (via Expo) for mobile development
- TypeScript for type safety
- External API for chord diagrams (if available, otherwise we'll use local data)

---

## 📅 Simplified Timeline (4 Weeks - Relaxed Pace)

### Week 1: Setup & Data Structure
**Goal:** Get the app running and define your data structure

**Tasks:**
- [ ] Set up Expo project with TypeScript
- [ ] Get app running on your phone
- [ ] Create TypeScript types for: Key, Chord, and what data you need
- [ ] Create simple local data for 2 keys (C Major and G Major) to start building

**Deliverable:** App runs on phone, you have types defined, and hardcoded data for C Major

**Questions to Answer:**
- What does a "Key" need? (name: "C Major", chords: [...])
- What does a "Chord" need? (name: "C", type: "Major", diagram/image?)
- What are the 7 chords in C Major? (C, Dm, Em, F, G, Am, Bdim)

---

### Week 2: Key Selection & Chord List
**Goal:** User can pick a key and see its chords

**Tasks:**
- [ ] Create screen showing list of major keys
- [ ] When user taps a key, show the 7 chords in that key
- [ ] Style it to look nice on mobile
- [ ] Add navigation between screens

**Deliverable:** User can browse keys → select one → see chord list

**What You'll Learn:**
- React Native Lists (FlatList)
- Navigation (React Navigation)
- Component state (useState)
- Basic styling

---

### Week 3: Chord Diagrams
**Goal:** Show how to play each chord

**Tasks:**
- [ ] When user taps a chord, navigate to chord detail screen
- [ ] Display chord diagram/image
- [ ] Handle if API doesn't work (fallback to text/placeholder)
- [ ] Polish the UI

**Deliverable:** User can tap a chord → see diagram → go back

**What You'll Learn:**
- Image handling in React Native
- API integration (or handling when API doesn't work)
- Error handling

---

### Week 4: Complete All Keys & Polish
**Goal:** Finish the app with all 7 major keys

**Tasks:**
- [ ] Add remaining keys (D, E, F, A, B) to your data
- [ ] Test the full flow on your phone
- [ ] Fix any bugs
- [ ] Polish styling and UX
- [ ] Write README

**Deliverable:** Complete working app with all major keys!

---

## 🏗️ Simple Project Structure

```
plectrum/
├── src/
│   ├── screens/
│   │   ├── KeysScreen.tsx      # List of keys
│   │   ├── ChordsScreen.tsx    # Chords in selected key
│   │   └── ChordDetailScreen.tsx  # Single chord diagram
│   ├── data/
│   │   └── keys.ts             # Your chord data (start simple!)
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── components/             # (maybe a Button component later)
├── App.tsx
├── package.json
└── tsconfig.json
```

**Start small!** You can add folders as you need them.

---

## 📊 Simplified Success Metrics

By the end of the month:
- ✅ App runs on your phone
- ✅ Can see list of 7 major keys
- ✅ Can tap a key → see its 7 chords
- ✅ Can tap a chord → see diagram/image
- ✅ Feel more confident with TypeScript and React Native

**That's it!** Keep it achievable.

---

## 🎯 Your First Steps (Do This Now!)

1. **Set up Expo project:**
   ```bash
   npx create-expo-app@latest . --template blank-typescript
   ```

2. **Create a simple data file:**
   Think about: What data do you need for C Major? 
   - Key name: "C Major"
   - Chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"]
   - For each chord: name and eventually a diagram URL

3. **Create TypeScript types:**
   ```typescript
   // What does a Key look like?
   // What does a Chord look like?
   ```

---

## 💡 Key Simplifications Made

**What we cut:**
- ❌ Minor keys (v2 feature)
- ❌ Scales display (v2 feature)
- ❌ Advanced chord types (7ths, 9ths, etc.)
- ❌ Jam mode / AI features
- ❌ Complex API integration (start with local data!)

**What we kept:**
- ✅ Simple, achievable goals
- ✅ Focus on learning TypeScript + React Native
- ✅ One clear user flow
- ✅ Real, working app by the end

---

## 🎓 Learning-Focused Approach

**Remember:**
- Start with hardcoded data - don't worry about API yet
- Build the UI first, add API later
- One screen at a time
- Test on your phone early and often!

**When you get stuck:**
- Break the problem into smaller pieces
- Try it yourself first
- Ask specific questions: "I tried X but Y happened"
- Google: "React Native [your question]"

---

## ⚠️ Important Reminders

1. **Progress > Perfection** - Get it working first, make it pretty later
2. **One thing at a time** - Finish Week 1 before worrying about Week 2
3. **It's okay to simplify more** - If something feels too hard, make it simpler
4. **You're learning** - It's normal to feel stuck. That's when you learn!

---

## 📝 Questions to Answer Before You Start Coding

**This week, figure out:**

1. **Data structure:** 
   - What exactly is in C Major? (List the 7 chords)
   - For now, do you need chord diagrams or can you start with just chord names?

2. **User flow:**
   - Sketch it: Keys List → Chord List → Chord Detail
   - Does this make sense? What would you change?

3. **Setup:**
   - Do you have Expo CLI installed?
   - Do you have the Expo Go app on your phone?

---

**Ready? Let's start simple and build something that works!** 🚀
