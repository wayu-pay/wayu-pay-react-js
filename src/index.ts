// src/index.ts

// Por ahora estará vacío, pero aquí exportaremos nuestros componentes.
// Ejemplo:
// export { default as MyComponent } from './MyComponent';

// Exportamos usando alias para consistencia (opcional pero recomendado)
export { default as WayuPaymentFlow } from '@/components/WayuPaymentFlow/WayuPaymentFlow';

// Si necesitas exportar los tipos principales:
// export type { WayuPaymentFlowProps } from '@/components/WayuPaymentFlow/WayuPaymentFlow';

// También podríamos exportar los tipos si fueran necesarios para el consumidor
// export * from './WayuPaymentFlow'; // Exporta WayuPaymentFlowProps

// console.log('Wayu Pay React Library Entry Point'); // Ya no necesitamos este log 