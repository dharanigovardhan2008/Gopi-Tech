/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: "#0B1F3A",
          secondary: "#0F172A",
          card: "#112240",
          teal: "#14B8A6",
          tealLight: "#2DD4BF",
          silver: "#C0C6CF",
        },
      },
      borderRadius: {
        pill: "9999px",
        block: "80px",
        card: "40px",
        section: "60px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(20, 184, 166, 0.15)",
        glowStrong: "0 0 60px rgba(20, 184, 166, 0.25)",
        soft: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
}
