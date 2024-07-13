import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'zz-top': 'linear-gradient(-135deg, #fff 1 nrem, transparent 0), linear-gradient(135deg, #fff 1rem, transparent 0)',
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
export default config
