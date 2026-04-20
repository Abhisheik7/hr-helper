/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFBF1',
        primary: '#EA7B7B',
        'primary-dark': '#D45F5F',
        'primary-light': '#F0A0A0',
        surface: '#FFFFFF',
        'surface-muted': '#FDF7EE',
        'border-warm': '#EDE8DC',
        'text-primary': '#1A1612',
        'text-secondary': '#6B6460',
        'text-muted': '#A8A29E',
        success: '#6DAF8A',
        warning: '#E8A838',
        'node-start': '#6DAF8A',
        'node-task': '#7B9FEA',
        'node-approval': '#E8A838',
        'node-auto': '#A67BEA',
        'node-end': '#EA7B7B',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        node: '0 2px 12px rgba(234,123,123,0.12)',
        'node-hover': '0 4px 20px rgba(234,123,123,0.22)',
        panel: '0 8px 32px rgba(26,22,18,0.10)',
      },
    },
  },
  plugins: [],
}

