/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mycolor: '#0000c3',
        bluecolor: '#11053b',
        sidecolor: '#1a2035',
        setgray: '#f5f5f5'
      },
      fontFamily: {
        inter: ['inter'],
        intermedium: ['inter-medium', 'sans'],
        interbold: ['inter-bold', 'sans']
      }
    },
  },
  plugins: [],
}

