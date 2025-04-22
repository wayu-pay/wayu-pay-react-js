import React, { useState } from 'react';
import { BsCreditCard, BsPhone, BsBank, BsCurrencyBitcoin } from 'react-icons/bs';
import C2P from '../C2P/C2P';
import CreditCard from '../CreditCard/CreditCard';
import MercantilDebit from '../MercantilDebit/MercantilDebit';
import Crypto from '../Crypto/Crypto';

export interface CheckoutProps {
  onComplete?: (data: any) => void;
  onError?: (error: any) => void;
  onPaymentStart?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onComplete, onError, onPaymentStart }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showWayuFlow, setShowWayuFlow] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showMercantilDebit, setShowMercantilDebit] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  
  const handleCardClick = (optionId: string) => {
    if (onPaymentStart) {
      onPaymentStart();
    }
    
    setSelectedOption(optionId);
    
    // Resetear todos los estados de visualización
    setShowWayuFlow(false);
    setShowCreditCard(false);
    setShowMercantilDebit(false);
    setShowCrypto(false);
    
    // Activar el componente correspondiente según la opción seleccionada
    switch(optionId) {
      case 'pagoMovil':
        setShowWayuFlow(true);
        break;
      case 'creditCard':
        setShowCreditCard(true);
        break;
      case 'mercantilDebit':
        setShowMercantilDebit(true);
        break;
      case 'crypto':
        setShowCrypto(true);
        break;
    }
  };

  const resetToInitialState = () => {
    // Resetear el estado para volver a mostrar todas las opciones de pago
    setSelectedOption(null);
    setShowWayuFlow(false);
    setShowCreditCard(false);
    setShowMercantilDebit(false);
    setShowCrypto(false);
  };

  const handlePaymentComplete = (data: any) => {
    if (onComplete) {
      onComplete(data);
    }
    resetToInitialState();
  };

  const handlePaymentError = (error: any) => {
    if (onError) {
      onError(error);
    }
    resetToInitialState();
  };

  // Manejadores para los botones de pago
  const handleMercantilPayment = () => {
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
    resetToInitialState();
  };

  const handleCryptoPayment = () => {
    // Simular datos del pago con criptomonedas
    const cryptoData = {
      method: 'crypto',
      paymentInfo: {
        currency: 'BTC',
        amount: '0.0025',
        walletAddress: '0x1234567890abcdef',
        transactionId: `CRYPTO-${Math.floor(Math.random() * 1000000)}`,
      }
    };
    if (onComplete) {
      onComplete(cryptoData);
    }
    resetToInitialState();
  };

  const paymentOptions = [
    { 
      id: 'creditCard', 
      title: 'Tarjeta de Crédito', 
      description: 'Paga de forma segura con tu tarjeta', 
      icon: <BsCreditCard className="text-blue-600" size={24} /> 
    },
    { 
      id: 'pagoMovil', 
      title: 'Pago Móvil (C2P)', 
      description: 'Paga fácilmente con tu número de teléfono', 
      icon: <BsPhone className="text-blue-600" size={24} /> 
    },
    { 
      id: 'mercantilDebit', 
      title: 'Tarjeta Débito Mercantil', 
      description: 'Opción exclusiva para clientes de Mercantil', 
      icon: <BsBank className="text-blue-600" size={24} /> 
    },
    { 
      id: 'crypto', 
      title: 'Criptomonedas', 
      description: 'Paga con Bitcoin, Ethereum y más', 
      icon: <BsCurrencyBitcoin className="text-blue-600" size={24} /> 
    },
  ];

  // Renderizar el componente correspondiente según la opción seleccionada
  if (showWayuFlow) {
    return (
      <C2P 
        onComplete={handlePaymentComplete} 
        onError={handlePaymentError}
        onBack={resetToInitialState}
      />
    );
  }

  if (showCreditCard) {
    return (
      <CreditCard 
        onComplete={handlePaymentComplete}
        onBack={resetToInitialState}
      />
    );
  }

  if (showMercantilDebit) {
    return (
      <MercantilDebit 
        onComplete={handlePaymentComplete}
        onBack={resetToInitialState}
      />
    );
  }

  if (showCrypto) {
    return (
      <Crypto 
        onComplete={handlePaymentComplete}
        onBack={resetToInitialState}
      />
    );
  }

  // Mostrar la lista de opciones de pago si no hay ninguna seleccionada
  return (
    <div className="max-w-3xl mx-auto p-5 md:p-8 my-6 font-sans bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
        Selecciona tu método de pago
      </h2>

      {/* Grid de Opciones de Pago */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`
              flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ease-in-out bg-white
              hover:border-gray-400 hover:shadow-md
              ${selectedOption === option.id ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' : 'border-gray-300'}
            `}
            onClick={() => handleCardClick(option.id)}
          >
            <div className="mr-4 flex-shrink-0">{option.icon}</div>
            <div className="flex-grow">
              <h3 className="font-semibold text-base text-gray-800 mb-1">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
      <footer className="text-center mt-6 text-sm text-gray-500">
        <span>Powered by <strong className="font-semibold">Wayu Pay</strong></span>
      </footer>
    </div>
  );
};

// Exportar componente de ambas formas
export const CheckoutComponent = Checkout;
export default Checkout;