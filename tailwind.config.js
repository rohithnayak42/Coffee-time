/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem', // 20px for mobile
        sm: '1.25rem',      // 20px
        md: '2rem',         // 32px for tablet
        lg: '3rem',         // 48px for desktop
        xl: '3.75rem',      // 60px for large screens
      },
      screens: {
        lg: '1024px',
        xl: '1280px',
        '2xl': '1360px', // max-width of 1360px
      },
    },
    extend: {
      colors: {
        'primary-maroon': '#4A0D16',
        'accent-orange': '#F5A623',
        'light-bg': '#F8F5F4',
        'dark-menu': '#1F1F1F',
        'text-dark': '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
