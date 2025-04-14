import React, { useState } from 'react';
import styles from './WayuPaymentFlow.module.css';
import { Bank } from './types/Bank';
import { FormData } from './types/FormData';
import { WayuPaymentFlowProps } from './types/WayuPaymentFlowProps';
import SelectBankView from './views/SelectBankView';
import EnterDetailsView from './views/EnterDetailsView';


const internalBanks: Bank[] = [
  { id: '0102', name: 'Banco de Venezuela' },
  { id: '0134', name: 'Banesco' },
  { id: '0108', name: 'Banco Provincial' },
  { id: '0105', name: 'Banco Mercantil' },
  { id: '0175', name: 'Banco Bicentenario' },
  { id: '0191', name: 'Banco Nacional de Crédito (BNC)' },
];

const WayuPaymentFlow: React.FC<WayuPaymentFlowProps> = ({
  className,
  style,
  onComplete,
  onError,
}) => {
  const [currentStep, setCurrentStep] = useState<'selectBank' | 'enterDetails'>('selectBank');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState<FormData>({
    documentType: 'V',
    documentNumber: '',
    phoneNumber: '',
    c2pCode: '',
  });
  const [error, setError] = useState<string | null>(null);

  const banks = internalBanks;

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentStep('enterDetails');
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedBank) {
      setError('Error interno: No se seleccionó ningún banco.');
      setCurrentStep('selectBank');
      return;
    }
    if (!formData.documentNumber || !formData.phoneNumber || !formData.c2pCode) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    if (onComplete) {
      onComplete({ bank: selectedBank, formData });
    }
  };

  const handleBack = () => {
    setCurrentStep('selectBank');
    setSelectedBank(null);
    setFormData({
        documentType: 'V',
        documentNumber: '',
        phoneNumber: '',
        c2pCode: '',
    });
    setError(null);
  }

  const containerClassName = `${styles.container} ${className || ''}`.trim();

  return (
    <div className={containerClassName} style={style}>
      <h2 className={styles.title}>Wayu Payment Flow</h2>
      
      <div className={styles.content}>
        {error && <p className={styles.errorMessage}>{error}</p>}
  
        {currentStep === 'selectBank' && (
          <SelectBankView banks={banks} onBankSelect={handleBankSelect} />
        )}
  
        {currentStep === 'enterDetails' && selectedBank && (
           <EnterDetailsView 
             selectedBank={selectedBank}
             formData={formData}
             onInputChange={handleInputChange}
             onSubmit={handleSubmit}
             onBack={handleBack}
           />
        )}
      </div> 

      <footer className={styles.footer}>
        <span>Powered by <strong>Wayu Pay</strong></span>
      </footer>
    </div>
  );
};

export default WayuPaymentFlow; 