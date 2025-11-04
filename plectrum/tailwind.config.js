/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'eclipse': {
          'dark': '#0F0E47',      // Very dark navy
          'indigo': '#272757',     // Dark indigo blue
          'purple': '#505081',     // Darker purple-blue
          'lavender': '#8686AC',   // Muted lavender-blue
        },
      },
    },
  },
  plugins: [],
}

