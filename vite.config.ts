import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ // Plugin para generar automáticamente los archivos .d.ts
      insertTypesEntry: true, // Inserta la entrada de tipos en package.json
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    lib: {
      // Podría ser el punto de entrada de tu librería,
      // ej. src/index.ts
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WayuPayReactComponents',
      // Los formatos adecuados dependerán de tu caso de uso
      // Se recomienda generar 'es' y 'umd'
      formats: ['es', 'umd'],
      fileName: (format) => `wayu-pay-react-components.${format}.js`,
    },
    rollupOptions: {
      // Asegúrate de externalizar las dependencias que no deben
      // empaquetarse en tu librería
      external: ['react', 'react-dom'],
      output: {
        // Proporciona nombres globales para las dependencias externalizadas
        // en el build UMD
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Asegúrate de que CSS se exporte como un archivo separado
        assetFileNames: (assetInfo) => {
          return assetInfo.name === 'style.css' ? 'wayu-pay-react-components.css' : assetInfo.name || '';
        },
      },
    },
    // Asegúrate de que el CSS se incluya
    cssCodeSplit: false,
  },
}); 