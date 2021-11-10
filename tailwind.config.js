module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './pages/*.js',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        chilanka: ['"Chilanka"'],
        'nunito-sans': ['"Nunito Sans"']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
