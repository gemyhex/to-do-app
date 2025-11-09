/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,ts,js}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      boxShadow: {
        glass: "0 10px 30px -10px rgba(0,0,0,0.3)",
      },
      backgroundImage: {
        // nice subtle gradient
        "app-gradient":
          "linear-gradient(135deg, rgba(15,23,42,0.03), rgba(99,102,241,0.08))",
        "app-gradient-dark":
          "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.7))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
