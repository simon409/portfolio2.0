/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode based on the system's preferred color scheme
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006d77',
          light: '#006d77', // Light mode color
          dark: '#83c5be', // Dark mode color
        },
        bg: {
          light: '#edf6f9', // Light mode background color
          dark: '#0F172A', // Dark mode background color
        },
        secondary: {
          DEFAULT: '#e29578',
          light: '#e29578', // Light mode color
          dark: '#ffddd2', // Dark mode color
        },
        lighter: {
          lightDarker: '#d3e7eb',
          darkLighter: '#1e293b',
          darkLighter2: '#64748b'
        }
      },
    },
  },
  plugins: [],
}

