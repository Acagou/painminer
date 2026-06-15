import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#525252",
        line: "#e5e5e5",
        paper: "#ffffff",
        card: "#ffffff",
        chip: "#f5f5f5",
        accent: "#171717",
        "accent-soft": "#f5f5f5"
      }
    }
  },
  plugins: []
};

export default config;
