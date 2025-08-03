import type { FC } from "react";
import styles from "./styles.module.scss";
import type { DayItinerary } from "../../models/Itinerary";

interface DayProps {
  itinerary: DayItinerary;
}

const calculateWidth = (startDate: Date, endDate: Date): number => {
  const totalDayMilliseconds = 24 * 60 * 60 * 1000;

  return (
    ((endDate.getTime() - startDate.getTime()) / totalDayMilliseconds) * 100
  );
};

const calculateStartPosition = (startDate: Date): number => {
  const totalDayMilliseconds = 24 * 60 * 60 * 1000;

  const startOfDay = new Date(startDate);
  startOfDay.setHours(0, 0, 0, 0);

  return (
    ((startDate.getTime() - startOfDay.getTime()) / totalDayMilliseconds) * 100
  );
};

const Day: FC<DayProps> = ({ itinerary }) => {
  return (
    <div className={styles.day}>
      {itinerary.map((element, index) => (
        <div
          className={styles.timeSlot}
          key={index}
          style={{
            width: `${calculateWidth(element.startDate, element.endDate)}%`,
            left: `${calculateStartPosition(element.startDate)}%`,
            top: `${element.position * 15 + 5}px`, // Adjust vertical position for each element
          }}
        ></div>
      ))}
    </div>
  );
};

export default Day;
