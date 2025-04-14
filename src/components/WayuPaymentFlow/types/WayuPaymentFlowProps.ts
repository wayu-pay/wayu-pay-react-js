import React from 'react';
import { Bank } from './Bank';
import { FormData } from './FormData';

export interface WayuPaymentFlowProps {
  className?: string;
  style?: React.CSSProperties;
  onComplete?: (data: { bank: Bank; formData: FormData }) => void;
  onError?: (error: Error) => void;
} 