import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        lg: "1024px",
        xl: "1220px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
