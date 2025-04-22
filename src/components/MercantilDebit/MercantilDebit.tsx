import React from 'react';

export interface MercantilDebitProps {
  onComplete?: (data: any) => void;
  onBack?: () => void;
  className?: string;
}

const MercantilDebit: React.FC<MercantilDebitProps> = ({ onComplete, onBack, className }) => {
  const handlePayment = () => {
    // Simular datos del pago con tarjeta de débito Mercantil
    const mercantilData = {
      method: 'mercantilDebit',
      paymentInfo: {
        transactionId: `MERC-${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toISOString(),
      }
    };
    
    if (onComplete) {
      onComplete(mercantilData);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto p-5 md:p-8 bg-white rounded-lg shadow-sm ${className || ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tarjeta Débito Mercantil
        </h2>
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-gray-700"
          aria-label="Volver a opciones de pago"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div>
        <p className="text-gray-600 mb-4">Esta opción te redirigirá a la plataforma de pago de Mercantil para completar la transacción de forma segura.</p>
        <div className="flex space-x-3">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={onBack}
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handlePayment}
          >
            Continuar con Mercantil
          </button>
        </div>
      </div>
    </div>
  );
};

export default MercantilDebit; 