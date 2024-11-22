/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },

    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              fontSize: "1.2em",
              lineHeight: 1.6,
              marginBottom: "1.5em",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
