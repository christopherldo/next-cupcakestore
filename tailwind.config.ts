import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#f8a5c2",
          secondary: "#f8c8dc",
          accent: "#f7b7a3",
          neutral: "#3e3e3e",
          "base-100": "#ffffff",
          info: "#78c6e1",
          success: "#8ccf77",
          warning: "#f5b742",
          error: "#e74c3c",
          body: {
            "background-color": "#f9c4d2",
            "background-image":
              "linear-gradient(90deg, #f9c4d2 0%, #f8d0bb 100%)",
          },
        },
      },
    ],
  },
};

export default config;
