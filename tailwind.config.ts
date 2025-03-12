import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "cod-gray": "#131313",
        "nav-bg": "#13131326",
      },
      inset: {
        "50vh": "50vh",
        "50vw": "50vw",
      },
      transitionProperty: {
        width: "width",
      },
      backdropBlur: {
        s: "6px",
      },
      animation: {
        scroll: "scroll 1.5s ease-out infinite",
        splashFirst: "splash 0.3s ease-out 1s forwards",
        splashSecond: "splash 0.3s ease-out 1.1s forwards",
        splashThird: "splash 1s ease-out 1.5s forwards",
        borderX: "borderX 1s ease-in-out 1s forwards",
        borderY: "borderY 1s ease-in-out  forwards",
      },
      keyframes: {
        scroll: {
          "25%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        splash: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        borderX: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        borderY: {
          "0%": {
            height: "0",
          },
          "100%": {
            height: "100%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
