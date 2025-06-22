import type { FC } from "react";
import type { Flight } from "../../models/Flight";
import styles from "./styles.module.scss";

interface FlightInfoProps {
  flight: Flight;
  onDeleteClick: (flightId: string) => void;
}

const FlightInfo: FC<FlightInfoProps> = ({ flight, onDeleteClick }) => {
  return (
    <div className={styles.flightInfoContainer}>
      <div className={styles.flightInfo}>
        <div className={styles.flightDetails}>
          <h2>{flight.origin.airportCode}</h2>
          <p>{new Date(flight.origin.dateTime).toLocaleDateString()}</p>
          <p>{new Date(flight.origin.dateTime).toLocaleTimeString()}</p>
        </div>
        <h2>✈️</h2>
        <div className={styles.flightDetails}>
          <h2>{flight.destination.airportCode}</h2>
          <p>{new Date(flight.destination.dateTime).toLocaleDateString()}</p>
          <p>{new Date(flight.destination.dateTime).toLocaleTimeString()}</p>
        </div>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDeleteClick(flight.id)}
      >
        X
      </button>
    </div>
  );
};

export default FlightInfo;
