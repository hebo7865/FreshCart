/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    container: {
      screens:{
        '2xl': '1450px'
      },
      center:true
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

