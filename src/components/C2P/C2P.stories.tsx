import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import C2P from './C2P';

import { Bank } from '../../core/types/Bank';
import { FormData } from '../../core/types/FormData';

// Configuración Meta para el componente
const meta: Meta<typeof C2P> = {
  title: 'Components/C2P',
  component: C2P,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Clase CSS adicional para el contenedor' },
    style: { control: 'object', description: 'Estilos en línea para el contenedor' },
    onComplete: { action: 'completed', description: 'Callback llamado al completar el flujo' },
    onError: { action: 'error', description: 'Callback llamado si ocurre un error' },
    onBack: { action: 'back', description: 'Callback llamado al presionar el botón Atrás' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Función de renderizado base para la historia
const Template: Story['render'] = (args) => {
  const [completedData, setCompletedData] = useState<{ bank: Bank; formData: FormData } | null>(null);

  // Obtener el onComplete original de los args
  const originalOnComplete = args.onComplete;

  const handleComplete = (data: { bank: Bank; formData: FormData }) => {
    console.log('Payment Completed:', data);
    setCompletedData(data);
    // Llamar al onComplete original si se proporcionó
    if (typeof originalOnComplete === 'function') {
      originalOnComplete(data);
    }
  };
  
  return (
    <div>
      <C2P 
        {...args}
        onComplete={handleComplete}
      />
      {completedData && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h4 className="font-semibold text-base mb-2">Pago completado exitosamente:</h4>
          <pre className="whitespace-pre-wrap break-words text-sm bg-white p-3 rounded border border-gray-200">
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
    onBack: () => console.log('Back button pressed'),
  },
}; 