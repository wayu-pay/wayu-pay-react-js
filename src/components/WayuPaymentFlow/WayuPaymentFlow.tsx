import React, { useState } from 'react';
import styles from './WayuPaymentFlow.module.css'; // Importa los CSS Modules
import { Bank } from './types/Bank';
import { FormData } from './types/FormData';
import { WayuPaymentFlowProps } from './types/WayuPaymentFlowProps';
import SelectBankView from './views/SelectBankView';
import EnterDetailsView from './views/EnterDetailsView';

// Tipos de datos

// Lista de bancos interna (Ejemplo con bancos de Venezuela)
const internalBanks: Bank[] = [
  { id: '0102', name: 'Banco de Venezuela' },
  { id: '0134', name: 'Banesco' },
  { id: '0108', name: 'Banco Provincial' },
  { id: '0105', name: 'Banco Mercantil' },
  { id: '0175', name: 'Banco Bicentenario' },
  { id: '0191', name: 'Banco Nacional de Crédito (BNC)' },
  // ... Añadir más bancos según sea necesario
];

const WayuPaymentFlow: React.FC<WayuPaymentFlowProps> = ({
  transactionId,
  className,
  style,
  onComplete,
  onError,
}) => {
  const [currentStep, setCurrentStep] = useState<'selectBank' | 'enterDetails'>('selectBank');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState<FormData>({
    ciType: 'V',
    ciNumber: '',
    phoneNumber: '',
    c2pCode: '',
  });
  const [error, setError] = useState<string | null>(null);

  // Usamos la lista interna
  const banks = internalBanks;

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentStep('enterDetails');
    setError(null); // Limpiar errores al cambiar de paso
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
    // Aquí iría la validación de los datos
    if (!selectedBank) {
      setError('Error interno: No se seleccionó ningún banco.');
      setCurrentStep('selectBank'); // Volver al paso anterior si falta el banco
      return;
    }
    if (!formData.ciNumber || !formData.phoneNumber || !formData.c2pCode) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    console.log('Submitting payment details:', { bank: selectedBank, formData });

    // Llamar al callback onComplete con los datos recolectados
    if (onComplete) {
      onComplete({ bank: selectedBank, formData });
    }
  };

  const handleBack = () => {
    setCurrentStep('selectBank');
    setSelectedBank(null);
    setFormData({
        ciType: 'V',
        ciNumber: '',
        phoneNumber: '',
        c2pCode: '',
    });
    setError(null);
  }

  // Combina las clases del módulo con la clase externa si existe
  const containerClassName = `${styles.container} ${className || ''}`.trim();

  return (
    <div className={containerClassName} style={style}>
      <h2 className={styles.title}>Wayu Payment Flow</h2>
      
      <div className={styles.content}> {/* Envuelve el contenido principal */} 
        {error && <p className={styles.errorMessage}>{error}</p>}
  
        {/* Paso 1: Seleccionar Banco */} 
        {currentStep === 'selectBank' && (
          <SelectBankView banks={banks} onBankSelect={handleBankSelect} />
        )}
  
        {/* Paso 2: Ingresar Detalles */} 
        {currentStep === 'enterDetails' && selectedBank && (
           <EnterDetailsView 
             selectedBank={selectedBank}
             formData={formData}
             onInputChange={handleInputChange}
             onSubmit={handleSubmit}
             onBack={handleBack}
           />
        )}
      </div> {/* Fin de .content */} 

      <footer className={styles.footer}>
        <span>Powered by <strong>Wayu Pay</strong></span>
        {/* Aquí podrías incluir un logo SVG si lo tienes */}
      </footer>
    </div>
  );
};

export default WayuPaymentFlow; 