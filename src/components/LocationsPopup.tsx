import type { LocationData } from "../../types/location/types.js";
import Modal from "./common/Modal.js";

type LocationsPopupProps = {
  locationData: LocationData[];
  onLocationSelect: (location: LocationData) => void;
  isOpen: boolean;
  onClose: () => void;
};

function formatLocation(location: LocationData){
  return `(${location.country}) ${[location.name, location.state].filter(Boolean).join(', ')}`
}

/*
  Responsibility: 
  1. Display locations search results
*/
export default function LocationsPopup({
  locationData,
  onLocationSelect,
  isOpen,
  onClose,
}: LocationsPopupProps) {

  return (
    <Modal title="Select Location" isVisible={isOpen} onClose={onClose}>
      <div>
        <ul className="flex flex-col gap-2">
          {locationData.length > 0 ? locationData.map((location) => (
            <li
              key={location.id}
            >
              <button
                type="button"
                className="w-full text-left transition-colors
                hover:bg-gray-200 border rounded hover:shadow py-1 px-2 cursor-pointer "
                onClick={() => onLocationSelect(location)}
              >
                {formatLocation(location)}
              </button>
            </li>
          )) : <p>No locations found</p>}
        </ul>
      </div>
    </Modal>
  );
}
