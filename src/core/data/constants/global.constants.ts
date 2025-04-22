import { CreditCard, MonitorSmartphone, Building, Bitcoin } from "lucide-react";

export interface KEY_VALUE {
  key: string;
  value: string;
}

export interface BANK_INTERFACE {
  bankCode: string;
  bankName: string;
  url: string;
  img: string;
}

export const venezuelanBanks: BANK_INTERFACE[] = [
  {
    bankCode: "0138",
    bankName: "BANCO PLAZA",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0138.jpg",
  },
  {
    bankName: "BANCO MERCANTIL C.A.",
    bankCode: "0105",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0105.jpg",
  },
  {
    bankName: "BANCO NACIONAL DE CREDITO",
    bankCode: "0191",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0191.jpg",
  },
  {
    bankName: "BANESCO BANCO UNIVERSAL",
    bankCode: "0134",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0134.jpg",
  },
  {
    bankName: "BANCAMIGA BANCO MICROFINANCIERO, C.A.",
    bankCode: "0172",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0172.jpg",
  },
  {
    bankName: "BANCO DEL CARIBE C.A.",
    bankCode: "0114",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0114.jpg",
  },
  {
    bankName: "MIBANCO BANCO DE DESARROLLO, C.A.",
    bankCode: "0169",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0169.jpg",
  },
  {
    bankName: "BANCO EXTERIOR C.A.",
    bankCode: "0115",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0115.jpg",
  },
  {
    bankName: "BANCO VENEZOLANO DE CREDITO S.A.",
    bankCode: "0104",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0104.jpg",
  },
  {
    bankName: "BANCO PROVINCIAL BBVA",
    bankCode: "0108",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0108.jpg",
  },
  {
    bankName: "BANCO DEL TESORO",
    bankCode: "0163",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0163.jpg",
  },
  {
    bankName: "BANCO DE VENEZUELA S.A.I.C.A.",
    bankCode: "0102",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0102.jpg",
  },
  {
    bankName: "BANCRECER S.A. BANCO DE DESARROLLO",
    bankCode: "0168",
    url: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net",
    img: "https://primarycinesunidos-fpcdhwcmdsd8gvdz.a03.azurefd.net/banks/0168.jpg",
  },
];

export const phoneCodes: KEY_VALUE[] = [
  { key: "0412", value: "0412" },
  { key: "0424", value: "0424" },
  { key: "0414", value: "0414" },
  { key: "0426", value: "0426" },
  { key: "0416", value: "0416" },
];

export const paymentMethods = [
  {
    id: "creditCard",
    name: "Tarjeta de Crédito",
    icon: CreditCard,
    description: "Paga de forma segura con tu tarjeta",
  },
  {
    id: "c2p",
    name: "Pago Móvil (C2P)",
    icon: MonitorSmartphone,
    description: "Paga fácilmente con tu número de teléfono",
  },
  {
    id: "debitCardMercantil",
    name: "Tarjeta Débito Mercantil",
    icon: Building,
    description: "Opción exclusiva para clientes de Mercantil",
  },
  {
    id: "crypto",
    name: "Criptomonedas",
    icon: Bitcoin,
    description: "Paga con Bitcoin, Ethereum y más",
  },
];
