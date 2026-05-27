import { Settings } from "lucide-react";

export default function SettingsButton({ className }: { className?: string }) {
  return (
    <button
      className={`fixed top-2 left-2 cursor-pointer text-white ${className}`}
    >
      <Settings size={32} />
    </button>
  );
}
