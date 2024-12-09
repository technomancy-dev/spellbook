/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.2s ease-in",
        "fade-out": "fadeOut 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-3d"),
  ],
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
          neutral: "#2D2B38", // Base neutral
          "base-100": "#2B2836", // Very close to neutral for cohesion
          "base-200": "#312F3C", // Slightly lighter for contrast
          "base-300": "#34323F", // A bit lighter still for top layers
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
