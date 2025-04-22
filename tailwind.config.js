/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  safelist: [
    // Agrega aquí clases que puedan ser usadas dinámicamente
    'bg-blue-600',
    'text-blue-600',
    'hover:bg-blue-700',
    'hover:border-blue-500',
    'hover:bg-blue-50',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'bg-red-100',
    'text-red-600',
    'bg-gray-200',
    'text-gray-700',
    'hover:bg-gray-300'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

