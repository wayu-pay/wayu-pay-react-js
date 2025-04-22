# Wayu Pay React Components

Componentes de React para implementar el flujo de pago de Wayu Pay.

## Instalación

```bash
npm install wayu-pay-react-components
```

## Uso

Es **crucial** importar tanto los componentes como los estilos CSS para que los componentes se muestren correctamente:

```jsx
// Importar los estilos (¡IMPORTANTE!)
import 'wayu-pay-react-components/dist/wayu-pay-react-components.css';

// Importar el componente principal
import { Checkout } from 'wayu-pay-react-components';

function App() {
  return (
    <div>
      <h1>Mi Aplicación de Pago</h1>
      <Checkout 
        onComplete={(data) => console.log('Pago completado', data)}
        onError={(error) => console.error('Error en el pago', error)}
      />
    </div>
  );
}
```

## Componentes Disponibles

### Checkout

Componente principal que muestra las opciones de pago:

- Tarjeta de Crédito
- Pago Móvil (C2P)
- Tarjeta Débito Mercantil
- Criptomonedas

### C2P

Flujo específico para el pago móvil C2P (usado internamente por Checkout).

## Problemas de Estilos

Si los estilos no se muestran correctamente, asegúrate de:

1. Haber importado el archivo CSS como se indica arriba
2. Verificar que tu bundler (webpack, vite, etc.) está configurado para manejar archivos CSS
3. Si usas Next.js, importa los estilos en `_app.js` o `app/layout.js`

## Licencia

ISC 