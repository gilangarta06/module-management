/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#1E1E2E",
        card: "#2A2A40",
        primary: "#04D404",
        accent: "#3B82F6"
      }
    }
  },
  plugins: []
}
