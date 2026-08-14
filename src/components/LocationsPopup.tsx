import type { LocationData } from "../../types/location/types.js";

type LocationsPopupProps = {
  locationData: LocationData[] | null;
  handleLocationSelect: (location: LocationData) => void;
};

export default function LocationsPopup({
  locationData,
  handleLocationSelect,
}: LocationsPopupProps) {
  return (
    <div>
      <ul>
        {locationData?.map((location) => (
          <li key={location.id}>
            <button onClick={() => handleLocationSelect(location)}>
              {location.name} | {location.country} | {location.state}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
