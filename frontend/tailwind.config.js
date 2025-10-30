/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891b2',
          hover: '#06b6d4',
          light: '#e0f2fe',
        },
        accent: {
          DEFAULT: '#f97316',
          hover: '#fb923c',
          light: '#ffedd5',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
