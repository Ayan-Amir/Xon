/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xxl: '1440px',
      },
      colors: {
        darkPrimary: '#202427',
        darkSecondary: '#20242720',
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
        statRedBg: '#FCB5AA',
        sideBarBorderColor: 'rgba(32, 36, 39, 0.1)',
        acordianTextColor: '#333238',
        studyGroupBorderColor: '#D5D5D5',
        studyCardBorderColor: '#DCDCDE',
        detailCardPrimaryColor: '#89888D',
        detailCardBorderColor: '#8F8E8A4D',
        detailCardContentBorder: '#C4C4C4',
        linkTextColor: '#3B71E7',
        trailCardBorderColor: '#20242738',
        labelColorPrimary: '#ABABAB',
        scrollbarBg: '#CECECE',
        tagDefaultBg: '#E3E4E8',
        studyCardBorder: '#CCCECE',
      },
      fontFamily: {
        gotham: ['Gotham', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('autoprefixer'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
