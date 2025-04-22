import React, { useState, useEffect } from 'react';
import { BsCreditCard, BsPhone, BsBank, BsCurrencyBitcoin } from 'react-icons/bs';
import C2P from '../C2P/C2P';
import Modal from '../Modal';

export interface CheckoutProps {
  onComplete?: (data: any) => void;
  onError?: (error: any) => void;
  onPaymentStart?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onComplete, onError, onPaymentStart }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showWayuFlow, setShowWayuFlow] = useState(false);
  
  // Estados para los formularios
  const [ccFormData, setCcFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  });
  const [isCcFormValid, setIsCcFormValid] = useState(false);
  const [cryptoSelected, setCryptoSelected] = useState('BTC');
  const [isCryptoValid, setIsCryptoValid] = useState(true); // Por defecto es válido

  // Validar formulario de tarjeta de crédito
  useEffect(() => {
    const { cardNumber, expiryDate, cvc, cardholderName } = ccFormData;
    const isValid = 
      cardNumber.trim() !== '' && 
      expiryDate.trim() !== '' && 
      cvc.trim() !== '' && 
      cardholderName.trim() !== '';
    
    setIsCcFormValid(isValid);
  }, [ccFormData]);

  const handleCardClick = (optionId: string) => {
    if (onPaymentStart) {
      onPaymentStart();
    }
    
    setSelectedOption(optionId);
    
    // Si se selecciona la opción de Pago Móvil, mostrar el C2P
    if (optionId === 'pagoMovil') {
      setShowWayuFlow(true);
    } else {
      setShowWayuFlow(false);
    }
  };

  const resetToInitialState = () => {
    // Resetear el estado para volver a mostrar todas las opciones de pago
    setSelectedOption(null);
    setShowWayuFlow(false);
    // Limpiar datos de formularios
    setCcFormData({
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardholderName: ''
    });
    setCryptoSelected('BTC');
  };

  const handleCcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('cc-', '');
    setCcFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleCryptoSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCryptoSelected(e.target.value);
  };

  const handleWayuComplete = (data: any) => {
    // Cerrar el flujo de Wayu y pasar los datos al callback principal
    setShowWayuFlow(false);
    if (onComplete) {
      onComplete(data);
    }
    // Después de mostrar el JSON con los datos, volver a mostrar todas las opciones
    // Nota: No resetear completamente para que se vea el JSON con los datos del pago
  };

  const handleWayuError = (error: any) => {
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
        currency: cryptoSelected,
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

  // Renderizar el componente C2P si se selecciona la opción de Pago Móvil
  if (showWayuFlow) {
    return (
      <C2P 
        onComplete={handleWayuComplete} 
        onError={handleWayuError}
        onBack={() => setShowWayuFlow(false)}
      />
    );
  }

  // Mostrar los formularios específicos para cada método de pago
  const renderPaymentForm = () => {
    if (!selectedOption || selectedOption === 'pagoMovil') return null;

    return (
      <div className="max-w-3xl mx-auto p-5 md:p-8 my-6 font-sans bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {paymentOptions.find(option => option.id === selectedOption)?.title}
          </h2>
          <button 
            onClick={resetToInitialState}
            className="text-gray-400 hover:text-gray-700"
            aria-label="Volver a opciones de pago"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedOption === 'creditCard' && (
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!isCcFormValid) return;
              
              // Simular datos del pago con tarjeta de crédito
              const creditCardData = {
                method: 'creditCard',
                paymentInfo: {
                  cardNumber: ccFormData.cardNumber || '**** **** **** 1234',
                  expiryDate: ccFormData.expiryDate || '12/25',
                  cardholderName: ccFormData.cardholderName || 'Usuario de Prueba',
                  cvc: ccFormData.cvc || '123'
                }
              };
              if (onComplete) {
                onComplete(creditCardData);
              }
              resetToInitialState();
            }}>
              <div className="mb-4">
                <label htmlFor="cc-cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                <input 
                  type="text" 
                  id="cc-cardNumber" 
                  value={ccFormData.cardNumber}
                  onChange={handleCcInputChange}
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
                    value={ccFormData.expiryDate}
                    onChange={handleCcInputChange}
                    placeholder="MM/AA" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="cc-cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input 
                    type="text" 
                    id="cc-cvc" 
                    value={ccFormData.cvc}
                    onChange={handleCcInputChange}
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
                  value={ccFormData.cardholderName}
                  onChange={handleCcInputChange}
                  placeholder="Nombre Apellido" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={resetToInitialState}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={!isCcFormValid}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!isCcFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Pagar
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedOption === 'mercantilDebit' && (
          <div>
            <p className="text-gray-600 mb-4">Esta opción te redirigirá a la plataforma de pago de Mercantil para completar la transacción de forma segura.</p>
            <div className="flex space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={resetToInitialState}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleMercantilPayment}
              >
                Continuar con Mercantil
              </button>
            </div>
          </div>
        )}

        {selectedOption === 'crypto' && (
          <div>
            <p className="text-gray-600 mb-4">Selecciona la criptomoneda y sigue las instrucciones para enviar el pago a la dirección indicada.</p>
            <div className="mb-4">
              <label htmlFor="crypto-select" className="block text-sm font-medium text-gray-700 mb-1">Elige Criptomoneda:</label>
              <select 
                id="crypto-select" 
                value={cryptoSelected}
                onChange={handleCryptoSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
              </select>
            </div>
            <p className="text-sm text-gray-500 mb-2">Escanea el código QR o copia la dirección para realizar el pago.</p>
            <div className="bg-gray-100 p-4 text-center rounded my-4 border border-gray-200">
              <p className="text-gray-500">[Placeholder para Código QR y/o Dirección de Wallet]</p>
            </div>
            <div className="flex space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={resetToInitialState}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCryptoPayment}
              >
                He realizado el pago
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Si hay una opción seleccionada (excepto Pago Móvil que se maneja separadamente)
  if (selectedOption && selectedOption !== 'pagoMovil') {
    return renderPaymentForm();
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
    </div>
  );
};

// Exportar componente de ambas formas
export const CheckoutComponent = Checkout;
export default Checkout;