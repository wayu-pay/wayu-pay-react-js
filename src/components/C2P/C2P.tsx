import React from 'react';
import { C2PSelectBank, C2PSelectBankProps } from './C2PSelectBank';
import { StepProvider } from '../../context/StepProvider';
import { HeroUIProvider } from '@heroui/react';

/**
 * C2P component wraps C2PSelectBank with a StepProvider to ensure
 * the useStep hook is available to all child components.
 * 
 * Note: Make sure to wrap your application with the HeroUIProvider
 * from @heroui/react for the UI components to work properly.
 */
export const C2P: React.FC<C2PSelectBankProps> = (props) => {
  return (
    <HeroUIProvider>
      <StepProvider initialStep={1}>
        <div className="overflow-x-hidden w-full">
          <C2PSelectBank {...props} />
        </div>
      </StepProvider>
    </HeroUIProvider>
  );
};

// Default export for backward compatibility
export default C2P; 