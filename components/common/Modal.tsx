import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalContainer =
  typeof window !== "undefined"
    ? document.getElementById("modalContainer")
    : null;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close modal on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal" >
      <div ref={modalRef}>

      {children}

      </div>
    </div>,
    modalContainer!
  );
}
