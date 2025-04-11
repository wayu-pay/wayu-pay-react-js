import React from 'react';
import { Bank, FormData } from './types';
import styles from '@/components/WayuPaymentFlow/WayuPaymentFlow.module.css';

interface DetailsFormStepProps {
  selectedBank: Bank;
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const DetailsFormStep: React.FC<DetailsFormStepProps> = ({
  selectedBank,
  formData,
  onFormChange,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h3 className={styles.stepTitle}>2. Ingresa tus datos ({selectedBank.name})</h3>

      <div className={styles.formGroup}>
        <label htmlFor="ciNumber" className={styles.label}>Cédula de Identidad</label> 
        <div className={styles.ciGroup}>
          <select 
            name="ciType" 
            value={formData.ciType} 
            onChange={onFormChange} 
            className={styles.selectInput} 
            aria-label="Tipo de Cédula"
          >
            <option value="V">V</option>
            <option value="E">E</option>
          </select>
          <input
            type="text" 
            id="ciNumber" // Mantener id para el label
            name="ciNumber"
            value={formData.ciNumber}
            onChange={onFormChange}
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
          onChange={onFormChange}
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
          onChange={onFormChange}
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

export default DetailsFormStep; 