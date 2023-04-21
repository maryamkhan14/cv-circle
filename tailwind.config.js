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
      headings: ["Roboto Condensed", "sans-serif"],
      plainText: ["Work Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
