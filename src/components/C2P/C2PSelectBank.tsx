import { useState } from "react";
import { MonitorSmartphone } from "lucide-react";
import { Button } from "@heroui/button";
import Select from "react-select";

import { C2PFormModal } from "./C2PFormModal";

import {
  BANK_INTERFACE,
  venezuelanBanks,
} from "../../core/data/constants/global.constants";
import Breadcrumb from "../../components/breadCrumb";
import { useStep } from "../../context/StepProvider";
import {
  customSelectStyles,
  customSelectTheme,
} from "../../core/data/constants/select.constants";

export interface C2PSelectBankProps {
  className?: string;
  style?: React.CSSProperties;
  onComplete?: (data: any) => void;
  onError?: (error: any) => void;
  onBack?: () => void;
}

export function C2PSelectBank({
  className,
  style,
  onComplete,
  onError,
  onBack
}: C2PSelectBankProps) {
  const { setStep } = useStep();
  const [selectedBank, setSelectedBank] = useState<BANK_INTERFACE | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    console.log("Opening modal...");
    setTimeout(() => {
      setIsOpenModal(true);
      setStep(2);
    }, 0);
  };

  const handleModalClose = () => {
    console.log("Closing modal...");
    setIsOpenModal(false);
  };

  const handleFormComplete = (formData: any) => {
    if (onComplete) {
      onComplete({
        bank: selectedBank,
        formData
      });
    }
  };

  const handleError = (error: any) => {
    if (onError) {
      onError(error);
    } else {
      console.error(error);
    }
  };

  // Opciones para react-select
  const bankOptions = venezuelanBanks.map((bank) => ({
    value: bank.bankCode,
    label: bank.bankName,
  }));

  return (
    <>
      <C2PFormModal
        isOpen={isOpenModal}
        selectedBank={selectedBank || undefined}
        setIsOpen={setIsOpenModal}
        onComplete={handleFormComplete}
        onError={handleError}
      />
      <form className={`space-y-6 max-w-3xl mx-auto ${className}`} style={style}>
        {/* TITLE + ICON */}
        <section className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Pago Móvil C2P
          </h2>
          <MonitorSmartphone className="text-indigo-600 w-5 h-5" />
        </section>
        {/* STEPS */}
        <Breadcrumb />
        <section className="grid md:grid-cols-2 gap-4">
          {/* Banco */}
          <article className="w-full">
            {/* SELECT BANK con react-select */}
            <Select
              className=" md:w-full max-w-xs block mx-auto rounded-lg"
              isSearchable={false}
              options={bankOptions}
              placeholder="Banco"
              styles={customSelectStyles}
              theme={customSelectTheme}
              onChange={(selectedOption) => {
                const selectedBank = venezuelanBanks.find(
                  (bank) => bank.bankCode === selectedOption?.value,
                );

                setSelectedBank(selectedBank || null);
              }}
            />
          </article>
          <article className="w-full">
            {/* IMAGE STEPS C2P */}
            <img
              alt={selectedBank ? "BankInstructionsImg" : "DefaultImg"}
              className="rounded-lg"
              height={600}
              src={selectedBank ? selectedBank.img : "/images/buy.svg"}
              width={600}
            />
          </article>
        </section>
        <Button
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          isDisabled={!selectedBank}
          onPress={openModal}
        >
          Proceder a pagar
        </Button>
        {onBack && (
          <Button
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 mt-2"
            onPress={onBack}
          >
            Volver
          </Button>
        )}
      </form>
    </>
  );
}
