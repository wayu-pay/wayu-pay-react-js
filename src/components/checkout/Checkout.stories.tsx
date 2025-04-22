import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkout from './Checkout';
import { Bank } from '../../core/types/Bank';
import { FormData } from '../../core/types/FormData';

// Configuración Meta para el componente
const meta: Meta<typeof Checkout> = {
  title: 'Components/Checkout',
  component: Checkout,
  parameters: {
    layout: 'centered',
    badges: ['autodocs', 'stable'],
    viewMode: 'story', // Mostrar siempre la story, no la documentación
  },
  argTypes: {
    onComplete: { action: 'completed', description: 'Callback llamado al completar el flujo' },
    onError: { action: 'error', description: 'Callback llamado si ocurre un error' },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Función de renderizado base para la historia
const Template: Story['render'] = (args) => {
  const [completedData, setCompletedData] = useState<{ bank?: Bank; formData?: FormData } | null>(null);

  // Obtener el onComplete original de los args, si existe
  const originalOnComplete = args.onComplete;

  const handleComplete = (data: any) => {
    console.log('Payment Completed:', data);
    setCompletedData(data);
    // Llamar al onComplete original de los args si se proporcionó
    if (typeof originalOnComplete === 'function') {
      originalOnComplete(data);
    }
  };
  
  // Envolvemos el componente Checkout en un wrapper para controlar el estado
  const CheckoutWrapper = () => {
    // Esta función será llamada cuando se inicie un nuevo flujo de pago
    const handlePaymentStart = () => {
      setCompletedData(null);
    };
    
    return (
      <Checkout 
        {...args}
        onComplete={handleComplete}
        onPaymentStart={handlePaymentStart}
      />
    );
  };
  
  return (
    <div className="w-full">
      <CheckoutWrapper />
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
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista predeterminada del componente Checkout con las 4 opciones de pago.',
      },
    },
  },
}; 