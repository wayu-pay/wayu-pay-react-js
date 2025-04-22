import React, { useState } from 'react';

export interface CryptoProps {
  onComplete?: (data: any) => void;
  onBack?: () => void;
  className?: string;
}

const Crypto: React.FC<CryptoProps> = ({ onComplete, onBack, className }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

  const handleCryptoSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(e.target.value);
  };

  const handlePayment = () => {
    // Simular datos del pago con criptomonedas
    const cryptoData = {
      method: 'crypto',
      paymentInfo: {
        currency: selectedCrypto,
        amount: '0.0025',
        walletAddress: '0x1234567890abcdef',
        transactionId: `CRYPTO-${Math.floor(Math.random() * 1000000)}`,
      }
    };
    
    if (onComplete) {
      onComplete(cryptoData);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto p-5 md:p-8 bg-white rounded-lg shadow-sm ${className || ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Pago con Criptomonedas
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
        <p className="text-gray-600 mb-4">Selecciona la criptomoneda y sigue las instrucciones para enviar el pago a la dirección indicada.</p>
        <div className="mb-4">
          <label htmlFor="crypto-select" className="block text-sm font-medium text-gray-700 mb-1">Elige Criptomoneda:</label>
          <select 
            id="crypto-select" 
            value={selectedCrypto}
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
            onClick={onBack}
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handlePayment}
          >
            He realizado el pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crypto; 