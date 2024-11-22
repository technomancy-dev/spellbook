/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "lofi",
      {
        skeletor: {
          primary: "#84FBA2",
          secondary: "#BD93F9",
          accent: "#F3E4A2",
          neutral: "#48445A",
          "base-100": "#2B2836",
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
