/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pripelu-gold': '#D4AF37', // Dorado 
        'pripelu-pink': '#FFD1DC', // Rosa 
      }
    },
  },
  plugins: [],
}