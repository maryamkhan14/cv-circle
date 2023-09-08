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
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: ".75em",
              marginBottom: ".75em",
            },
            h1: {
              fontSize: "1.5em",
              fontWeight: "medium",
            },
            h2: {
              marginTop: "1em",
              fontSize: "1.25em",
              fontWeight: "medium",
            },
            "h1, h2": {
              marginBottom: "0.6em",
            },
            h3: {
              fontSize: "1.1em",
              marginBottom: "0.4em",
            },
            hr: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            "ul, ol": {
              marginTop: "0",
              marginBottom: "0",
            },
            "> ul > li > *:first-child": {
              marginTop: "0",
            },
            "> ul > li > *:last-child": {
              marginBottom: "0",
            },
            "> ol > li > *:first-child": {
              marginTop: "0",
            },
            "> ol > li > *:last-child": {
              marginBottom: "0",
            },
          },
        },
      },
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
  plugins: [require("@tailwindcss/typography")],
};
