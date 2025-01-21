/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        'screen-80': 'calc(100vh - 80px)', // Adaugă clasa personalizată
      },
    },
  },
  plugins: [],
}

