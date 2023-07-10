/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "1rem",
      center: true,
    },
    extend: {
      colors: {
        "theme-light": "#FFFEF5",
        "theme-dark": "#1E1E1E",
        "theme-yellow": "#FEDE3C",
        "theme-pink": "#E4647B",
        "theme-pink-light": "#FF92A5",
        "theme-green": "#64BAC3",
      },
      gridTemplateColumns: {
        "dog-grid": "repeat(auto-fill, 250px)",
      },
    },
    fontFamily: {
      roboto: ["var(--font-roboto)"],
      titan: ["var(--font-titan)"],
    },
  },
  plugins: [require("daisyui")],
};
