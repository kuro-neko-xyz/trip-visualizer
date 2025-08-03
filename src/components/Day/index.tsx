import type { FC } from "react";
import styles from "./styles.module.scss";
import type { DayItinerary } from "../../models/Itinerary";
import {
  COLOR_LIGHTNESS,
  COLOR_SATURATION,
  PLANE_CODE,
} from "../../constants/lanes";

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

const generateRandomColorFromCode = (code: string): string => {
  if (code === PLANE_CODE) {
    return "lightgrey";
  }

  let hash = 5381;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) + hash + code.charCodeAt(i); // hash * 33 + c
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, ${COLOR_SATURATION}%, ${COLOR_LIGHTNESS}%)`;
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
            top: `${element.position * 15 + 5}px`,
            backgroundColor: generateRandomColorFromCode(element.location),
          }}
        >
          <span>{element.location}</span>
        </div>
      ))}
    </div>
  );
};

export default Day;
