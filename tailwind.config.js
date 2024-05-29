const { PRIMARY_OUTLET } = require('@angular/router')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5c059b",
        secondary: "#1e293b",
        accent: "#cb5930",
        danger: "#f00"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

