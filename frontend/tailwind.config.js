/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: { ...colors },
    fontFamily: {
      headings: ["Work Sans", "sans-serif"],
      plainText: ["Barlow", "sans-serif"],
    },
    extend: {
      padding: {
        "lvl-1": "0.5em",
        "lvl-2": "1em",
        "lvl-3": "1.5em",
        "lvl-4": "2em",
      },
    },
  },
  plugins: [],
};