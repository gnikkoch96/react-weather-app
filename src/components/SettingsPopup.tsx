import { X } from "lucide-react";

export default function SettingsPopup({ className }: { className?: string }) {
  return (
    <div className="absolute min-w-screen min-h-screen flex justify-center items-center bg-transparent backdrop-blur-xs">
      {/* Settings Card */}
      <div className="flex flex-col gap-4 p-4 text-2xl shadow-2xl rounded border bg-blue-400 text-white">
        <button className="cursor-pointer  w-full flex justify-end"><X className="border rounded" size={16}/></button>

        {/* Temperature */}
        <label className="flex gap-2">
          <span className="flex-1/2">Temperature Unit:</span>
          <select className="border rounded bg-blue-400" name="temperature-unit" id="">
            <option value={"farenheit"}>Farenheit</option>
            <option value={"celcius"}>Celcius</option>
          </select>
        </label>
        {/* Speed */}
        <label className="flex">
          <span className="flex-1/4">Speed Unit:</span>
          <select className="border rounded bg-blue-400" name="speed-unit" id="">
            <option value={"kmh"}>km/h</option>
            <option value={"ms"}>m/s</option>
            <option value={"mph"}>mph</option>
            <option value={"kn"}>Knots</option>
          </select>
        </label>
        <div className="flex justify-around">
          {/* Save or Exit */}
          <button className="cursor-pointer rounded border px-4 shadow bg-red-400">Exit</button>
          <button className="cursor-pointer rounded border px-4 shadow bg-green-400">Save</button>
        </div>
      </div>
    </div>
  );
}
