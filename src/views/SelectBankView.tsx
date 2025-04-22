import React from 'react';
import { Bank } from '../core/types/Bank';

interface SelectBankViewProps {
  banks: Bank[];
  onBankSelect: (bank: Bank) => void;
  onBack?: () => void;
}

const SelectBankView: React.FC<SelectBankViewProps> = ({ 
  banks, 
  onBankSelect,
  onBack 
}) => {
  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Selecciona tu banco</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {banks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => onBankSelect(bank)}
            className="flex items-center p-3 border border-gray-300 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <span className="font-medium">{bank.name}</span>
          </button>
        ))}
      </div>

      {onBack && (
        <div className="mt-6">
          <button 
            onClick={onBack}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectBankView; 