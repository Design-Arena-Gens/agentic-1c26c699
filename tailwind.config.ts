import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          50: "#f5faff",
          100: "#e6f4ff",
          200: "#c7dfff",
          300: "#a0c3ff",
          400: "#7e9cff",
          500: "#6575ff",
          600: "#564ef6",
          700: "#4d3ada",
          800: "#3b2ea6",
          900: "#1f175f"
        }
      },
      animation: {
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
