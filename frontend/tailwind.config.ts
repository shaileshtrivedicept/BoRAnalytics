import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bor: {
          bg: "#F0F2F5",
          bg2: "#FFFFFF",
          bg3: "#F7F8FA",
          bd: "#E4E7EE",
          bd2: "#C4CBDA",
          tx: "#1C2B4A",
          tx2: "#536080",
          tx3: "#8F9BB8",
          p1c: "#3A6DB5",
          pos: "#2E7D52",
          neg: "#B03A2E",
          neu: "#A07820",
          c1: "#3A6DB5",
          c2: "#C25B3F",
          c3: "#2E7D52",
          c4: "#A07820",
          c5: "#6B4C9A",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
