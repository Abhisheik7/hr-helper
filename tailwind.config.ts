import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        canvas: '#FFFBF1',
        accent: {
          DEFAULT: '#EA7B7B',
          dark: '#D45F5F',
          light: '#F0A0A0',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#FDF7EE',
        },
        border: '#EDE8DC',
        text: {
          primary: '#1A1612',
          secondary: '#6B6460',
          muted: '#A8A29E',
        },
        status: {
          success: '#6DAF8A',
          warning: '#E8A838',
          error: '#D45F5F',
          info: '#7B9FEA',
        },
      },
      borderRadius: {
        card: '10px',
        input: '6px',
        pill: '20px',
      },
      boxShadow: {
        warm: '0 2px 12px rgba(234,123,123,0.12)',
        warmLg: '0 10px 30px rgba(234,123,123,0.16)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config

