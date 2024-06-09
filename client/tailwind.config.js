/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gainsboro: {
          100: "#e0e0e0",
          200: "#d9d9d9",
        },
        black: "#000",
        gray: {
          100: "#fefefe",
          200: "#7d7d7d",
        },
        darkorange: "#ff7a00",
        darkgray: {
          100: "#b2b2b2",
          200: "#a5a5a5",
          300: "#9b9b9b",
          400: "#9a9a9a",
        },
        dimgray: "#515050",
        whitesmoke: "#e9e9e9",
        silver: "#c3c3c3",
        indianred: "#aa4343",
      },
      spacing: {},
      fontFamily: {
        caladea: "Caladea",
        candal: "Candal",
        "archivo-black": "'Archivo Black'",
        cairo: "Cairo",
      },
      borderRadius: {
        "41xl": "60px",
        xl: "20px",
      },
    },
    fontSize: {
      lgi: "19px",
      xl: "20px",
      base: "16px",
      inherit: "inherit",
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '5rem',
    },
    screens: {
      mq2400: {
        raw: "screen and (max-width: 2400px)",
      },
      mq2100: {
        raw: "screen and (max-width: 2100px)",
      },
      mq1800: {
        raw: "screen and (max-width: 1800px)",
      },
      mq1575: {
        raw: "screen and (max-width: 1575px)",
      },
      lg: {
        max: "1200px",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq1025: {
        raw: "screen and (max-width: 1025px)",
      },
      mq1000: {
        raw: "screen and (max-width: 1000px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq825: {
        raw: "screen and (max-width: 825px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
