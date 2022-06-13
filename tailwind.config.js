/** @type {import('tailwindcss/types').Config} */

const config = {
  content: [
    './pages/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'zz-top': 'linear-gradient(-135deg, #fff 1rem, transparent 0), linear-gradient(135deg, #fff 1rem, transparent 0)',
        'zz-bottom': 'linear-gradient(45deg, #fff 1rem, transparent 0), linear-gradient(-45deg, #fff 1rem, transparent 0)'
      },
      fontFamily: {
        chilanka: ['"Chilanka"'],
        'nunito-sans': ['"Nunito Sans"']
      }
    }
  },
  plugins: []
}

module.exports = config
