/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: '#3A004D',
          deep: '#2A0038',
        },
        mauve: '#8B4F67',
        dusty: '#A77A9B',
        blush: '#D9BDCF',
        ivory: '#F0E6ED',
        success: '#2E7D5B',
        danger: '#B42344',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 60px -24px rgba(58, 0, 77, 0.35)',
        soft: '0 10px 30px -12px rgba(58, 0, 77, 0.25)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(14px, -22px, 0) rotate(8deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
      },
    },
  },
  plugins: [],
};
