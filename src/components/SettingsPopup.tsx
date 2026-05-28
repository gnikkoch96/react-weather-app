export default function SettingsPopup({ className }: { className?: string }) {
  return (
    <div className='absolute min-w-screen min-h-screen flex justify-center items-center bg-gray-400 '>
        {/* Settings Card */}
        <div className="bg-linear-to-r from-blue-600 to-blue-400 text-white">
            <div>
                {/* Temperature */}
                <label>
                Temperature Unit:
                <select name="temperature-unit" id="">
                    <option value={"farenheit"}>Farenheit</option>
                    <option value={"celcius"}>Celcius</option>
                </select>
                </label>
            </div>
            <div>
                {/* Speed */}
                <label>
                Speed Unit:
                <select name="speed-unit" id="">
                    <option value={"kmh"}>km/h</option>
                    <option value={"ms"}>m/s</option>
                    <option value={"mph"}>mph</option>
                    <option value={"kn"}>Knots</option>
                </select>
                </label>
            </div>
            <div>
                {/* Save or Exit */}
                <button>Exit</button>
                <button>Save</button>
            </div>
        </div>
    </div>
  );
}
