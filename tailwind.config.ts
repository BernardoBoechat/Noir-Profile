import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#06070b", neon: "#8b5cf6", cyan: "#22d3ee" },
      boxShadow: { glow: "0 0 50px rgba(139,92,246,.2)" },
    },
  },
  plugins: [],
};
export default config;
