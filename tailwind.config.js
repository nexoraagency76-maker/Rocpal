/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#161e2e',
          900: '#0f172a',
          950: '#020617',
        },
        wood: {
          300: '#d9a05b',
          400: '#c68436',
          500: '#a66a26',
          600: '#8c551c',
          700: '#734415',
          900: '#3d2008',
        }
      }
    },
  },
  plugins: [],
}
