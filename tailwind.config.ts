import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['EB Garamond', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Source Sans 3', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        'cinzel-decorative': ['"Cinzel Decorative"', 'serif'],
      },
      colors: {
        ink: '#1a1a1a',
        charcoal: '#2d2d2d',
        sage: '#8b9a7a',
        stone: '#a8a8a8',
        cream: '#faf8f3',
        parchment: '#f5f1e8',
        oxblood: '#722f37',
        gold: '#c9a227',
      },
    },
  },
  plugins: [],
}
export default config
