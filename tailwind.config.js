/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
