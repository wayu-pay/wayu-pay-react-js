import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import Select from "react-select";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";

import { BANK_INTERFACE, phoneCodes } from "../../core/data/constants/global.constants";
import Breadcrumb from "../../components/breadCrumb";
import { useStep } from "../../context/StepProvider";
// import PaymentStatusModal from "../../components/paymentStatusModal";

interface ChildModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedBank: BANK_INTERFACE | undefined;
  onComplete?: (formData: any) => void;
  onError?: (error: any) => void;
}

const initialFormState = {
  idType: "V",
  identityNumber: "",
  phoneCode: phoneCodes[0].key,
  phoneNumber: "",
  c2pCode: "",
};

// Styles for react-select
const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    height: '38px',
    minHeight: '38px',
    borderColor: '#D1D5DB',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9CA3AF',
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: '38px',
    padding: '0 8px',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: '38px',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: '0 8px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};

// Options for the ID type select
const idTypeOptions = [
  { value: 'V', label: 'V' },
  { value: 'E', label: 'E' },
];

export const C2PFormModal = ({
  isOpen,
  setIsOpen,
  selectedBank,
  onComplete,
  onError
}: ChildModalProps) => {
  const [formData, setFormData] = useState(initialFormState);
  const { setStep } = useStep();
  
  console.log("C2PFormModal rendering, isOpen:", isOpen);
  
  useEffect(() => {
    console.log("isOpen changed:", isOpen);
  }, [isOpen]);
  
  useEffect(() => {
    console.log("Modal component mounted");
    return () => {
      console.log("Modal component unmounted");
    };
  }, []);

  // Functions to handle form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.inputMode === "numeric") {
      validateInputNumber(e.target);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputNumber = (inputTarget: any) => {
    const numericValue = inputTarget.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      [inputTarget.name]: numericValue,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Check if all fields are filled
  const isFormValid = Object.values(formData).every((value) => value !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onComplete) {
      onComplete(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    console.log("Closing modal");
    setIsOpen(false);
    setStep(1);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black/30" onClick={handleClose}></div>
        
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="absolute top-3 right-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedBank ? selectedBank.bankName : "Selección de Banco"}
            </h2>
            <Breadcrumb />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Cédula de identidad */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Cédula de identidad
                </span>
                <div className="flex gap-1">
                  <div className="w-20 min-w-[5rem]">
                    <Select
                      options={idTypeOptions}
                      defaultValue={idTypeOptions.find(option => option.value === formData.idType)}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          handleSelectChange('idType', selectedOption.value);
                        }
                      }}
                      styles={customSelectStyles}
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <input
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    inputMode="numeric"
                    maxLength={8}
                    name="identityNumber"
                    pattern="[0-9]*"
                    placeholder="18321123"
                    value={formData.identityNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </span>
                <div className="flex gap-1">
                  <input
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    inputMode="numeric"
                    maxLength={11}
                    name="phoneNumber"
                    pattern="[0-9]*"
                    placeholder="04121234567"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Código C2P */}
              <div className="w-full">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Código C2P
                </span>
                <div>
                  <InputOtp
                    isRequired
                    classNames={{
                      base: "mx-auto",
                      segmentWrapper: "grid grid-cols-6 gap-2 w-full",
                      input: "border border-gray-300 rounded-md shadow-sm text-center h-[40px]",
                      segment: "border border-gray-300 bg-transparent rounded-md h-10"
                    }}
                    length={6}
                    name="c2pCode"
                    size="lg"
                    value={formData.c2pCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3 justify-center sm:justify-end">
              <Button
                color="danger"
                variant="light"
                onPress={handleClose}
                className="px-4 py-2 h-10 min-w-[100px] rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={!isFormValid}
                type="submit"
                className="px-4 py-2 h-10 min-w-[100px] rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pagar 235$
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
