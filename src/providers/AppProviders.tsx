import React, { ReactNode } from 'react';
import { StepProvider } from '../context/StepProvider';
import { HeroUIProvider } from "@heroui/react";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <StepProvider>
        {children}
      </StepProvider>
    </HeroUIProvider>
  );
}; 