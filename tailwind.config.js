/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "var(--ap-blue)",
      blueLight: "var(--ap-blueLight)",
      blueDark: "var(--ap-blueDark)",
      black: "var(--ap-black)",
      gray: "var(--ap-gray)",
      grayDark: "var(--ap-grayDark)",
      error: "var(--ap-error)",
      success: "var(--ap-success)",
      white: "var(--ap-white)",
      background: "var(--ap-background)",
      buttonText: "var(--ap-buttonText)",
      routeBackground: "var(--ap-routeBackground)",
      routeTextHover: "var(--ap-routeTextHover)",
      transparent: "#0000",
    },
    extend: {
      fontFamily: {
        mainRegular: "sourceSansPro-regular",
        mainMedium: "sourceSansPro-medium",
        mainSemibold: "sourceSansPro-semibold",
        mainBold: "sourceSansPro-bold",
      },
      fontSize: {
        base: "16px",
        md: "18px",
        xl: "22px",
        "2xl": "28px",
        "3xl": "36px",
      },
    },
  },
  plugins: [],
};
