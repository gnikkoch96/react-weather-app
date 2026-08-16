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
    </Modal>
  );
}
