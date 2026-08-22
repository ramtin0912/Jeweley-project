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
        sans: ['Vazirmatn', 'system-ui', 'sans-serif']
      },
      colors: {
        // Neutral "silver" brand scale + a muted gold accent (no purple, no gradients)
        brand: {
          50: '#f7f7f5',
          100: '#e9e9e4',
          200: '#d3d3c9',
          300: '#b3b3a4',
          400: '#8f8f7c',
          500: '#747460',
          600: '#5c5c4b',
          700: '#4b4b3e',
          800: '#3e3e35',
          900: '#36362f',
          950: '#1d1d18'
        },
        accent: {
          DEFAULT: '#a87e2f',
          dark: '#8a6723'
        }
      }
    }
  }
}
