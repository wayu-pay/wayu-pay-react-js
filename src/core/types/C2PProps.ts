import React from 'react';
import { Bank } from './Bank';
import { FormData } from './FormData';

export interface C2PProps {
  className?: string;
  style?: React.CSSProperties;
  onComplete?: (data: { bank: Bank; formData: FormData }) => void;
  onError?: (error: Error) => void;
  onBack?: () => void;
} 