# ML Tutor - Interactive ML Concepts Quiz App

A Progressive Web App (PWA) that helps you master Machine Learning, Python, and SQL concepts through interactive quizzes, smart learning resources, and progress tracking.

## Features

### 🎯 **Smart Learning System**
- **100+ Curated Questions** across ML concepts, Python (NumPy, Pandas), and SQL
- **6 Question Types**: Multiple choice, fill-in-blank, explain code, flashcards, spot bugs, predict output
- **Adaptive Practice**: Questions focus on your weak areas (40% struggling, 30% learning, 20% proficient, 10% mastered)

### 📚 **Curated Learning Resources**
- When you get a question wrong, instantly access:
  - 🎥 Video tutorials (3Blue1Brown, StatQuest, etc.)
  - 📖 In-depth articles
  - 🎮 Interactive visualizations
  - 💪 Practice exercises
  - 📚 Official documentation
- **50+ Concepts** with hand-picked, high-quality resources

### 📊 **Progress Tracking**
- **4 Mastery Levels**: Struggling (<40%), Learning (40-70%), Proficient (70-90%), Mastered (>90%)
- **Streak System**: Build daily practice habits
- **Weak Areas Identification**: Automatically tracks concepts needing more practice
- **Detailed Analytics**: Accuracy, concepts covered, time spent

### 🎮 **Practice Modes**
1. **Daily Practice**: 12 mixed questions from all topics
2. **Weak Areas Focus**: Target your struggling concepts
3. **Concept Deep Dive**: 5-10 questions on a specific topic
4. **Quick Review**: 5 flashcards for quick practice

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: Prism.js
- **Routing**: React Router
- **Storage**: localStorage
- **PWA**: Vite PWA Plugin with Workbox

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── questions/       # Question type components
│   ├── shared/          # Reusable UI components
│   ├── HomePage.tsx     # Main landing page
│   ├── PracticeSession.tsx  # Practice session UI
│   ├── LearningPanel.tsx    # Resource recommendations
│   ├── WeakAreasPage.tsx    # Progress tracking
│   └── ResultsPage.tsx      # Session results
├── data/
│   ├── questions.ts     # Question bank
│   └── resources.ts     # Learning resources
├── hooks/
│   ├── useUserProgress.ts   # Progress state management
│   ├── useSession.ts        # Session state management
│   └── useMastery.ts        # Mastery tracking
├── utils/
│   ├── sessionManager.ts    # Session generation logic
│   ├── masteryTracker.ts    # Mastery calculations
│   ├── resourceManager.ts   # Resource management
│   └── storage.ts           # localStorage utilities
├── types/
│   └── index.ts         # TypeScript types
└── App.tsx              # Main app component
```

## Key Concepts

### Mastery Tracking
The app tracks your performance on each concept and categorizes them:
- **Struggling** (<40% accuracy): Red badge, frequent practice
- **Learning** (40-70% accuracy): Yellow badge, regular practice
- **Proficient** (70-90% accuracy): Green badge, light review
- **Mastered** (>90% accuracy + 5+ attempts): Blue badge, rare retention checks

### Smart Resource Curation
Resources are selected based on the C.R.A.P. test:
- **C**urrent: Up-to-date content
- **R**eliable: Trusted sources
- **A**uthoritative: Expert creators
- **P**urpose: Clear learning objectives

Preferred sources: 3Blue1Brown, StatQuest, Real Python, Kaggle Learn, official documentation

### Adaptive Session Generation
Daily practice sessions are composed of:
- 40% from struggling concepts
- 30% from learning concepts
- 20% from proficient concepts
- 10% from mastered concepts (retention check)

## Features in Detail

### Question Types

1. **Multiple Choice**: Select the correct answer from options
2. **Fill in the Blank**: Complete the sentence with the right word
3. **Explain Code**: Describe what a code snippet does
4. **Flashcard**: Self-rate your knowledge (easy/medium/hard)
5. **Spot the Bug**: Identify and explain errors in code
6. **Predict Output**: Determine what code will output

### Learning Flow

1. User answers a question
2. If correct: Brief explanation + move to next
3. If wrong:
   - Show brief explanation
   - Display **Learning Panel** with:
     - Video tutorial
     - In-depth article
     - Interactive visualization
     - Practice exercises
   - Option to practice 3 more similar questions

### Offline Support

The app works offline as a PWA:
- All questions and resources cached
- Progress saved locally
- Service worker handles caching strategy
- Install on mobile/desktop

## Contributing

This is an educational project. Feel free to:
- Add more questions to `src/data/questions.ts`
- Add learning resources to `src/data/resources.ts`
- Improve UI/UX
- Add new features

## License

MIT License - Feel free to use this for learning!

## Acknowledgments

- Question content inspired by ML/Python/SQL best practices
- Resources curated from top educational content creators
- Built with modern React ecosystem

---

**Start learning today!** Run `npm install && npm run dev` to get started.
