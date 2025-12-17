import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          50: 'hsl(240 52% 95.1%)',
          100: 'hsl(240 47.8% 91%)',
          200: 'hsl(240 48.5% 81%)',
          300: 'hsl(240 49.3% 72.2%)',
          400: 'hsl(240 49.2% 62.2%)',
          500: 'hsl(240 49.2% 52.9%)',
          600: 'hsl(240 49.1% 43.1%)', // base
          700: 'hsl(240 48.8% 32.2%)',
          800: 'hsl(240 48.7% 22.2%)',
          900: 'hsl(240 50% 11%)',
          950: 'hsl(240 52% 4.9%)',
        }
      }
    }
  }
}

export default config
