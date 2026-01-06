/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary - Burgundy/Maroon (Hogwarts warmth)
        burgundy: {
          DEFAULT: '#722F37',
          dark: '#5C1E24',
          light: '#8B3D47',
        },
        // Gold Accents (magical highlights)
        gold: {
          DEFAULT: '#C9A227',
          light: '#D4B94E',
          pale: '#E8D48B',
        },
        // Parchment/Cream (warm backgrounds)
        parchment: {
          DEFAULT: '#F5E6D3',
          light: '#FAF3EB',
          dark: '#E8D4BE',
        },
        cream: '#FFFEF5',
        'warm-white': '#FDF9F3',
        // Dark accents
        navy: {
          DEFAULT: '#1B365D',
          light: '#2C4A7C',
        },
        'deep-green': '#1E5128',
        'forest-green': '#2D6A4F',
        bronze: '#8B6914',
        // Text colors (ink tones)
        ink: {
          DEFAULT: '#2C1810',
          light: '#4A3728',
          muted: '#6B5344',
        },
        // Keep some legacy mappings for compatibility
        primary: {
          50: '#FAF3EB',
          100: '#F5E6D3',
          200: '#E8D4BE',
          300: '#D4B94E',
          400: '#C9A227',
          500: '#722F37',
          600: '#5C1E24',
          700: '#4A3728',
          800: '#2C1810',
          900: '#1B365D',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'shimmer-slow': 'shimmer 3s infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(201, 162, 39, 0.3)',
        'glow-gold-lg': '0 0 40px rgba(201, 162, 39, 0.4)',
        'glow-burgundy': '0 0 20px rgba(114, 47, 55, 0.3)',
        'warm-sm': '0 1px 2px 0 rgba(44, 24, 16, 0.05)',
        'warm-md': '0 4px 6px -1px rgba(44, 24, 16, 0.08), 0 2px 4px -2px rgba(44, 24, 16, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(44, 24, 16, 0.1), 0 4px 6px -4px rgba(44, 24, 16, 0.08)',
        'warm-xl': '0 20px 25px -5px rgba(44, 24, 16, 0.12), 0 8px 10px -6px rgba(44, 24, 16, 0.08)',
      },
    },
  },
  plugins: [],
};
