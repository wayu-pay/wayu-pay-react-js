// src/index.ts
import './index.css';

// Por ahora estará vacío, pero aquí exportaremos nuestros componentes.
// Ejemplo:
// export { default as MyComponent } from './MyComponent';

// Exportamos usando alias para consistencia (opcional pero recomendado)
import C2P from './components/C2P/C2P';
import Checkout, { CheckoutComponent } from './components/checkout/Checkout';
import type { Bank } from './core/types/Bank';
import type { FormData } from './core/types/FormData';
import type { C2PProps } from './core/types/C2PProps';

// Exportación de componentes
export {
  C2P,
  Checkout,
  CheckoutComponent,
};

// Exportación de tipos
export type {
  Bank,
  FormData,
  C2PProps
};

// Exportación por defecto del componente principal
export default Checkout;

// Si necesitas exportar los tipos principales:
// export type { WayuPaymentFlowProps } from '@/components/WayuPaymentFlow/WayuPaymentFlow';

// También podríamos exportar los tipos si fueran necesarios para el consumidor
// export * from './WayuPaymentFlow'; // Exporta WayuPaymentFlowProps

// console.log('Wayu Pay React Library Entry Point'); // Ya no necesitamos este log 