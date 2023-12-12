import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default ({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(-45deg)" },
          "100%": { transform: "rotate(-405deg)" },
        },
        spin: {
          "0%": { transform: "rotate(45deg)" },
          "100%": { transform: "rotate(405deg)" },
        },
        "bounce-slow": {
          "0%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(-10%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        spin: "spin 14s linear infinite",
        "spin-reverse": "spin-reverse 14s linear infinite",
      },
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
        discord: {
          "50": "#f1f5fc",
          "100": "#e5eefa",
          "200": "#cfdff6",
          "300": "#b2c9ef",
          "400": "#93ace6",
          "500": "#7289da",
          "600": "#5e6ecd",
          "700": "#4e5ab4",
          "800": "#414c92",
          "900": "#3a4375",
          "950": "#222744",
        },
      },
    },
  },
  plugins: [],
} satisfies Config);
