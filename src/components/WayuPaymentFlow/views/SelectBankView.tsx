import React from 'react';
import { Bank } from '../types/Bank';
import styles from '../WayuPaymentFlow.module.css';

interface SelectBankViewProps {
  banks: Bank[];
  onBankSelect: (bank: Bank) => void;
}

const SelectBankView: React.FC<SelectBankViewProps> = ({ banks, onBankSelect }) => {
  return (
    <div className={styles.stepContainer}> 
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

export default SelectBankView; 