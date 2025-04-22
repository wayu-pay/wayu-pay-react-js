import React from 'react';
import '../src/index.css';
import type { Preview, Decorator } from '@storybook/react';
import { StepProvider } from '../src/context/StepProvider';
import { HeroUIProvider } from "@heroui/react";

// Import any required CSS for HeroUI components
import '@heroui/select/styles';
import '@heroui/modal/styles';
import '@heroui/button/styles';
import '@heroui/input-otp/styles';

// Decorator that wraps all stories with our providers
const withProviders: Decorator = (Story) => {
  return (
    <HeroUIProvider>
      <StepProvider initialStep={1}>
        <Story />
      </StepProvider>
    </HeroUIProvider>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    // Ordenar stories para tener Home primero
    storySort: {
      order: ['Home', 'Components', ['Checkout', '*']],
    },
  },
};

export default preview; 