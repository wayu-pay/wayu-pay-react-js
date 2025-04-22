import React, { useState, useEffect } from 'react';

export interface CreditCardProps {
  onComplete?: (data: any) => void;
  onBack?: () => void;
  className?: string;
}

interface CreditCardFormData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardholderName: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ onComplete, onBack, className }) => {
  const [formData, setFormData] = useState<CreditCardFormData>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Validar formulario
  useEffect(() => {
    const { cardNumber, expiryDate, cvc, cardholderName } = formData;
    const isValid = 
      cardNumber.trim() !== '' && 
      expiryDate.trim() !== '' && 
      cvc.trim() !== '' && 
      cardholderName.trim() !== '';
    
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('cc-', '');
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Simular datos del pago con tarjeta de crédito
    const creditCardData = {
      method: 'creditCard',
      paymentInfo: {
        cardNumber: formData.cardNumber || '**** **** **** 1234',
        expiryDate: formData.expiryDate || '12/25',
        cardholderName: formData.cardholderName || 'Usuario de Prueba',
        cvc: formData.cvc || '123'
      }
    };
    
    if (onComplete) {
      onComplete(creditCardData);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto p-5 md:p-8 bg-white rounded-lg shadow-sm ${className || ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tarjeta de Crédito
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
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cc-cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
          <input 
            type="text" 
            id="cc-cardNumber" 
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="**** **** **** ****" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="cc-expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Vencimiento</label>
            <input 
              type="text" 
              id="cc-expiryDate" 
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/AA" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="cc-cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
            <input 
              type="text" 
              id="cc-cvc" 
              value={formData.cvc}
              onChange={handleInputChange}
              placeholder="123" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="cc-cardholderName" className="block text-sm font-medium text-gray-700 mb-1">Nombre en la Tarjeta</label>
          <input 
            type="text" 
            id="cc-cardholderName" 
            value={formData.cardholderName}
            onChange={handleInputChange}
            placeholder="Nombre Apellido" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div className="flex space-x-3">
          <button 
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={!isFormValid}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCard; 