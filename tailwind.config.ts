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
          50: 'hsl(240 42.9% 95.9%)',  // #eef2ff
          100: 'hsl(240 45.9% 92.7%)', // #e2e8ff
          200: 'hsl(240 46.2% 84.7%)', // #c7d2fe
          300: 'hsl(240 46.9% 77.8%)', // #a5b4fc
          400: 'hsl(240 46.3% 70.8%)', // #818cf8
          500: 'hsl(240 45.7% 63.9%)', // #6366f1
          600: 'hsl(240 42.7% 55.5%)', // #4f46e5
          700: 'hsl(240 43% 47.5%)',   // #4338ca
          800: 'hsl(240 46.8% 36.9%)', // #3730a3
          900: 'hsl(240 50.4% 24.5%)', // #1e1b4b
          950: 'hsl(240 52.5% 19.8%)', // #15101f
        }
      }
    }
  }
}

export default config
