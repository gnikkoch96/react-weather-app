import { X } from "lucide-react";

export default function SettingsPopup({ isVisible, className }: { isVisible: boolean, className?: string }) {
  return (
    <div className="absolute min-w-screen min-h-screen flex justify-center items-center bg-transparent backdrop-blur-xs">
      {/* Settings Card */}
      <div className="flex flex-col gap-4 p-4 text-2xl shadow-2xl rounded border bg-white">
        <div className="w-full flex justify-between">
          <span>Settings</span>
          <button className="cursor-pointer">
            <X className="" size={24} />
          </button>
        </div>

        {/* Temperature */}
        <label className="flex gap-2">
          <span className="flex-1/2">Temperature Unit:</span>
          <select
            className="border px-1 border-gray-500 rounded"
            name="temperature-unit"
            id=""
          >
            <option value={"farenheit"}>Farenheit</option>
            <option value={"celcius"}>Celcius</option>
          </select>
        </label>
        {/* Speed */}
        <label className="flex">
          <span className="flex-1/4">Speed Unit:</span>
          <select
            className="border px-1 border-gray-300 rounded"
            name="speed-unit"
            id=""
          >
            <option value={"kmh"}>km/h</option>
            <option value={"ms"}>m/s</option>
            <option value={"mph"}>mph</option>
            <option value={"kn"}>Knots</option>
          </select>
        </label>
        <div className="flex justify-around gap-1">
          {/* Save or Exit */}
          <button className="cursor-pointer rounded px-4 flex-1 bg-gray-300">
            Exit
          </button>
          <button className="cursor-pointer rounded px-4 flex-1 bg-linear-to-r from-blue-600 to-blue-400 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
