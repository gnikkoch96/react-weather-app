import type { LocationData } from "../../types/location/types.js";
import Modal from "./common/Modal.js";

type LocationsPopupProps = {
  locationData: LocationData[] | null;
  handleLocationSelect: (location: LocationData) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function LocationsPopup({
  locationData,
  handleLocationSelect,
  isOpen,
  onClose,
}: LocationsPopupProps) {
  return (
    <Modal title="Select Location" isVisible={isOpen} onClose={onClose}>
      <div>
        <ul className="flex flex-col gap-2">
          {locationData?.map((location) => (
            <li
              key={location.id}
              className="transition-colors
                hover:bg-gray-200 border rounded hover:shadow py-1 px-2"
            >
              <button
                className="cursor-pointer"
                onClick={() => handleLocationSelect(location)}
              >
                ({location.country}) {location.name}, {location.state}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
