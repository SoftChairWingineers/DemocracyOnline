module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          primary: "#B22234",
        },
        blue: {
          primary: "#3C3B6E",
        },
        neutral: {
          light: "#F5F5F5",
          dark: "#1A1A1A",
        },
        accent: {
          gold: "#FFD700",
        },
        gray: {
          secondary: "#888888",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
