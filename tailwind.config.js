/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cinema-inspired palette
        cinema: {
          950: '#0a0a0e', // near-black backdrop
          900: '#111116',
          800: '#191a21',
          700: '#23242e',
          600: '#33343f',
        },
        marquee: {
          gold: '#f2c14e', // marquee-bulb gold, used sparingly for accents
          crimson: '#d64550', // velvet-curtain red, used for ratings/errors
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'], // condensed poster-style headings
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'film-strip': 'repeating-linear-gradient(90deg, #000 0px, #000 10px, transparent 10px, transparent 20px)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(242, 193, 78, 0.25)',
      },
    },
  },
  plugins: [],
}

