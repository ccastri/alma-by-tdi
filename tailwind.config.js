import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px', // Ejemplo de configuración para el breakpoint xs (extra small)
        'sm': '640px',  // Ejemplo de configuración para el breakpoint sm (small)
        'md': '768px',  // Ejemplo de configuración para el breakpoint md (medium)
        'lg': '1024px', // Ejemplo de configuración para el breakpoint lg (large)
        'xl': '1280px', // Ejemplo de configuración para el breakpoint xl (extra large)
        // Puedes agregar más breakpoints según tus necesidades
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin, require('tailwind-scrollbar')({ nocompatible: true }),],
};
