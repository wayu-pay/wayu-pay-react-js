import React, { useState, useEffect } from 'react';
import { Bank } from '../../core/types/Bank';
import { C2PProps } from '../../core/types/C2PProps';
import { FormData } from '../../core/types/FormData';

// Import existing components
import SelectBankView from '../../views/SelectBankView';
import EnterDetailsView from '../../views/EnterDetailsView';

// Use the original Venezuela bank list
const internalBanks: Bank[] = [
  { id: '0102', name: 'Banco de Venezuela' },
  { id: '0134', name: 'Banesco' },
  { id: '0108', name: 'Banco Provincial' },
  { id: '0105', name: 'Banco Mercantil' },
  { id: '0175', name: 'Banco Bicentenario' },
  { id: '0191', name: 'Banco Nacional de Crédito (BNC)' },
];

enum Step {
  SELECT_BANK = 'SELECT_BANK',
  ENTER_DETAILS = 'ENTER_DETAILS',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

// Definir los requisitos de longitud máxima para cada campo
const MAX_LENGTHS = {
  documentNumber: 8,
  phoneNumber: 11,
  c2pCode: 8,
};

const C2P: React.FC<C2PProps> = ({
  className,
  style,
  onComplete,
  onError,
  onBack,
}) => {
  const [step, setStep] = useState<Step>(Step.SELECT_BANK);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState<FormData>({
    documentType: 'V',
    documentNumber: '',
    phoneNumber: '',
    c2pCode: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Validar formulario cada vez que los datos cambian
  useEffect(() => {
    // Verificar que todos los campos requeridos estén completos y tengan la longitud adecuada
    const documentNumberValid = formData.documentNumber.length === MAX_LENGTHS.documentNumber;
    const phoneNumberValid = formData.phoneNumber.length === MAX_LENGTHS.phoneNumber;
    const c2pCodeValid = formData.c2pCode.length === MAX_LENGTHS.c2pCode;
    
    setIsFormValid(documentNumberValid && phoneNumberValid && c2pCodeValid);
  }, [formData]);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setStep(Step.ENTER_DETAILS);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validaciones específicas para cada campo
    if (name === 'documentNumber' || name === 'phoneNumber') {
      // Solo permitir números y respetar la longitud máxima
      if (/^\d*$/.test(value) && (name !== 'documentNumber' || value.length <= MAX_LENGTHS.documentNumber) && 
          (name !== 'phoneNumber' || value.length <= MAX_LENGTHS.phoneNumber)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === 'c2pCode') {
      // Permitir alfanuméricos y respetar la longitud máxima
      if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= MAX_LENGTHS.c2pCode) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      // Para otros campos (como documentType)
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar que el formulario sea válido antes de enviar
    if (!isFormValid) {
      setErrorMessage('Por favor, completa todos los campos correctamente.');
      return;
    }
    
    // Limpiar mensajes de error anteriores
    setErrorMessage('');
    
    // Simulating a successful payment
    // In a real scenario, this would be an API call
    try {
      // Mock API call
      // const response = await api.submitPayment({ bank: selectedBank, formData: data });
      
      if (onComplete && selectedBank) {
        onComplete({ bank: selectedBank, formData });
      }
      setStep(Step.SUCCESS);
    } catch (error) {
      setErrorMessage('Payment failed');
      if (onError) {
        onError(new Error('Payment failed'));
      }
      setStep(Step.FAIL);
    }
  };

  const handleBack = () => {
    if (step === Step.ENTER_DETAILS) {
      setStep(Step.SELECT_BANK);
    } else if (onBack) {
      onBack();
    }
  };

  const handleRetry = () => {
    setStep(Step.SELECT_BANK);
    setSelectedBank(null);
    setFormData({
      documentType: 'V',
      documentNumber: '',
      phoneNumber: '',
      c2pCode: '',
    });
    setErrorMessage('');
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 bg-white rounded-lg shadow ${className || ''}`} style={style}>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Pago Móvil C2P</h2>
      
      <div className="mb-6">
        {errorMessage && <p className="p-3 text-sm text-red-600 bg-red-100 rounded-md mb-4">{errorMessage}</p>}
  
        {step === Step.SELECT_BANK && (
          <SelectBankView 
            banks={internalBanks} 
            onBankSelect={handleBankSelect} 
            onBack={onBack}
          />
        )}
        
        {step === Step.ENTER_DETAILS && selectedBank && (
          <EnterDetailsView 
            selectedBank={selectedBank} 
            formData={formData} 
            onInputChange={handleInputChange}
            onSubmit={handleFormSubmit}
            onBack={handleBack}
            isFormValid={isFormValid}
          />
        )}
        
        {step === Step.SUCCESS && (
          <div className="text-center p-4">
            <h3 className="text-xl font-semibold mb-4 text-green-600">¡Pago Exitoso!</h3>
            <p className="mb-4 text-gray-700">Tu pago ha sido procesado correctamente.</p>
            <button 
              onClick={() => {
                if (onBack) onBack();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Volver
            </button>
          </div>
        )}
        
        {step === Step.FAIL && (
          <div className="text-center p-4">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Error en el Pago</h3>
            <p className="mb-4 text-gray-700">{errorMessage || "Ha ocurrido un error al procesar tu pago."}</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Intentar de nuevo
            </button>
          </div>
        )}
      </div> 

      <footer className="text-center mt-6 text-sm text-gray-500">
        <span>Powered by <strong className="font-semibold">Wayu Pay</strong></span>
      </footer>
    </div>
  );
};

export default C2P; 