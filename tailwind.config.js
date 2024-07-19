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
        'max-md': { 'max': '768px' },
        sm: { 'min': '480px' },
        md: { 'min': '768px', },
        lg: { 'min': '1024px' },
        xl: { 'min': '1440px' },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        hind: ['Hind Siliguri', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        podkova: ['Podkova', 'serif'],
      },
      colors: {
        "primary": '#0D47A1',
        "secondary": '#1976D2',
        "third": '#7BC9FF',
        "fourth": '#FDFFE2',
        grad1: 'rgb(13,71,161)',
        grad2: 'rgb(66,165,245)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, rgba(13,71,161,1) 0%, rgba(66,165,245,1) 99%)',
      },
      width: {
        '11.25': '45px',
        '37.5': '150px',
        '100': '400px',
        '150': '600px',
      },
      height: {
        '15': '70px',
        '37.5': '150px',
        '75': '300px',
        '100': '400px',
      },
      padding: {
        '7.5': '30px',
      },
      boxShadow: {
        'BS1': '0px 0px 20px rgba(0, 0, 0, 0.01)',
        'BS2': '-20px 20px 40px #69abd9, 20px -20px 40px #8de7ff;',
      },
      zIndex: {
        '100': '100',
      },
      gap: {
        '3.75': '15px',
        '7.5': '30px',
        '12.5': '50px',
      },
      spacing: {
        '12.5': '50px',
        '17.5': '70px',
      },
      fontSize: {
        '5.5': '22px',
      },
      borderRadius: {
        '24.75': '99px',
      },
    },
  },
  plugins: [],
};
