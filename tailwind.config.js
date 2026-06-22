/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brio: {
          // Superficies oscuras (secciones "spotlight" estilo Platzi)
          ink: '#0E1117',
          'ink-dark': '#070A0F',
          // Superficies claras
          bone: '#FFFFFF',
          paper: '#FFFFFF',
          cream: '#F2F5F8',
          muted: '#F6F8FA',
          border: '#E4E9EF',
          slate: '#56606E',
          // Verde Platzi (esmeralda brillante). Cambia SOLO estos hex si quieres otro tono.
          terra: '#0FE38B',
          'terra-dark': '#0AA968',
          'terra-light': '#5CF2B5',
          jade: '#0FE38B',
          'jade-light': '#5CF2B5',
          gold: '#0AA968',
          'gold-dark': '#089456',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // Sombras planas estilo Platzi
        hard: '0 1px 2px rgba(14, 17, 23, 0.06)',
        'hard-lg': '0 24px 50px -24px rgba(14, 17, 23, 0.30)',
        'hard-sm': '0 1px 2px rgba(14, 17, 23, 0.04)',
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
