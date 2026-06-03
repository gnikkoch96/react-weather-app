import { X } from "lucide-react";
import { useAppSelector } from "../hooks/useAppSelector.js";
import { useDispatch } from "react-redux";
import { setIsVisible } from "../redux/settingsSlice.js";
import { setTemperatureUnit } from "../redux/weatherSlice.js";
import { useState } from "react";
import type { SpeedUnit, TemperatureUnit } from "../../types/weather/types.js";

export default function SettingsPopup({ className }: { className?: string }) {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    useState<TemperatureUnit>("farenheit");
  const [currentSpeedUnit, setCurrentSpeedUnit] = useState<SpeedUnit>("kmh");

  const isVisible = useAppSelector((state) => state.settingsConfig.isVisible);
  const dispatch = useDispatch();
  
  if (!isVisible) return null;

  const handleTemperatureUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    if (value === "farenheit" || value === "celcius") setCurrentTemperatureUnit(value);
  };

  const handleSpeedUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    if (value === "kmh" || value === "m/s" || value === "mph" || value === "kn")
      setCurrentSpeedUnit(value);
  };

  return (
    <div className="absolute min-w-screen min-h-screen flex justify-center items-center bg-transparent backdrop-blur-xs">
      {/* Settings Card */}
      <div className="flex flex-col gap-4 p-4 text-2xl shadow-2xl rounded border bg-white">
        {/* Settings Label and X button */}
        <div className="w-full flex justify-between">
          <span>Settings</span>
          <button
            onClick={() => dispatch(setIsVisible(false))}
            className="cursor-pointer"
          >
            <X className="" size={24} />
          </button>
        </div>

        {/* Temperature Unit */}
        <label className="flex gap-2">
          <span className="flex-1/2">Temperature Unit:</span>
          <select
            className="border px-1 border-gray-500 rounded"
            name="temperature-unit"
            id=""
            onChange={handleTemperatureUnitChange}
          >
            <option value="farenheit">Farenheit</option>
            <option value="celcius">Celcius</option>
          </select>
        </label>

        {/* Speed Unit */}
        <label className="flex">
          <span className="flex-1/4">Speed Unit:</span>
          <select
            className="border px-1 border-gray-300 rounded"
            name="speed-unit"
            id=""
            onChange={handleSpeedUnitChange}
          >
            <option value="kmh">km/h</option>
            <option value="ms">m/s</option>
            <option value="mph">mph</option>
            <option value="kn">Knots</option>
          </select>
        </label>

        {/* Action Buttons */}
        <div className="flex justify-around gap-1">
          {/* Save or Exit */}
          <button
            className="cursor-pointer rounded px-4 flex-1 bg-gray-300"
            onClick={() => dispatch(setIsVisible(false))}
          >
            Exit
          </button>
          <button
            className="cursor-pointer rounded px-4 flex-1 bg-linear-to-r from-blue-600 to-blue-400 text-white"
            onClick={() => {
              dispatch(setTemperatureUnit());
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
