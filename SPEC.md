# English Zombie Game - Voice Controlled Learning Game

## Project Overview

**Project Name:** English Zombie Game (英语僵尸游戏)
**Project Type:** Educational Web Game
**Core Functionality:** A voice-controlled Plants vs. Zombies-style game where children defeat zombies by correctly pronouncing English words. Each zombie carries a word, and correct pronunciation launches a projectile to attack.
**Target Users:** Children aged 4-10 learning English as a second language

---

## UI/UX Specification

### Layout Structure

**Main Screens:**
1. **Start Screen** - Welcome screen with game title and start button
2. **Level Select Screen** - Choose difficulty level (Easy/Medium/Hard)
3. **Game Screen** - Main gameplay area
4. **Game Over Screen** - Win/Lose status with replay option
5. **Progress Screen** - View learning progress and achievements

**Game Screen Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Progress Bar]  [Score: 0]  [Lives: 3]  [Level]  │  <- Header (60px)
├─────────────────────────────────────────────────────┤
│                                                     │
│   🧟 word: APPLE     🧟 word: CAT     🧟 word: DOG  │  <- Zombie Row
│                                                     │
│   🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀  │  <- Projectile Row
│                                                     │
│   [Launcher Station - 5 slots]                     │  <- Player Area (150px)
│                                                     │
├─────────────────────────────────────────────────────┤
│  [🎤 Microphone: ON] [Current Word: APPLE]         │  <- Voice Control Bar (80px)
│  "Say the word shown on the zombie!"               │
└─────────────────────────────────────────────────────┘
```

**Responsive Breakpoints:**
- Desktop: 1200px+ (full layout)
- Tablet: 768px-1199px (scaled down)
- Mobile: 320px-767px (simplified layout, landscape recommended)

### Visual Design

**Color Palette:**
- Primary Background: #87CEEB (Sky Blue)
- Grass/Ground: #228B22 (Forest Green)
- Zombie Green: #6B8E23 (Olive Drab)
- Projectile Gold: #FFD700 (Gold)
- UI Accent: #FF6B6B (Coral Red)
- Text Primary: #FFFFFF (White)
- Text Dark: #2D3436 (Dark Gray)
- Success: #00B894 (Mint Green)
- Error: #E74C3C (Red)
- Panel Background: rgba(0, 0, 0, 0.7)

**Typography:**
- Game Title: 'Fredoka One', cursive - 72px
- Headings: 'Fredoka One', cursive - 36px
- Body Text: 'Nunito', sans-serif - 20px
- Word Display: 'Fredoka One', cursive - 28px
- Score/UI: 'Nunito', sans-serif - 18px bold

**Spacing System:**
- Base unit: 8px
- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 32px

**Visual Effects:**
- Button hover: scale(1.05) with 0.2s ease
- Projectile launch: translateX animation 0.5s ease-out
- Zombie hit: shake animation 0.3s
- Zombie death: fade out + scale down 0.5s
- Correct pronunciation: green glow pulse
- Wrong pronunciation: red flash
- Background: animated clouds floating

### Components

**1. Zombie Component**
- Size: 80x100px
- Shows: Zombie image + English word in speech bubble
- States: walking, hit, dying
- Movement: Walks from right to left at variable speed
- Hit effect: Red flash, shake

**2. Projectile Component**
- Size: 40x40px (apple/ball)
- Animation: Flies horizontally toward zombie
- On hit: Splatter effect

**3. Launcher Station**
- 5 horizontal slots
- Visual: Flower/rocket launcher
- States: ready, loading, firing, cooldown

**4. Voice Control Panel**
- Microphone button with animated waves when active
- Current target word display
- Pronunciation feedback (visual: checkmark/X)
- Voice prompt button to hear the word

**5. Progress Bar**
- Shows current level progress
- Animated fill

**6. Score Display**
- Current score with animated increment
- Combo multiplier indicator

---

## Functionality Specification

### Core Features

**1. Voice Recognition (Web Speech API)**
- Continuous listening mode
- Real-time speech-to-text
- Language: English (en-US)
- Visual feedback while listening (pulsing microphone)
- Handles background noise gracefully

**2. Text-to-Speech (TTS)**
- Uses GLM API for Chinese prompts
- Uses MiniMax API for English word pronunciation
- Voice prompt: "Say: [WORD]"
- Success: "Great job!"
- Failure: "Try again!"

**3. Pronunciation Evaluation**
- Uses AI (MiniMax) to evaluate pronunciation
- Sends audio if possible, otherwise evaluates text match
- Confidence score threshold: 70%
- Supports similar pronunciations (e.g., "æpl" for "apple")

**4. Game Mechanics**
- Zombies spawn from right side, walk left
- Each zombie has one word
- Player must speak the word correctly to attack
- Correct pronunciation = launch projectile
- Projectile hits zombie = zombie defeated
- If zombie reaches left side = lose life
- 3 lives total
- Score: base 10 points + combo bonus

**5. Learning Path System**
- Word database with difficulty levels:
  - Easy (Level 1-5): apple, cat, dog, sun, moon, tree, bird, fish, book, hand
  - Medium (Level 6-10): happy, sad, eat, drink, run, jump, big, small, red, blue
  - Hard (Level 11-15): beautiful, wonderful, delicious, exciting, wonderful
- Progress tracking (localStorage)
- Adaptive difficulty based on performance
- Suggested next words based on mastery

**6. Level System**
- Level 1-3: 1 zombie at a time, slow speed
- Level 4-6: 2 zombies, medium speed
- Level 7-10: 3 zombies, faster speed
- Level 11+: Increasing difficulty

### User Interactions and Flows

**Start Flow:**
1. User sees welcome screen with animated title
2. Click "Start Game" button
3. Show level selection
4. Enter game

**Game Flow:**
1. Zombie appears with word
2. TTS voice prompt: "Say: [WORD]"
3. User speaks into microphone
4. System evaluates pronunciation
5. If correct: projectile launches, zombie defeated, score increases
6. If incorrect: try again (max 3 attempts per zombie)
7. Repeat until all zombies defeated or lives lost

**Voice Control Flow:**
1. Microphone automatically active
2. Visual indicator shows listening state
3. Speech recognized -> evaluate -> feedback
4. 2-second delay before next listening cycle

### Data Handling

**Local Storage:**
- Current level
- High score
- Words mastered (with accuracy percentage)
- Total games played
- Achievements

**API Calls:**
- TTS: GLM API for prompts, MiniMax for English
- Pronunciation: MiniMax API

### Edge Cases

- Microphone permission denied: Show instructions to enable
- No speech detected after 5 seconds: Prompt again
- Multiple words spoken: Evaluate first clear word
- API failure: Fallback to basic text matching
- Browser incompatibility: Show supported browsers message

---

## Technical Architecture

### Project Structure
```
english-zombie-game/
├── src/
│   ├── components/
│   │   ├── Game/
│   │   │   ├── GameCanvas.tsx
│   │   │   ├── Zombie.tsx
│   │   │   ├── Projectile.tsx
│   │   │   ├── Launcher.tsx
│   │   │   └── VoiceControl.tsx
│   │   ├── UI/
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── ScoreDisplay.tsx
│   │   └── Screens/
│   │       ├── StartScreen.tsx
│   │       ├── LevelSelect.tsx
│   │       ├── GameOverScreen.tsx
│   │       └── ProgressScreen.tsx
│   ├── hooks/
│   │   ├── useVoiceRecognition.ts
│   │   ├── useTTS.ts
│   │   └── useGameLoop.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── glmApi.ts
│   │   │   └── miniMaxApi.ts
│   │   └── gameEngine.ts
│   ├── data/
│   │   └── words.ts
│   ├── types/
│   │   └── game.ts
│   ├── stores/
│   │   └── gameStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── assets/
│       └── images/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── SPEC.md
```

### Key Dependencies
- React 18+
- TypeScript
- Vite
- Zustand (state management)
- @react-spring/animations
- Web Speech API (native)

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Start screen displays with animated title and start button
- [ ] Game screen shows header with progress, score, lives, level
- [ ] Zombies animate smoothly from right to left
- [ ] Projectiles fly from launcher to zombie
- [ ] Voice control panel shows microphone status
- [ ] Correct pronunciation shows green checkmark
- [ ] Wrong pronunciation shows red X with retry prompt
- [ ] Game over screen shows win/lose status

### Functional Checkpoints
- [ ] Microphone permission requested on game start
- [ ] Voice recognition captures speech accurately
- [ ] TTS plays word pronunciation and prompts
- [ ] Pronunciation evaluation works via API
- [ ] Projectile launches on correct pronunciation
- [ ] Zombie defeated on projectile hit
- [ ] Score increments correctly
- [ ] Lives decrease when zombie reaches left side
- [ ] Game ends when lives = 0
- [ ] Progress saved to localStorage
- [ ] Next level unlocks after completing current level

### Performance Checkpoints
- [ ] Game runs at 60fps
- [ ] Voice recognition responds within 2 seconds
- [ ] No memory leaks during extended play
- [ ] Works on Chrome, Firefox, Safari (latest versions)
