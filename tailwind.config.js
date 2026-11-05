/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ambar-dark': '#09251C',
        'ambar-accent': '#A55704',
        'ambar-sand': '#F3D2AF',
        'ambar-cream': '#F8EADC',
        'ambar-bg': '#F8EADC',
        'ambar-light': '#F8EADC',
      },
      fontFamily: {
        editorial: ['"Old Standard TT"', 'Georgia', 'serif'],
        'serif-classic': ['"Old Standard TT"', 'Georgia', 'serif'],
        serif: ['"Old Standard TT"', 'Georgia', 'serif'],
        sans: ['"Golos Text"', 'system-ui', 'sans-serif'],
        golos: ['"Golos Text"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
