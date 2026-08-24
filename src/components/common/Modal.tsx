import { X } from "lucide-react";

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
*/
export default function Modal({
  title,
  isVisible,
  onClose,
  children,
  onAfterClose,
}: ModalPropType) {
  const handleTransitionEnd = () => {
    if (!isVisible) onAfterClose?.();
  };

  return (
    <div
      className={`absolute ${isVisible ? "pointer-events-auto" : "pointer-events-none"} min-w-screen min-h-screen flex justify-center items-center bg-transparent`}
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
