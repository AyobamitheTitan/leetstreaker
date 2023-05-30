/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: { content: ["./src/**/*.{html,ts}"], enable: true },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("tailwindcss"), require("autoprefixer")],
};