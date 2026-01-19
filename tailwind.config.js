/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        struggling: '#ef4444',
        learning: '#f59e0b',
        proficient: '#10b981',
        mastered: '#3b82f6',
      }
    },
  },
  plugins: [],
}
