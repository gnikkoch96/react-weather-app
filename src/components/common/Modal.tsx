import { X } from "lucide-react";
import { useEffect } from "react";

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

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
