import React from 'react';
import { Bank } from './types'; // Actualizado: Importar desde el mismo directorio
import styles from '@/components/WayuPaymentFlow/WayuPaymentFlow.module.css'; // Usando alias

interface BankSelectionStepProps {
  banks: Bank[];
  onBankSelect: (bank: Bank) => void;
}

const BankSelectionStep: React.FC<BankSelectionStepProps> = ({ banks, onBankSelect }) => {
  return (
    <div>
      <h3 className={styles.stepTitle}>1. Selecciona tu banco</h3>
      <ul className={styles.bankList}>
        {banks.map((bank) => (
          <li key={bank.id} className={styles.bankItem} onClick={() => onBankSelect(bank)}>
            {bank.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankSelectionStep; 