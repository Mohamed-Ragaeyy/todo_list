/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');

export default {
    content: [

        "./resources/views/**/*.blade.php", // Blade files
        "./resources/src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    // theme: {
    //     extend: {
    //       fontFamily: {
    //         sans: ['Poppins', 'sans-serif'],
    //       },
    //       gridTemplateColumns: {
    //         '70/30': '70% 28%',
    //       },
    //     },
    //   },
      darkMode: ['selector', '[class="p-dark"]'],
      plugins: [primeui]
};
