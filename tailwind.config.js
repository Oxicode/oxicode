module.exports = {
  mode: 'jit',
  content: [
    './pages/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'zz-top': 'linear-gradient(-135deg, #fff 12px, transparent 0%), linear-gradient(135deg, #fff 12px, transparent 0%)',
        'zz-bottom': 'linear-gradient(45deg, #fff 12px, transparent 0), linear-gradient(-45deg, #fff 12px, transparent 0)'
      },
      fontFamily: {
        chilanka: ['"Chilanka"'],
        'nunito-sans': ['"Nunito Sans"']
      }
    }
  },
  plugins: []
}
