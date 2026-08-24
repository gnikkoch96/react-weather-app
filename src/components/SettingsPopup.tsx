import { useAppSelector } from "../hooks/useAppSelector.js";
import { useDispatch } from "react-redux";
import { setIsVisible } from "../redux/settingsSlice.js";
import { setSpeedUnit, setTemperatureUnit } from "../redux/weatherSlice.js";
import { useState } from "react";
import type { SpeedUnit, TemperatureUnit } from "../../types/weather/types.js";
import Modal from "./common/Modal.js";

/*
  Responsibility:
  1. Manage and render the settings configuration and popup visibility.
*/
export default function SettingsPopup() {
  const isVisible = useAppSelector((state) => state.settingsConfig.isVisible);
  const dispatch = useDispatch();

  const globalTemperatureUnit = useAppSelector(
    (state) => state.weatherConfig.temperatureUnit,
  );
  const globalSpeedUnit = useAppSelector(
    (state) => state.weatherConfig.speedUnit,
  );

  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    useState<TemperatureUnit>(globalTemperatureUnit);
  const [currentSpeedUnit, setCurrentSpeedUnit] =
    useState<SpeedUnit>(globalSpeedUnit);

  const handleTemperatureUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    if (value === "fahrenheit" || value === "celcius")
      setCurrentTemperatureUnit(value);
  };

  const handleSpeedUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    if (value === "kmh" || value === "m/s" || value === "mph" || value === "kn")
      setCurrentSpeedUnit(value);
  };

  const handleClose = () => {
    dispatch(setIsVisible(false));
  }

  const handleAfterClose = () => {
    setCurrentTemperatureUnit(globalTemperatureUnit);
    setCurrentSpeedUnit(globalSpeedUnit);
  }

  return (
    <Modal
      title="Settings"
      isVisible={isVisible}
      onClose={handleClose}
      onAfterClose={handleAfterClose}
    >
      {/* Temperature Unit */}
      <label className="flex gap-2">
        <span className="flex-1/2">Temperature Unit:</span>
        <select
          className="border px-1 border-gray-500 rounded"
          name="temperature-unit"
          id=""
          onChange={handleTemperatureUnitChange}
          value={currentTemperatureUnit}
        >
          <option value="fahrenheit">Farenheit</option>
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
          value={currentSpeedUnit}
        >
          <option value="kmh">km/h</option>
          <option value="m/s">m/s</option>
          <option value="mph">mph</option>
          <option value="kn">Knots</option>
        </select>
      </label>

      {/* Action Buttons */}
      <div className="flex justify-around gap-1">
        {/* Save or Exit */}
        <button
          className="cursor-pointer rounded px-4 flex-1 bg-gray-300 transition-bg duration-150 ease-out hover:bg-gray-200"
          onClick={handleClose}
        >
          Exit
        </button>
        <button
          className="cursor-pointer rounded px-4 flex-1 transition-opacity duration-150 ease-out hover:opacity-75 bg-linear-to-r from-blue-600 to-blue-400 text-white"
          onClick={() => {
            dispatch(setTemperatureUnit(currentTemperatureUnit));
            dispatch(setSpeedUnit(currentSpeedUnit));
            dispatch(setIsVisible(false));
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
