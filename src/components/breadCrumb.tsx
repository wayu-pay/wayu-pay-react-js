"use client";

import { useStep } from "../context/StepProvider";

const Breadcrumb = () => {
  const { step } = useStep();

  return (
    <nav className="text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <a
            className={`${
              step === 1 ? "text-blue-600 font-bold" : "text-gray-500"
            }`}
            href="/"
          >
            Elige tu banco
          </a>
        </li>
        <li>{">"}</li>
        <li
          className={`${
            step === 2 ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          Procesa el pago
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
