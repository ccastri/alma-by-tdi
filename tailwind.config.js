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
      fontSize: {
        '2xs': '0.5rem',     // Extra Small
        'xs': '0.75rem',     // Extra Small
        'sm': '0.875rem',    // Small
        'base': '1rem',     // Default
        'lg': '1.125rem',    // Large
        'xl': '1.25rem',     // Extra Large
        '2xl': '1.5rem',     // 2X Large
        // Add more font sizes as needed
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin, require('tailwind-scrollbar')({ nocompatible: true }),],
};
