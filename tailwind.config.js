/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPrimary: '#202427',
        textSecondary: '#7D7D7D',
        textTertiary: '#A4A3A8',
        inputError: '#FD5151',
        borderPrimary: '#E9E9E9',
        borderTertiary: '#D2D3D4',
        authBg: '#F3F4F8',
        radioGroupBg: '#F6F6F6',
        radioGroupBorder: '#ECECEF',
        badgeBlue: '#0B5CAD',
        badgeBlueBg: '#CBE2F9',
        badgeGreen: '#24663B',
        badgeGreenBg: '#C3E6CD',
        reviewCardBg: '#F3F4F8',
        reviewCardBorder: '#282828',
        errorButton: '#F13232',
        errorButtonLight: '#F89898',
        successButton: '#1CE818',
        successButtonLight: '#8DF48B',
        scrollbarBg: '#CECECE'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

