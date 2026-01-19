import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useUserProgress } from './hooks/useUserProgress';
import { HomePage } from './components/HomePage';
import { PracticeSession } from './components/PracticeSession';
import { ResultsPage } from './components/ResultsPage';
import { WeakAreasPage } from './components/WeakAreasPage';
import { LearningPanel } from './components/LearningPanel';

function App() {
  const { userProgress, completeSession } = useUserProgress();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ML Tutor
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  🔥 {userProgress.streak} day streak
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="py-6">
          <Routes>
            <Route path="/" element={<HomePage userProgress={userProgress} />} />

            <Route
              path="/practice/:mode/:concept?"
              element={
                <PracticeSession
                  userProgress={userProgress}
                  onSessionComplete={completeSession}
                />
              }
            />

            <Route path="/results" element={<ResultsPage />} />

            <Route path="/weak-areas" element={<WeakAreasPage userProgress={userProgress} />} />

            <Route
              path="/resources/:concept"
              element={
                <div className="max-w-4xl mx-auto p-6">
                  <LearningPanel
                    concept={window.location.pathname.split('/').pop() || ''}
                    userProgress={userProgress}
                    showPracticeButton={true}
                  />
                </div>
              }
            />

            {/* 404 route */}
            <Route
              path="*"
              element={
                <div className="max-w-2xl mx-auto p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    The page you're looking for doesn't exist.
                  </p>
                  <a
                    href="/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Go back home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow-sm mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>ML Tutor - Learn ML, Python, and SQL through practice</p>
            <p className="mt-2">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
