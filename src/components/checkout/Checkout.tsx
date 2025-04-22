import React, { useState, useEffect } from 'react';
import { BsCreditCard, BsPhone, BsBank, BsCurrencyBitcoin } from 'react-icons/bs';
import C2P from '../C2P/C2P';
import CreditCard from '../CreditCard/CreditCard';
import MercantilDebit from '../MercantilDebit/MercantilDebit';
import Crypto from '../Crypto/Crypto';

export interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface CheckoutProps {
  onComplete?: (data: any) => void;
  onError?: (error: any) => void;
  onPaymentStart?: () => void;
  availablePaymentMethods?: PaymentMethod[]; // Para sobrescribir los métodos de la API si es necesario
}

// Mock de la API que devuelve los métodos de pago disponibles
const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  // Simulamos un retraso de la red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock de los datos que devolvería la API
  return [
    { 
      id: 'creditCard', 
      title: 'Tarjeta de Crédito', 
      description: 'Paga de forma segura con tu tarjeta',
      // Los íconos se añaden en el front ya que la API solo envía los IDs
    },
    { 
      id: 'pagoMovil', 
      title: 'Pago Móvil (C2P)', 
      description: 'Paga fácilmente con tu número de teléfono', 
    },
    // En el mock, Mercantil está desactivado (simulando configuración desde backend)
    // { 
    //   id: 'mercantilDebit', 
    //   title: 'Tarjeta Débito Mercantil', 
    //   description: 'Opción exclusiva para clientes de Mercantil', 
    // },
    // { 
    //   id: 'crypto', 
    //   title: 'Criptomonedas', 
    //   description: 'Paga con Bitcoin, Ethereum y más', 
    // },
  ];
};

// Mapeo de IDs de métodos de pago a íconos
const paymentMethodIcons: Record<string, React.ReactNode> = {
  creditCard: <BsCreditCard className="text-blue-600" size={24} />,
  pagoMovil: <BsPhone className="text-blue-600" size={24} />,
  mercantilDebit: <BsBank className="text-blue-600" size={24} />,
  crypto: <BsCurrencyBitcoin className="text-blue-600" size={24} />,
};

const Checkout: React.FC<CheckoutProps> = ({ 
  onComplete, 
  onError, 
  onPaymentStart,
  availablePaymentMethods 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showWayuFlow, setShowWayuFlow] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showMercantilDebit, setShowMercantilDebit] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Efecto para cargar los métodos de pago desde la "API"
  useEffect(() => {
    const loadPaymentMethods = async () => {
      if (availablePaymentMethods) {
        // Si se proporcionan métodos explícitamente, usar esos
        setPaymentMethods(availablePaymentMethods);
        return;
      }

      setLoading(true);
      try {
        const methods = await fetchPaymentMethods();
        // Añadir íconos a los métodos de pago
        const methodsWithIcons = methods.map(method => ({
          ...method,
          icon: paymentMethodIcons[method.id]
        }));
        setPaymentMethods(methodsWithIcons);
      } catch (error) {
        console.error('Error al cargar métodos de pago:', error);
        if (onError) {
          onError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethods();
  }, [availablePaymentMethods]);

  // Si solo hay un método de pago disponible, seleccionarlo automáticamente
  useEffect(() => {
    if (paymentMethods.length === 1 && !selectedOption && !loading) {
      handleCardClick(paymentMethods[0].id);
    }
  }, [paymentMethods, loading, selectedOption]);
  
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

  // Mostrar el estado de carga si estamos esperando la respuesta de la API
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-5 md:p-8 my-6 font-sans bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando métodos de pago...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje si no hay métodos de pago disponibles
  if (paymentMethods.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-5 md:p-8 my-6 font-sans bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col items-center justify-center h-40">
          <p className="text-gray-600 text-center">
            No hay métodos de pago disponibles en este momento.<br />
            Por favor intente más tarde.
          </p>
        </div>
      </div>
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
        {paymentMethods.map((option) => (
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