// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // si usas React
    './pages/**/*.{js,ts,jsx,tsx}', // si usas Next.js
    './components/**/*.{js,ts,jsx,tsx}', // tus componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
