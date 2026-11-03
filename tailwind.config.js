/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          950: '#140407', // Deepest palace backdrop
          900: '#1C070C', // Main rich wine background from screenshot
          850: '#260B12', // Rich card background
          800: '#350E18', // Card hover border/background
          700: '#5F1524', // Official Logo Swan Maroon
          600: '#7A1F31', // Bright rich maroon accent
          500: '#92283C',
          400: '#B85065',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF8DE',
          200: '#FFEDB3',
          300: '#FFE082',
          400: '#E6BF48',
          500: '#D4AF37', // Imperial Gold
          600: '#C5A059',
          700: '#A98018',
          800: '#84600E',
        },
        ivory: {
          50: '#FFFEFA',
          100: '#FAF6F0',
          200: '#F5ECE2',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'royal-velvet': 'linear-gradient(180deg, #1C070C 0%, #140407 100%)',
        'velvet-card': 'linear-gradient(145deg, rgba(38, 11, 18, 0.9) 0%, rgba(22, 6, 10, 0.95) 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #FFF0B8 0%, #D4AF37 50%, #9E7D2B 100%)',
        'gold-text': 'linear-gradient(135deg, #FFF8DE 0%, #E6BF48 45%, #C5A059 80%, #FFE082 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
