import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalContainer =
  typeof window !== "undefined"
    ? document.getElementById("modalContainer")
    : null;

interface ModalProps {
  isOpen: boolean;
  onClose: any;
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
    <div className="fixed inset-0 z-40 grid min-h-full place-content-center bg-gray-400/60 ">
      <div
        className="flex max-w-xs flex-col justify-between rounded-lg border bg-gray-100 p-8 text-lg"
        ref={modalRef}
      >
        {children}
      </div>
    </div>,
    modalContainer!
  );
}
