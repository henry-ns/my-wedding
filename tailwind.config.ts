import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        header: "var(--font-header)",
      },
      colors: {
        bg: "#FEFCFB",
        primary: {
          "50": "#f5f8f6",
          "100": "#e8f0ea",
          "200": "#c3d8c7",
          "300": "#acc9b2",
          "400": "#80a889",
          "500": "#5e8967",
          "600": "#4a6f52",
          "700": "#3c5942",
          "800": "#334838",
          "900": "#2b3c2f",
          "950": "#141f17",
        },
        secondary: {
          "50": "#faf6f6",
          "100": "#f4ecec",
          "200": "#ebddde",
          "300": "#dcc5c6",
          "400": "#c39ea0",
          "500": "#b08385",
          "600": "#99696c",
          "700": "#7f5658",
          "800": "#6a4a4c",
          "900": "#5b4142",
          "950": "#2f2021",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
