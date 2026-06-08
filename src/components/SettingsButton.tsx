import { Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { setIsVisible } from "../redux/settingsSlice.js";

export default function SettingsButton({ className }: { className?: string }) {
  const dispatch = useDispatch();

  return (
    <button
      className={`fixed top-2 left-2 cursor-pointer transition-transform ease-in-out duration-1000 transform hover:rotate-180 text-white ${className}`}
      onClick={() => dispatch(setIsVisible(true))}
    >
      <Settings size={32} />
    </button>
  );
}
