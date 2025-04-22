import React, { useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  // Opcional: Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);


  // Transiciones (opcional pero mejora UX)
  const backdropClasses = isOpen
    ? 'opacity-100'
    : 'opacity-0 pointer-events-none'; // Oculta y deshabilita clicks cuando está cerrado

  const modalClasses = isOpen
    ? 'scale-100 opacity-100'
    : 'scale-95 opacity-0'; // Efecto de zoom/fade

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${backdropClasses}`}
      onClick={onClose} // Cierra al hacer clic en el fondo
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-xl max-w-md w-11/12 relative transform transition-all duration-300 ease-in-out ${modalClasses}`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        <button
            className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none cursor-pointer bg-transparent border-none p-0"
            onClick={onClose}
            aria-label="Cerrar modal"
        >
            &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;