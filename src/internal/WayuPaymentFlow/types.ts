// src/components/WayuPaymentFlow/types.ts

// Tipos compartidos dentro del componente WayuPaymentFlow

export interface Bank {
  id: string;
  name: string;
}

export interface FormData {
  ciType: 'V' | 'E';
  ciNumber: string;
  phoneNumber: string;
  c2pCode: string;
} 