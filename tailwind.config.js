/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Approved S.S. Convention Luxury Architectural Palette
        palace: {
          obsidian: '#0D0204', // Deepest foundation tone (modals, dropdowns, backing plates)
          burgundy: '#1C0409', // Primary page canvas & sticky navbar base
          wine: '#2E060F',     // Primary royal section background
          velvet: '#29070E',   // Card & surface background
          card: '#29070E',     // Elevated card surface
          cardHover: '#340A13' // Card hover elevated surface
        },
        champagne: {
          gold: '#C5A059',          // Primary brushed champagne gold metallic accent
          light: '#EED9A6',         // Pale leaf gold highlight
          muted: '#8A6B32',         // Antique bronze / muted structural metal
          hairline: 'rgba(197, 160, 89, 0.22)',      // Architectural 1px hairline border
          hairlineHover: 'rgba(197, 160, 89, 0.45)' // Hover border state
        },
        luxury: {
          ivory: '#FFF8E7',                          // Primary typography (soft warm white)
          parchment: '#D2B79B',                      // Secondary typography (body copy, descriptions)
          muted: 'rgba(210, 183, 155, 0.65)'        // Tertiary typography (metadata, specs)
        },
        latte: '#FFF8E7', // Cosmic latte - primary text on maroon
        mocha: '#D2B79B', // Mocha cream - secondary text and soft accents
        // Backward-compatible aliases mapped to the approved palette
        velvet: {
          950: '#0D0204',
          900: '#1C0409',
          850: '#29070E',
          800: '#340A13',
          700: '#5F1524',
          600: '#7A1F31',
          500: '#92283C',
          400: '#B85065',
        },
        gold: {
          50: '#FFFEFA',
          100: '#FFF8E7',
          200: '#EED9A6',
          300: '#DEC58C',
          400: '#D4AF37',
          500: '#C5A059', // Primary Champagne Gold
          600: '#B8860B',
          700: '#8A6B32',
          800: '#694F1E',
        },
        ivory: {
          50: '#FFFEFA',
          100: '#FFF8E7',
          200: '#F5ECE2',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        telugu: ['"Ramabhadra"', '"Noto Sans Telugu"', 'sans-serif'],
        'telugu-body': ['"Noto Sans Telugu"', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '1280px',
        '6xl': '1152px',
        '5xl': '1080px',
        '4xl': '840px',
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px',
        '3xl': '20px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-settle': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        'fast': '180ms',
        'normal': '300ms',
        'hover': '420ms',
        'reveal': '720ms',
        'settle': '850ms',
      },
      backgroundImage: {
        'royal-velvet': 'linear-gradient(180deg, #1C0409 0%, #0D0204 100%)',
        'velvet-card': 'linear-gradient(145deg, #29070E 0%, #1C0409 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #EED9A6 0%, #C5A059 50%, #8A6B32 100%)',
        'gold-cta': 'linear-gradient(135deg, #B8860B 0%, #EED9A6 50%, #C5A059 100%)',
      }
    },
  },
  plugins: [],
}
