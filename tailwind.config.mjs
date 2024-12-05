/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require('tailwindcss-3d')],
  daisyui: {
    darkTheme: "skeletor",
    themes: [
      "lofi",
      "synthwave",
      "nord",
      "black",
      {
        skeletor: {
          ...require("daisyui/src/theming/themes")["black"],
          primary: "#84FBA2",
          secondary: "#BD93F9",
          accent: "#F3E4A2",
          neutral: "#48445A",
          "base-100": "#2B2836",
          "base-200": "#4e4c59",
          "base-300": "#757280",
          info: "#93B4FF",
          success: "#84FBA2",
          warning: "#FFB793",
          error: "#F36A66",
          "base-content": "#CEDEFF",
        },
      },
    ],
  },
};
