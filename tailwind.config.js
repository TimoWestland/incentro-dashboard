const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = p => path.join(__dirname, p)


/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  darkMode: 'class',
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1512px' // This is the design resolution
    },
    colors: {
      // color scheme is defined in /app.css
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      black: 'var(--color-black)',

      green: {
        100: 'var(--color-green-100)',
        200: 'var(--color-green-200)',
        300: 'var(--color-green-300)',
        400: 'var(--color-green-400)',
      },
      orange: {
        100: 'var(--color-orange-100)'
      },
    },
    extend: {
      fontFamily: {
        sans: ['Work sans', ...defaultTheme.fontFamily.sans]
      },

      typography: theme => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = size => {
          const result = theme(`fontSize.${size}`)
          return Array.isArray(result) ? result[0] : result
        }

        return {
         DEFAULT: {
           css: [
             {
               p: {
                 marginTop: 0,
                 marginBottom: theme('spacing.8'),
                 fontSize: fontSize('lg')
               },
               '> div': {
                 marginTop: 0,
                 marginBottom: theme('spacing.8'),
                 fontSize: fontSize('lg')
               },
               a: {
                 textDecoration: 'none',
               },
               'a:hover,a:focus': {
                 textDecoration: 'underline',
                 outline: 'none'
               },
               strong: {
                 fontWeight: theme('fontWeight.medium'),
                 fontSize: fontSize('lg')
               },
               hr: {
                 marginTop: theme('spacing.8'),
                 marginBottom: theme('spacing.16'),
               },
               ul: {
                 marginTop: 0,
                 marginBottom: theme('spacing.8'),
               },
               ol: {
                 marginTop: 0,
                 marginBottom: theme('spacing.8'),
               },
               'h1, h2, h3, h4, h5, h6': {
                 marginTop: 0,
                 marginBottom: 0,
                 fontWeight: theme('fontWeight.normal'),

                 [`@media (min-width: ${theme('screens.lg')})`]: {
                   fontWeight: theme('fontWeight.medium'),
                 },
               },
               // tailwind doesn't stick to this property order, so we can't make 'h3' overrule 'h2, h3, h4'
               'h1, h2': {
                 fontSize: fontSize('2xl'),
                 marginTop: theme('spacing.20'),
                 marginBottom: theme('spacing.10'),
                 [`@media (min-width: ${theme('screens.lg')})`]: {
                   fontSize: fontSize('3xl'),
                 },
               },
               h3: {
                 fontSize: fontSize('xl'),
                 marginTop: theme('spacing.16'),
                 marginBottom: theme('spacing.10'),
                 [`@media (min-width: ${theme('screens.lg')})`]: {
                   fontSize: fontSize('2xl'),
                 },
               },
               'h4, h5, h6': {
                 fontSize: fontSize('lg'),
                 [`@media (min-width: ${theme('screens.lg')})`]: {
                   fontSize: fontSize('xl'),
                 },
               },
             }
           ]
         }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
