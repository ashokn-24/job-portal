/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#615EFC",
        mildBlue: "#7E8EF1",
        subgray: "#D1D8C5",
        lightGray: "#EEEEEE",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      fontSize: {
        // Desktop Devices
        "title-desktop": ["35px", "50px"],
        "body-desktop": ["18px", "24px"],
        "body-desktop-interaction": ["14px", "20px"],
        "secondary-desktop": ["16px", "22px"],

        // Mobile devices
        "title-mobile": ["28px", "40px"],
        "body-mobile": ["16px", "20px"],
        "body-mobile-interaction": ["16px", "18px"],
        "secondary-mobile": ["14px", "18px"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
