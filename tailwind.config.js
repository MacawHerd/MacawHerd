module.exports = {
  mode:'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        arimo:"'Arimo', sans-serif",
        acme:"'Acme', sans-serif",
        lato:"'Lato', sans-serif",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
