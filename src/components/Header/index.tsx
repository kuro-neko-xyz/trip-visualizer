import { useRef, type FC } from "react";
import styles from "./styles.module.scss";
import type { Flights } from "../../models/Flight";
import type { Accommodations } from "../../models/Accommodation";

interface HeaderProps {
  handleUpdateAllFlights: (updatedFlights: Flights) => void;
  handleUpdateAllAccommodations: (
    updatedAccommodations: Accommodations
  ) => void;
}

const exportData = () => {
  const accommodationData = localStorage.getItem("accommodations");
  const flightData = localStorage.getItem("flights");

  const data = JSON.stringify({
    accommodationData: accommodationData ? JSON.parse(accommodationData) : [],
    flightData: flightData ? JSON.parse(flightData) : [],
  });

  const element = document.createElement("a");
  const file = new Blob([data], { type: "application/json" });
  element.href = URL.createObjectURL(file);
  element.download = "travel-data.json";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const Header: FC<HeaderProps> = ({
  handleUpdateAllFlights,
  handleUpdateAllAccommodations,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        localStorage.setItem(
          "accommodations",
          JSON.stringify(data.accommodationData || [])
        );
        handleUpdateAllAccommodations(data.accommodationData || []);
        localStorage.setItem("flights", JSON.stringify(data.flightData || []));
        handleUpdateAllFlights(data.flightData || []);
      } catch (error) {
        console.error("Error importing data:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className={styles.header}>
      <input
        className={styles.input}
        ref={inputRef}
        type="file"
        onChange={importData}
      />
      <button type="button" onClick={() => inputRef.current?.click()}>
        Import
      </button>
      <button type="button" onClick={exportData}>
        Export
      </button>
    </header>
  );
};

export default Header;
