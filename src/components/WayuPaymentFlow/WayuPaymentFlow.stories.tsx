import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import WayuPaymentFlow from './WayuPaymentFlow'; // Corregido: Importar desde el mismo directorio
import { Bank } from './types/Bank'; // Import necessary types
import { FormData } from './types/FormData';
import { WayuPaymentFlowProps } from './types/WayuPaymentFlowProps'; // Import Props type
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
    className: { control: 'text', description: 'Clase CSS adicional para el contenedor' },
    style: { control: 'object', description: 'Estilos en línea para el contenedor' },
    onComplete: { action: 'completed', description: 'Callback llamado al completar el flujo' },
    onError: { action: 'error', description: 'Callback llamado si ocurre un error' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Base story rendering function
// Revert explicit typing of args here, let Storybook infer or use its own type
const Template: Story['render'] = (args) => {
  const [completedData, setCompletedData] = useState<{ bank: Bank; formData: FormData } | null>(null);

  // Get the original onComplete from args, if it exists
  const originalOnComplete = args.onComplete;

  const handleComplete = (data: { bank: Bank; formData: FormData }) => {
    console.log('Payment Completed:', data);
    setCompletedData(data);
    // Call the original onComplete from args if it was provided
    if (typeof originalOnComplete === 'function') {
      originalOnComplete(data);
    }
  };
  
  return (
    <div>
      {/* Pass required props explicitly, spread the rest, override onComplete */}
      <WayuPaymentFlow 
        {...args} // Spread args first (includes style, className, etc.)
        onComplete={handleComplete} // Use our wrapper for onComplete
        // onError is passed via {...args}
      />
      {completedData && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h4>Data Received onComplete:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(completedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Historia básica
export const Default: Story = {
  render: Template, 
  args: {
    onError: (error: Error) => console.error('Payment Error:', error),
    style: { minWidth: '350px' }, 
    // Add a placeholder onComplete action to args if needed for demonstration
    // onComplete: (data) => console.log('Original onComplete called in story args:', data),
  },
};

// Podrías añadir más historias para diferentes estados o configuraciones
// export const WithCustomStyles: Story = {
//   args: {
//     transactionId: 'TXN-67890-XYZ',
//     className: 'custom-storybook-styles',
//   },
// }; 