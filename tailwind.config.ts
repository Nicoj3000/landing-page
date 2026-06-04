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
			secondary: '#3f5cff',
			darkBg: '#070b14'
  		},
  		backgroundImage: {
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			spotlight: {
  				'0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
  				'100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' }
  			},
  			'fade-up': {
  				'0%': { opacity: '0', transform: 'translateY(24px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-10px)' }
  			}
  		},
  		animation: {
  			spotlight: 'spotlight 2s ease .75s 1 forwards',
  			'fade-up': 'fade-up .6s ease forwards',
  			float: 'float 6s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],

  
};
export default config;