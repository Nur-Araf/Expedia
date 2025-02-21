const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
