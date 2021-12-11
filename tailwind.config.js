module.exports = {
  mode: 'jit',
  content: [
    './pages/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        chilanka: ['"Chilanka"'],
        'nunito-sans': ['"Nunito Sans"']
      }
    }
  },
  plugins: []
}
