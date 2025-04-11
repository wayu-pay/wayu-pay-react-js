import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import WayuPaymentFlow from './WayuPaymentFlow'; // Corregido: Importar desde el mismo directorio
// Eliminamos la importación global si ya no existe el archivo en src/stories
// import './storybook-global.css'; 

// Configuración Meta para el componente
const meta: Meta<typeof WayuPaymentFlow> = {
  title: 'Components/WayuPaymentFlow', // Cómo se mostrará en la barra lateral de Storybook
  component: WayuPaymentFlow,
  parameters: {
    // Opcional: Centra el componente en el canvas
    layout: 'centered',
  },
  tags: ['autodocs'], // Genera documentación automáticamente
  argTypes: {
    // Aquí puedes definir controles para las props en Storybook
    transactionId: {
      control: 'text',
      description: 'ID único de la transacción',
    },
    className: { control: 'text', description: 'Clase CSS adicional para el contenedor' },
    style: { control: 'object', description: 'Estilos en línea para el contenedor' },
    onComplete: { action: 'completed', description: 'Callback llamado al completar el flujo' },
    onError: { action: 'error', description: 'Callback llamado si ocurre un error' },
    // No incluimos `banks` aquí porque ahora es interno
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Historia básica
export const Default: Story = {
  args: {
    // Valores por defecto para las props en esta historia
    transactionId: 'TXN-12345-ABC',
    // No es necesario pasar `banks`
  },
};

// Podrías añadir más historias para diferentes estados o configuraciones
// export const WithCustomStyles: Story = {
//   args: {
//     transactionId: 'TXN-67890-XYZ',
//     className: 'custom-storybook-styles',
//   },
// }; 