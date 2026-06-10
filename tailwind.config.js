/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // New brand colors
        dark: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
        },
        mauve: {
          DEFAULT: '#B5657B',
          light: '#C98A9E',
          dark: '#9A4F62',
        },
        cream: '#FDF6F0',
        charcoal: '#1A1A1A',
        muted: '#6B6B6B',
        // Legacy colors for backward compatibility
        blush: {
          50: '#FFF0F4',
          100: '#FFE0E8',
          200: '#F2A7BB',
          300: '#E889A8',
          400: '#D96E8F',
          500: '#C4557A',
        },
        lavender: {
          50: '#F3EFF9',
          100: '#E4DBF0',
          200: '#C9B8E8',
          300: '#B49DE0',
          400: '#9D82D6',
          500: '#8568CC',
        },
        peach: {
          50: '#FFF5EE',
          100: '#FFE8D8',
          200: '#FFD6C0',
          300: '#FFC4A8',
          400: '#FFB090',
          500: '#FF9C78',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'heart-bounce': 'heartBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        heartBounce: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.3)' },
          '60%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
