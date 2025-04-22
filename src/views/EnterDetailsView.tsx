import React from 'react';
import { Bank } from '../core/types/Bank';
import { FormData } from '../core/types/FormData';

interface EnterDetailsViewProps {
  selectedBank: Bank;
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isFormValid?: boolean;
}

const EnterDetailsView: React.FC<EnterDetailsViewProps> = ({
  selectedBank,
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isFormValid = true,
}) => {
  // Definir los requisitos de longitud máxima para cada campo
  const MAX_LENGTHS = {
    documentNumber: 8,
    phoneNumber: 11,
    c2pCode: 8,
  };

  // Calcular el porcentaje de completitud para cada campo
  const getCompletionPercentage = (fieldName: keyof typeof MAX_LENGTHS, value: string) => {
    const maxLength = MAX_LENGTHS[fieldName];
    const currentLength = value.length;
    return (currentLength / maxLength) * 100;
  };

  return (
    <form onSubmit={onSubmit} className="py-4"> 
      <h3 className="text-xl font-semibold mb-4 text-gray-800">2. Ingresa tus datos ({selectedBank.name})</h3>
      
      <div className="mb-4">
        <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Documento de Identidad 
          <span className="text-xs text-gray-500 ml-1">
            ({formData.documentNumber.length}/{MAX_LENGTHS.documentNumber})
          </span>
        </label>
        <div className="flex">
          <select 
            name="documentType"
            value={formData.documentType}
            onChange={onInputChange}
            className="w-auto rounded-l-md border-r-0 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
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
            maxLength={MAX_LENGTHS.documentNumber}
            className="flex-1 rounded-r-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            aria-label="Número de Documento"
          />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${getCompletionPercentage('documentNumber', formData.documentNumber)}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Número de Teléfono
          <span className="text-xs text-gray-500 ml-1">
            ({formData.phoneNumber.length}/{MAX_LENGTHS.phoneNumber})
          </span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onInputChange}
          placeholder="Ej: 04141234567"
          required
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={MAX_LENGTHS.phoneNumber}
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${getCompletionPercentage('phoneNumber', formData.phoneNumber)}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="c2pCode" className="block text-sm font-medium text-gray-700 mb-1">
          Código C2P
          <span className="text-xs text-gray-500 ml-1">
            ({formData.c2pCode.length}/{MAX_LENGTHS.c2pCode})
          </span>
        </label>
        <input
          type="text" 
          id="c2pCode"
          name="c2pCode"
          value={formData.c2pCode}
          onChange={onInputChange}
          placeholder="Ingresa el código"
          required
          maxLength={MAX_LENGTHS.c2pCode}
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${getCompletionPercentage('c2pCode', formData.c2pCode)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex space-x-3 justify-end">
        <button 
          type="button" 
          onClick={onBack} 
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Atrás
        </button>
        <button 
          type="submit" 
          disabled={!isFormValid}
          className={`
            px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
            ${isFormValid 
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
              : 'bg-blue-600 text-white opacity-50 cursor-not-allowed'
            }
          `}
        >
          Pagar
        </button>
      </div>
    </form>
  );
};

export default EnterDetailsView; 