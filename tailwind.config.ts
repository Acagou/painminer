import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f5f7fa",
        muted: "#9ca7b3",
        line: "#2a323c",
        paper: "#0b0f14",
        card: "#111820",
        chip: "#1b2530",
        accent: "#ff4500",
        "accent-soft": "#2a170f"
      }
    }
  },
  plugins: []
};

export default config;
