/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': "#381CB8",
        'blueLight': "#E9EDF0",
        'blueDark': "#2D00FF",
        'black': "#181B20",
        'gray': "#C6C6C6",
        'grayDark': "#989898",
        'error': "#E2000F",
        'success': "#04C600",
      },
      fontFamily: {
        'mainRegular': "sourceSansPro-regular",
        'mainMedium': "sourceSansPro-medium",
        'mainSemibold': "sourceSansPro-semibold",
        'mainBold': "sourceSansPro-bold"
      },
      fontSize: {
        'base': "16px",
        'md': "18px",
        'xl': "22px",
        '2xl': "28px",
        '3xl': "36px",
      },
    },
  },
  plugins: [],
}

