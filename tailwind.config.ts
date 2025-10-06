import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        notarai: {
          blue: "#2563eb",
          "blue-dark": "#1e40af",
          dark: "#141414",
          gray: "#8a8a8a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
