import type { FC } from "react";
import styles from "./styles.module.scss";
import type { WeekItinerary } from "../../models/Itinerary";
import Day from "../Day";

interface WeekProps {
  itinerary: WeekItinerary;
  accommodations?: WeekItinerary;
}

const Week: FC<WeekProps> = ({ itinerary, accommodations }) => {
  return (
    <div className={styles.week}>
      {itinerary.map((element, i) => (
        <Day
          key={i}
          itinerary={element}
          accommodations={accommodations ? accommodations[i] : []}
        />
      ))}
    </div>
  );
};

export default Week;
