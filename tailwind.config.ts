import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			secondary: '#2823bc',
  			darkBg: '#0f0f0f'
  		},
  		backgroundImage: {
  			'gradient-cover': 'linear-gradient(90.21deg, rgba(40, 35, 188, 0.7) -5.91%, rgba(15, 15, 15, 0.7) 50%, rgba(15, 15, 15, 1) 111.58%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],

  
};
export default config;