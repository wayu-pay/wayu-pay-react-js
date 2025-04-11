import React, { useState } from 'react';
import styles from './WayuPaymentFlow.module.css'; // Importa los CSS Modules

// Tipos de datos
interface Bank {
  id: string; // Usaremos el código SUDEBAN como ID por ejemplo
  name: string;
}

interface FormData {
  ciType: 'V' | 'E';
  ciNumber: string;
  phoneNumber: string;
  c2pCode: string;
}

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
  onError?: (error: Error) => void;
}

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
          <div className={styles.stepContainer}> {/* Contenedor para la transición */} 
            <h3 className={styles.stepTitle}>1. Selecciona tu banco</h3>
            <ul className={styles.bankList}>
              {banks.map((bank) => (
                <li key={bank.id} className={styles.bankItem} onClick={() => handleBankSelect(bank)}>
                  {bank.name}
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Paso 2: Ingresar Detalles */} 
        {currentStep === 'enterDetails' && selectedBank && (
          <form onSubmit={handleSubmit} className={styles.stepContainer}> {/* Contenedor para la transición */} 
            <h3 className={styles.stepTitle}>2. Ingresa tus datos ({selectedBank.name})</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="ci" className={styles.label}>Cédula de Identidad</label>
              <div className={styles.ciGroup}>
                <select 
                  name="ciType" 
                  value={formData.ciType} 
                  onChange={handleInputChange} 
                  className={styles.selectInput} 
                  aria-label="Tipo de Cédula"
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                </select>
                <input
                  type="text" 
                  id="ciNumber"
                  name="ciNumber"
                  value={formData.ciNumber}
                  onChange={handleInputChange}
                  placeholder="Ej: 12345678"
                  required
                  pattern="[0-9]*" 
                  inputMode="numeric" 
                  className={styles.textInput}
                  aria-label="Número de Cédula"
                />
              </div>
            </div>
    
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber" className={styles.label}>Número de Teléfono</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Ej: 04141234567"
                required
                className={styles.textInput}
              />
            </div>
    
            <div className={styles.formGroup}>
              <label htmlFor="c2pCode" className={styles.label}>Código C2P</label>
              <input
                type="text" 
                id="c2pCode"
                name="c2pCode"
                value={formData.c2pCode}
                onChange={handleInputChange}
                placeholder="Ingresa el código"
                required
                maxLength={6} 
                className={styles.textInput}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="button" onClick={handleBack} className={styles.secondaryButton}>
                Atrás
              </button>
              <button type="submit" className={styles.button}>
                Pagar
              </button>
            </div>
          </form>
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