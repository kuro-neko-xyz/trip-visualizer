import type { FC } from "react";
import type { Accommodation } from "../../models/Accommodation";
import styles from "./styles.module.scss";

interface AccommodationInfoProps {
  accommodation: Accommodation;
  onDeleteClick: (accommodationId: string) => void;
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AccommodationInfo: FC<AccommodationInfoProps> = ({
  accommodation,
  onDeleteClick,
}) => {
  return (
    <div className={styles.accommodationInfoContainer}>
      <div className={styles.accommodationInfo}>
        <h2>{accommodation.airportCode}</h2>
        <div className={styles.accommodationDetails}>
          <h3>Check-in</h3>
          <p>{new Date(accommodation.checkIn).toLocaleDateString()}</p>
          <p>{formatTime(new Date(accommodation.checkIn))}</p>
        </div>
        <div className={styles.accommodationDetails}>
          <h3>Check-out</h3>
          <p>{new Date(accommodation.checkOut).toLocaleDateString()}</p>
          <p>{formatTime(new Date(accommodation.checkOut))}</p>
        </div>
        <h2>🏨</h2>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDeleteClick(accommodation.id)}
      >
        X
      </button>
    </div>
  );
};

export default AccommodationInfo;
