/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "serif"],
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        "mplus-code": ['"M PLUS 1 Code"', "monospace"],
      },
      fontWeight: {
        light: 300,
        medium: 600,
        bold: 800,
      },
    },
  },
  plugins: [],
};
