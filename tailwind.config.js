/** @type {import('tailwindcss').Config} */
// Tokens de la identidad visual de QuestHire (naranja / negro / gris).
// Usar siempre estos nombres (bg-brand-orange, text-brand-black...) en vez de hex sueltos.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FFEDD5',
        },
        'brand-black': {
          DEFAULT: '#111111',
          soft: '#262626',
        },
        'brand-gray': {
          DEFAULT: '#6B7280', // texto secundario
          light: '#F3F4F6', // fondos secundarios
          border: '#E5E7EB', // bordes
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
