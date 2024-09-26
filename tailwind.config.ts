import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#2823bc",
        darkBg: "#0f0f0f",
      },
      backgroundImage: {
        "gradient-cover":
          "linear-gradient(90.21deg, rgba(40, 35, 188, 0.5) -5.91%, rgba(15, 15, 15, 0.5) 111.58%)"
      }
    },
  },
  plugins: [],

  
};
export default config;