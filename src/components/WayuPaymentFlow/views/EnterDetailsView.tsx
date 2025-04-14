import React from 'react';
import { Bank } from '../types/Bank';
import { FormData } from '../types/FormData';
import styles from '../WayuPaymentFlow.module.css';

interface EnterDetailsViewProps {
  selectedBank: Bank;
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const EnterDetailsView: React.FC<EnterDetailsViewProps> = ({
  selectedBank,
  formData,
  onInputChange,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.stepContainer}> 
      <h3 className={styles.stepTitle}>2. Ingresa tus datos ({selectedBank.name})</h3>
      
      <div className={styles.formGroup}>
        <label htmlFor="documentNumber" className={styles.label}>Documento de Identidad</label>
        <div className={styles.ciGroup}>
          <select 
            name="documentType"
            value={formData.documentType}
            onChange={onInputChange}
            className={styles.selectInput}
            aria-label="Tipo de Documento"
          >
            <option value="V">V</option>
            <option value="E">E</option>
          </select>
          <input
            type="text" 
            id="documentNumber"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={onInputChange}
            placeholder="Ej: 12345678"
            required
            pattern="[0-9]*" 
            inputMode="numeric" 
            className={styles.textInput}
            aria-label="Número de Documento"
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          placeholder="Ingresa el código"
          required
          maxLength={6} 
          className={styles.textInput}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.secondaryButton}>
          Atrás
        </button>
        <button type="submit" className={styles.button}>
          Pagar
        </button>
      </div>
    </form>
  );
};

export default EnterDetailsView; 