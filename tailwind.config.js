module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      'primary': '#D8D4F2',
      'secondary': '#AFCBFF',
      'tertiary': '#FCFCFC',
     })
   
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
