import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "media",
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '640px',
        'ipad': '768px',
        'desktop': '1280px',
        'ultra': '1980px',  // New 1980px breakpoint
      },
      maxWidth: {
        'content': '1440px',
        'screen-3xl': '1920px',
        'content-ultra': 'calc(1920px - 2 * var(--outer-gutter, 3rem))',  // 1980px+ container
      },
      // CSS variables for dynamic gutters
      variables: {
        '--outer-gutter': '1.5rem',  // 24px base gutter
      },
      gridTemplateColumns: {
        '6-cols': 'repeat(6, minmax(0, 1fr))',
      },
      width: {
        '6-cols': 'calc((100% - 5rem) / 6)',
        '5-cols': 'calc((100% - 5rem) / 5)',
        '11-cols': 'calc((100% - 5rem) / 11)',
      },
      gap: {
        'gutter': '1.5rem',
        'gutter-sm': '1rem',
        'gutter-lg': '2rem',
      },
      spacing: {
        'spacing-1': '0.25rem',
        'spacing-2': '0.5rem',
        'spacing-3': '0.75rem',
        'spacing-4': '1rem',
        'spacing-5': '1.25rem',
        'spacing-6': '1.5rem',
        'spacing-7': '1.75rem',
        'spacing-8': '2rem',
        'spacing-9': '2.25rem',
        'spacing-10': '2.5rem',
      },
      margin: {
        'spacing-9': '2.25rem',
      },
      colors: {
        studio: {
          50: 'hsl(240 52% 95.1%)',
          100: 'hsl(240 52.2% 91%)',
          200: 'hsl(240 50.5% 81%)',
          300: 'hsl(240 50.7% 72.2%)',
          400: 'hsl(240 50.3% 62.9%)',
          500: 'hsl(240 50.4% 54.1%)',
          600: 'hsl(240 50.4% 44.3%)',
          700: 'hsl(240 50.3% 33.1%)',
          800: 'hsl(240 50% 22%)',
          900: 'hsl(240 50% 11%)',
          950: 'hsl(240 48.4% 6.1%)',
        }
      },
      keyframes: {
        'squeegee-pull': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'ink-reveal': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        'layer-separate': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-20px) scale(0.95)', opacity: '0.8' },
        },
      },
      animation: {
        'squeegee-pull': 'squeegee-pull 2s ease-in-out',
        'ink-reveal': 'ink-reveal 2s ease-in-out',
        'layer-separate': 'layer-separate 0.3s ease-out forwards',
      }
    },
    fontFamily: {
      sans: ['var(--cds-typeface)'],
    }
  }
}


export default config
