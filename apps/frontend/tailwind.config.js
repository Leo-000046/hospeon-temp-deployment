
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: {
          DEFAULT: '#FAFAF9',
          dark: '#0E0F11',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#17191C',
        },
        subtle: {
          DEFAULT: '#F4F4F2',
          dark: '#1C1F23',
        },
        line: {
          DEFAULT: '#E8E8E5',
          strong: '#DCDCD8',
          dark: '#2A2D32',
          'dark-strong': '#35383E',
        },
        ink: {
          primary: '#18181B',
          secondary: '#6B6B6B',
          tertiary: '#9A9A98',
          'primary-dark': '#F4F4F5',
          'secondary-dark': '#A1A1AA',
          'tertiary-dark': '#71717A',
        },
        accent: {
          DEFAULT: '#3F8E84',
          soft: '#E8F0EE',
          'soft-dark': '#1F2E2C',
        },
        danger: {
          DEFAULT: '#B84A4A',
          soft: '#FBEDED',
          'soft-dark': '#2E1A1A',
        },
        success: {
          DEFAULT: '#4F8A5C',
          soft: '#ECF3EE',
          'soft-dark': '#1A271D',
        },
        warning: {
          DEFAULT: '#B8893A',
          soft: '#FAF1E3',
          'soft-dark': '#2D2415',
        },
        info: {
          DEFAULT: '#5A7A8C',
          soft: '#EDF2F5',
          'soft-dark': '#1A222A',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.03)',
        softer: '0 1px 2px rgba(16, 24, 40, 0.03)',
        pop: '0 8px 24px rgba(16, 24, 40, 0.08)',
      },
    },
  },
  plugins: [],
}
