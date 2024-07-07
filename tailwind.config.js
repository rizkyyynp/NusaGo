/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { 'min': '480px' },
        md: { 'min': '768px', },
        lg: { 'min': '1024px' },
        xl: { 'min': '1440px' },
      },
      colors: {
        "primary": '#0D47A1',
        "secondary": '#1976D2',
        "third": '#7BC9FF',
        grad1: 'rgb(13,71,161)',
        grad2: 'rgb(66,165,245)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, rgba(13,71,161,1) 0%, rgba(66,165,245,1) 99%)',
      },
    },
  },
  plugins: [],
};
