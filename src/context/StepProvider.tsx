import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir tipos
interface StepContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

// Crear el contexto
const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
  children: ReactNode;
  initialStep?: number;
}

// Proveedor del contexto
export const StepProvider: React.FC<StepProviderProps> = ({ 
  children, 
  initialStep = 1 
}) => {
  const [step, setStep] = useState(initialStep);

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  );
};

// Hook para usar el contexto
export const useStep = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};
