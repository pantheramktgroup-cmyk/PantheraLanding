import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}', './src/landing-app/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        panthera: {
          black: '#000000',
          deep: '#080808',
          card: '#101010',
          elevated: '#151515',
          white: '#F5F5F5',
          cream: '#F3F0DD',
          green: '#E3F78D',
          ash: 'rgba(245,245,245,0.60)',
          muted: 'rgba(245,245,245,0.42)',
        },
      },
      fontFamily: {
        sans: ['"Helvetica Now Text"'],
        display: ['"Helvetica Now Display"'],
      },
      boxShadow: {
        accent: '0 0 0 1px rgba(227,247,141,0.28), 0 24px 60px rgba(0,0,0,0.35)',
      },
      letterSpacing: {
        tighter: '-0.06em',
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.38'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} satisfies Config