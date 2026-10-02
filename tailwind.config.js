/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        rosegold: {
          50: '#FDF7F5',
          100: '#FAF0ED',
          200: '#F5DDD6',
          300: '#E8BDB2',
          400: '#D99888',
          500: '#C87D6B',
          600: '#B56553',
          700: '#974E3F',
          800: '#7E4236',
          900: '#693A30',
        },
        blush: {
          50: '#FFFBFB',
          100: '#FFF4F3',
          200: '#FEE7E5',
          300: '#FDD2CD',
          400: '#F9A59B',
          500: '#F17D70',
        },
        branddark: '#2A1F1E',
      },
    },
  },
  plugins: [],
}
