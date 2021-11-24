module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121212',
          850: 'rgb(24,24,24)',
          700: '#383140',
          650: '#3b3b3b',
          500: '#5f546d',
          400: '#5b5660',
          350: '#7f7f7f',
          50: '#fafafa',
          60: 'rgba(93,33,210,.05)',
          65: '#f8f6f9',
          70: '#f0ebf8',
        },
        accent: {
          dark: '#ec4899',
          light: '#5d21d2',
          focus: {
            light: '#301c6b',
            dark: '#be185d',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
