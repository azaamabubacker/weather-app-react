/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F875AA",
        secondary: "#2C2C2C",
        background: "#FDFCFC",
        gray: "#C4C4C4",
        grayDark: "#FF6C6C",
        resultBlue: "#D6D46D",
        textCol: "#B9B4C7",
      },
      fontFamily: { poppins: ["Poppins", "sans-serif"] },
    },
    height: {
      "5v": "5vh",
      "7v": "7vh",
      "8v": "8vh",
      "10v": "10vh",
      "20v": "20vh",
      "29v": "29vh",
      "30v": "30vh",
      "35v": "35vh",
      "40v": "40vh",
      "45v": "45vh",
      "50v": "50vh",
      "60v": "60vh",
      "70v": "70vh",
      "80v": "80vh",
      "83v": "83vh",
      "90v": "90vh",
      "100v": "100vh",
    },
  },
  plugins: [],
};
