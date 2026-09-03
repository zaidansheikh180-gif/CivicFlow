/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        civic: {
          bg: '#0B0F17',
          surface: '#131A26',
          card: 'rgba(22, 30, 46, 0.8)',
          primary: '#3B82F6',
          accent: '#06B6D4',
        }
      }
    },
  },
  plugins: [],
}
