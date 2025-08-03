import type { FC } from "react";
import styles from "./styles.module.scss";
import type { WeekItinerary } from "../../models/Itinerary";
import Day from "../Day";

interface WeekProps {
  itinerary: WeekItinerary;
}

const Week: FC<WeekProps> = ({ itinerary }) => {
  return (
    <div className={styles.week}>
      {itinerary.map((element, i) => (
        <Day key={i} itinerary={element} />
      ))}
    </div>
  );
};

export default Week;
