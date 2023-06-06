/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      swirls: "url('../src/assets/Taieri.png')",
    },
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
    extend: {},
  },
  plugins: [],
};
