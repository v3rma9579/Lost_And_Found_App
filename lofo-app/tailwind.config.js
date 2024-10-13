/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: [ 'Poppins', 'sans-serif'],
        rubik: [ 'Rubik', ],
        jakarta: ['Jakarta'],
    },
    fontWeight: {
      p4: '400',
      p8: '800',
    },
  },
  plugins: [],
}
}
