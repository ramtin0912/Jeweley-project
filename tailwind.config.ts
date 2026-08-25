import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './server/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
        serif: ['Amiri', 'Vazirmatn', 'serif'],
        engraved: ['Cinzel', 'Vazirmatn', 'serif']
      },
      colors: {
        // Dark "atelier" ground for the public storefront.
        ink: {
          950: '#0B0908',
          900: '#12100D',
          800: '#1A1612',
          700: '#242019',
          600: '#2F2920',
          500: '#3D352A'
        },
        // Warm ivory foreground.
        ivory: {
          DEFAULT: '#F3ECDD',
          200: '#EAE0CB',
          300: '#D8CBAF',
          400: '#B7A98C',
          500: '#998C70'
        },
        // Antique gold accent.
        gold: {
          DEFAULT: '#B08D57',
          300: '#E4C793',
          400: '#CBA86B',
          500: '#99753F',
          600: '#7A5A2E'
        },
        // Legacy light accent — kept for the admin panel.
        accent: {
          DEFAULT: '#a87e2f',
          dark: '#8a6723'
        }
      }
    }
  }
}
