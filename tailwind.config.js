/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        '313338': '#313338',

        'primary-1': '#1E1F22',
        'primary-2': '#2B2D31',
        'primary-3': '#313338',
        'primary-4': '#383A3F',
        'primary-5': '#424549',
      }
    },
  },
  plugins: [],
}
