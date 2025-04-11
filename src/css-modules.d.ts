// src/css-modules.d.ts

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Añade otras extensiones si las usas (e.g., .module.sass) 