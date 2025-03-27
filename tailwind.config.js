module.exports = {
  content: [
    "./dist/index.html", // The HTML file you're serving
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          primary: "#B22234",
        },
        blue: {
          primary: "#0047AB",
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
};
