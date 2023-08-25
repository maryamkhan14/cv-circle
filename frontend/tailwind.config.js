/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  variants: { extend: { display: ["group-hover"] } },
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
      backgroundImage: {
        "hero-pattern": "url('./assets/Oreti.png')",
      },
      padding: {
        "lvl-1": "0.5em",
        "lvl-2": "1.5em",
        "lvl-3": "2em",
        "lvl-4": "3em",
      },
    },
  },
  plugins: [],
};
