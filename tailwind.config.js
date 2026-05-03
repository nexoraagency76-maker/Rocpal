/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#fcf6e3',
          200: '#f7ebc2',
          300: '#f0dba0',
          400: '#e8c97d',
          500: '#dca43b',
          600: '#c28b2a',
          700: '#9e6d23',
        },
        zinc: {
          850: '#1a1918',
          900: '#141414',
          950: '#0a0a0a',
        }
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.4)',
        'floating': '0 20px 40px -15px rgba(220, 164, 59, 0.25)',
        'glow': '0 0 20px rgba(220, 164, 59, 0.4)',
      }
    },
  },
  plugins: [],
}
