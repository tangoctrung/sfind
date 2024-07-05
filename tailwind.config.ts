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
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1580px',
      },
      colors: {
        'background': '#F4F5F7',
        'background-second': '#FFFFFF',
        'text-primary': '#1E293B',
        'text-secondary': '',

        'background-dark': '#1E293B',
        'background-second-dark': '#26262C',
        'text-primary-dark': '#FFFFFF',
        'text-secondary-dark': '',
      },
      spacing: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
};
export default config;
