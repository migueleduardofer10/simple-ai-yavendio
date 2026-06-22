/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brio: {
          ink: '#1B1A2E',
          'ink-dark': '#12111F',
          bone: '#F4EFE6',
          paper: '#FBF8F2',
          cream: '#EAE3D6',
          muted: '#F0EADF',
          border: '#E2DACB',
          slate: '#6B6478',
          terra: '#DD5C3A',
          'terra-dark': '#C44A2C',
          'terra-light': '#EE7D5E',
          jade: '#1F9D7A',
          'jade-light': '#3CB996',
          gold: '#E0A43B',
          'gold-dark': '#C68A26',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        hard: '#1B1A2E 0px 1.5px 0px',
        'hard-lg':
          '#1B1A2E 0px 1.5px 0px, rgba(27, 26, 46, 0.28) 0px 30px 60px -28px',
        'hard-sm': 'rgba(27, 26, 46, 0.06) 0px 1.5px 0px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
