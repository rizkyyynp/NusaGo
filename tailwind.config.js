/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      screens: {
        'max-md': { 'max': '767px' },
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
        "fifth": '#0D3D6E',
        "dark1": '#0f172a',
        "dark2": '#B9D6F2',
        "dark3": '#2C2C2E',
        grad1: 'rgb(13,71,161)',
        grad2: 'rgb(66,165,245)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, rgba(13,71,161,1) 0%, rgba(66,165,245,1) 99%)',
        'secondary-gradient': 'linear-gradient(86deg, rgba(13,71,161,1) 60%, rgba(66,165,245,1) 85%)',
      },
      width: {
        '7.5': '30px',
        '11.25': '45px',
        '20': '80px',
        '37.5': '150px',
        '100': '400px',
        '150': '600px',
      },
      height: {
        '7.5': '30px',
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
        'BS3': '7px 7px 5px #125393,7px -7px 5px #2199ff;',
        'BS4': '-5px 5px 10px #176bbf,5px -5px 10px #1b81e5;',
        'BS5': ' 20px -20px 40px #0b111e,-20px 20px 40px #131d36;',
        'BS6': 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
        'BS7': '0px 1px 1px rgba(23, 107, 191, 0.35), 1px 3px 3px rgba(23, 107, 191, 0.35), 3px 6px 6px rgba(23, 107, 191, 0.35), 5px 10px 10px rgba(23, 107, 191, 0.35), 8px 16px 16px rgba(23, 107, 191, 0.35);',
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
        '20px': "20px",
        '30px': "30px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}