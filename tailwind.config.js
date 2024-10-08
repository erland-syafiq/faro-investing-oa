/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f95738',
        'secondary': '#ee964b',
        'base': '#faf0ca'
      }
    },
  },
  plugins: [],
}