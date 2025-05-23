/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'plant-bg': '#111111',
        'plant-primary': '#4ADE80',
        'plant-secondary': '#22C55E',
        'plant-accent': '#15803D',
        'plant-dark': '#0C0C0C',
        'plant-light': '#F0FDF4',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'card-gradient': 'linear-gradient(to bottom right, rgba(74, 222, 128, 0.1), rgba(0, 0, 0, 0))',
      },
      boxShadow: {
        'inner-white': 'inset 0 0 8px 0 rgba(255, 255, 255, 0.1)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [], 
} 