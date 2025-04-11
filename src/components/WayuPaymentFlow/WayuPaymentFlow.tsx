import React, { useState } from 'react';
import styles from './WayuPaymentFlow.module.css'; // Importa los CSS Modules
import { Bank, FormData } from '@/internal/WayuPaymentFlow/types'; // Usando alias
import BankSelectionStep from '@/internal/WayuPaymentFlow/BankSelectionStep'; // Usando alias
import DetailsFormStep from '@/internal/WayuPaymentFlow/DetailsFormStep'; // Usando alias

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

// Define las props que recibirá el componente
interface WayuPaymentFlowProps {
  // Ejemplo: un ID de la transacción o configuración inicial
  transactionId: string;
  // Podríamos añadir props para personalizar estilos o clases
  className?: string;
  style?: React.CSSProperties;
  // Callback para cuando el flujo se completa
  onComplete?: (data: { bank: Bank; formData: FormData }) => void;
  // Callback para errores
  onError?: (error: Error | string) => void; // Permitir error string también
}

const WayuPaymentFlow: React.FC<WayuPaymentFlowProps> = ({
  // transactionId, // Descomentar si se usa
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

  const banks = internalBanks;

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentStep('enterDetails');
    setError(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      if (onError) onError('Error interno: No se seleccionó ningún banco.');
      setCurrentStep('selectBank');
      return;
    }
    // Validación básica (se puede expandir)
    if (!formData.ciNumber || !/^[0-9]+$/.test(formData.ciNumber)) {
      setError('Por favor, ingresa un número de cédula válido.');
      if (onError) onError('Cédula inválida');
      return;
    }
    if (!formData.phoneNumber || !/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      setError('Por favor, ingresa un número de teléfono válido (10 u 11 dígitos).');
       if (onError) onError('Teléfono inválido');
      return;
    }
    if (!formData.c2pCode || formData.c2pCode.length < 4) { // Ejemplo: mínimo 4 caracteres
      setError('Por favor, ingresa un código C2P válido.');
       if (onError) onError('Código C2P inválido');
      return;
    }

    console.log('Submitting payment details:', { bank: selectedBank, formData });
    if (onComplete) {
      onComplete({ bank: selectedBank, formData });
    }
    // Aquí podrías añadir lógica para mostrar un estado de éxito/carga 
    // antes de llamar a onComplete o después de una llamada API.
  };

  const handleBack = () => {
    setCurrentStep('selectBank');
    setSelectedBank(null);
    setError(null);
  };

  // Combina las clases del módulo con la clase externa si existe
  const containerClassName = `${styles.container} ${className || ''}`.trim();

  return (
    <div className={containerClassName} style={style}>
      <h2 className={styles.title}>Wayu Payment Flow</h2>
      
      <div className={styles.content}> {/* Mantenemos un contenedor para la animación */} 
        {error && <p className={styles.errorMessage}>{error}</p>}
  
        <div className={styles.stepContainer}> {/* Mantenemos un contenedor para la animación */} 
          {currentStep === 'selectBank' && (
            <BankSelectionStep 
              banks={banks} 
              onBankSelect={handleBankSelect} 
            />
          )}
    
          {currentStep === 'enterDetails' && selectedBank && (
            <DetailsFormStep
              selectedBank={selectedBank}
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <span>Powered by <strong>Wayu Pay</strong></span>
        {/* Aquí podrías incluir un logo SVG si lo tienes */}
      </footer>
    </div>
  );
};

export default WayuPaymentFlow; 