/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const forms = require('@tailwindcss/forms');

function generateDimensions(start, end) {
  const dimensions = {};
  for (let i = start; i <= end; i++) {
    dimensions[`.my-w-${i}px`] = {
      width: `${i}px`,
    };
    dimensions[`.my-h-${i}px`] = {
      height: `${i}px`,
    };
  }
  return dimensions;
}

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontFamily: {
        bebas: ['Bebas Neue', ...defaultTheme.fontFamily.sans],
        impact: ['Impact', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary-dark': '#342d2d',
        'primary-light': '#ccba9d',
        'secondary-dark': '#879294',
        'secondary-light': '#95a19f',
        'white': '#ffffff',
        'COLORS-USED-IN': 'VSCODE',
        'string-punctuation': '#555',
        'function-variable': '#ccba9d',
        'control-keyword': '#95a19f',
        'single-quoted-string': '#e6d4cc',
        'language-constant': '#CC9DC6',
        'hashkey-symbol': '#95a19f',
        'yellow': '#FFDE59',
        'red': '#FF3131',
      },
      letterSpacing: {
        wider: '0.1em',  // You can adjust this value to achieve the desired kerning
      },
      scale: {
        '120': '1.20',
      },
      width: {
        custom: '2000px'
      },
      margin: {
        custom: '100px'
      },
    },
	},
	plugins: [
    forms,
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ...generateDimensions(1, 200),
        '.brand-name': {
          fontFamily: theme('fontFamily.bebas'),
          fontSize: theme('fontSize.8xl'),
          textTransform: 'uppercase',
        },
        '.brand-category': {
          fontFamily: theme('fontFamily.bebas'),
          fontSize: theme('fontSize.5xl'),
          paddingTop: "0.5rem",
          textTransform: 'uppercase',
        },
        '.bot': {
          fontFamily: theme('fontFamily.bebas'),
          fontSize: theme('fontSize.7xl'),
          paddingTop: "0.5rem", // "0.5rem
          textTransform: 'uppercase',
        },
        '.workflow': {
          fontFamily: theme('fontFamily.bebas'),
          fontSize: theme('fontSize.5xl'),
          paddingTop: "0.5rem", // "0.5rem
          textTransform: 'uppercase',
        },
        '.brand-white': {
          color: theme('colors.white'),
        },
        '.brand-light': {
          color: theme('colors.primary-light'), // colors.primary-dark
        },
        '.brand-text': {
          color: theme('colors.primary-light'), // colors.primary-dark
        },        
        '.brand-text highlight': {
          color: theme('colors.white'),
        },
        '.debug': {
          outline: '1px solid red',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}



// function generateDimensions(start, end) {
//   const dimensions = {};
//   for (let i = start; i <= end; i++) {
//     dimensions[`.my-w-${i}px`] = {
//       width: `${i}px`,
//     };
//     dimensions[`.my-h-${i}px`] = {
//       height: `${i}px`,
//     };
//   }
//   return dimensions;
// }
// 	plugins: [
//     function ({ addUtilities, theme }) {
//       const newUtilities = {
//         ...generateDimensions(1, 200),

