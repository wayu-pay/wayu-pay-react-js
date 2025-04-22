import React, { ReactNode } from 'react';
import { StepProvider } from '../../context/StepProvider';
import { HeroUIProvider } from "@heroui/react";

interface WayuPayProviderProps {
  children: ReactNode;
  initialStep?: number;
}

/**
 * WayuPayProvider wraps your application with all the necessary providers
 * for the Wayu Pay components to work correctly.
 * 
 * This provider is required for components that use hooks like useStep
 * and HeroUI components.
 * 
 * @example
 * <WayuPayProvider>
 *   <App />
 * </WayuPayProvider>
 */
export const WayuPayProvider: React.FC<WayuPayProviderProps> = ({ 
  children,
  initialStep = 1 
}) => {
  return (
    <HeroUIProvider>
      <StepProvider initialStep={initialStep}>
        {children}
      </StepProvider>
    </HeroUIProvider>
  );
}; 