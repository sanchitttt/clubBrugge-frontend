/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0d121a',
        'softWhite': '#e6f1ff',
        'blue': '#0572ff',
        'softGrey': '#91a4c2',
        'darkBlue': '#00459d',
        'midGrey': '#2a3548',
        'white': '#fbfdff',
        'darkGrey': '#182233'
      },
      screens: {
        'desktop': '1100px',
        'mobile': '0px'
      },
      'fontFamily': {
        'primary': 'Prompt'
      }
    },
  },
  plugins: [],
}