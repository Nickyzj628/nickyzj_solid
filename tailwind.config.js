/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      transitionDuration: {
        // DEFAULT: "800ms"
      }
    }
  },
  plugins: [],
  darkMode: "class"
}