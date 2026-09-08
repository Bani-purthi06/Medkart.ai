import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172121",
        mint: "#f97316",
        coral: "#F15B5B",
        amber: "#E9A23B",
        sky: "#2378C8",
      },
      boxShadow: {
        soft: "0 14px 38px rgba(23, 33, 33, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
