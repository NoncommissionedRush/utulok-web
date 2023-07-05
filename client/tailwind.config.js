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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "theme-light": "#FFFEF5",
        "theme-yellow": "#FEDE3C",
        "theme-pink": "#E4647B",
        "theme-green": "#64BAC3",
      },
      gridTemplateColumns: {
        "dog-grid": "repeat(auto-fill, 250px)",
      },
    },
  },
  plugins: [],
};
