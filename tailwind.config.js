/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6741d9',
        'primary-light': '#7950f2',
        'custom-text': '#dee2e6',
        'custom-text-dark': '#adb5bd',
        'custom-background-100': '#343a40',
        'custom-background-500': '#2b3035',
        'custom-background-900': '#212529',
        'custom-red': '#fa5252',
        'custom-red-dark': '#e03131'
      }
    }
  },
  plugins: []
}
