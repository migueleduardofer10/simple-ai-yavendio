/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brio: {
          // Superficies oscuras (morado/vino estilo Yavendío)
          ink: '#1C0A22',
          'ink-dark': '#100513',
          // Superficies claras
          bone: '#FFFFFF',
          paper: '#FFFFFF',
          cream: '#F6F1F7',
          muted: '#F8F4F9',
          border: '#E9E1EC',
          slate: '#6A5C70',
          // Acento amarillo (estilo Yavendío). Botones, fills y resaltados.
          terra: '#F5E14E',
          'terra-dark': '#E6CF2C',
          'terra-light': '#FBEE92',
          jade: '#F5E14E',
          'jade-light': '#FBEE92',
          gold: '#E6CF2C',
          'gold-dark': '#B89512',
          // Morado de marca: acento de TEXTO sobre fondo claro (legible)
          plum: '#8A2E92',
          'plum-light': '#C77BD0',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // Sombras planas con tinte morado
        hard: '0 1px 2px rgba(28, 10, 34, 0.06)',
        'hard-lg': '0 24px 50px -24px rgba(28, 10, 34, 0.32)',
        'hard-sm': '0 1px 2px rgba(28, 10, 34, 0.04)',
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
