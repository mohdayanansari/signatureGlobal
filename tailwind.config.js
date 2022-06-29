module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important:true,
  theme: {
    extend: {
      colors: {
        appPurple: {
          200: "#41446d",
          300: "#7269ee",
          400: "#5e5dd0",
          500: "#393c64"
        },
        appGray: {
          200: "#3e4a57",
          300: "#36404a",
          400: "#262e34",
          500: "#303842",
          700: "#252e35",
        },
        appWhiteText:{
          200:"#a6b0cf"
        }
      },
    },
  },
  variants: {
    // ...
    extend: {
      scrollbar: ['rounded']
    }
  },
  plugins: [require("tailwind-scrollbar")],
};
