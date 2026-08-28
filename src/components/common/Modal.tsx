import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type ModalPropType = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onAfterClose?: () => void;
};

/*
  Responsibility:
  1. Render the modal title and child content.
  2. Manage when the onClose and onAfterClose callbacks are invoked.
  3. Provide accessible modal behavior and keyboard interaction.
*/
export default function Modal({
  title,
  isVisible,
  onClose,
  children,
  onAfterClose,
}: ModalPropType) {
  const modalRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = () => {
    return Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(
        "button, input, select, textarea, a[href]",
      ) ?? [],
    );
  };

  // find the first focusable actionable element and focus on that
  useEffect(() => {
    if (isVisible) {
      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) return;

      focusableElements[0]?.focus();
    }
  }, [isVisible]);

  // prevent background from scrolling
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // handle keystrokes
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const focusableElements = getFocusableElements();

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const activeElement = document.activeElement;
        if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }

        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (!isVisible && event.propertyName === "opacity") onAfterClose?.();
  };

  return (
    <div
      className={`fixed inset-0 ${isVisible ? "pointer-events-auto" : "pointer-events-none"} min-w-screen min-h-screen flex justify-center items-center bg-transparent`}
      role="dialog"
      aria-modal={true}
      ref={modalRef}
    >
      {/* Backdrop */}
      <div
        className={`absolute transition-all duration-500 ease-in-out min-w-screen min-h-screen ${isVisible ? "opacity-100  backdrop-blur-xs" : "opacity-0  backdrop-blur-none"}`}
        onTransitionEnd={handleTransitionEnd}
      ></div>

      {/* Content Card */}
      <div
        className={`z-10 transform-size duration-200 ease-in flex ${isVisible ? "scale-100" : "scale-0"} flex-col gap-4 p-4 text-2xl shadow-2xl rounded border bg-white`}
      >
        {/* Settings Label and X button */}
        <div className="w-full flex justify-between">
          <span>{title}</span>
          <button
            onClick={onClose}
            className="cursor-pointer rounded transition-bg duration-150 ease-out hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
