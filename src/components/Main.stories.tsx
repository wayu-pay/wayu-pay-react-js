import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkout from './checkout/Checkout';

/**
 * Este archivo redirige a Checkout.stories para mantener compatibilidad
 * con configuraciones anteriores de Storybook
 */
const meta: Meta<typeof Checkout> = {
  title: 'Redirect',
  component: Checkout,
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ToCheckout: Story = {}; 