import type { FC } from "react";
import type { Flights } from "../../models/Flight";
import Week from "../Week";
import type {
  DayItinerary,
  ItineraryElement,
  WeekItinerary,
} from "../../models/Itinerary";
import { MAX_LANE_POSITIONS, PLANE_CODE } from "../../constants/lanes";

interface ItineraryProps {
  flights: Flights;
}

const getSortedFlights = (flights: Flights): Flights => {
  return flights.sort((a, b) => {
    const aDeparture = new Date(a.origin.dateTime);
    const bDeparture = new Date(b.origin.dateTime);

    return aDeparture.getTime() - bDeparture.getTime();
  });
};

const getFirstSunday = (sortedFlights: Flights): Date => {
  const firstDeparture = new Date(sortedFlights[0].origin.dateTime);
  const daysFromSunday = -firstDeparture.getDay();
  const firstSunday = new Date(firstDeparture);
  firstSunday.setDate(firstDeparture.getDate() + daysFromSunday);
  firstSunday.setHours(0, 0, 0, 0);

  return firstSunday;
};

const getLastSaturday = (sortedFlights: Flights): Date => {
  const lastArrival = new Date(
    sortedFlights[sortedFlights.length - 1].destination.dateTime
  );
  const daysToSaturday = 6 - lastArrival.getDay();
  const lastSaturday = new Date(lastArrival);
  lastSaturday.setDate(lastArrival.getDate() + daysToSaturday);
  lastSaturday.setHours(23, 59, 59, 999);

  return lastSaturday;
};

const transformItinerary = (
  sortedFlights: Flights,
  firstSunday: Date,
  lastSaturday: Date
) => {
  return sortedFlights.reduce<ItineraryElement[]>((acc, flight, index) => {
    if (index === 0) {
      acc.push({
        location: flight.origin.airportCode,
        startDate: firstSunday,
        endDate: new Date(flight.origin.dateTime),
      });
    }

    acc.push({
      location: PLANE_CODE,
      startDate: new Date(flight.origin.dateTime),
      endDate: new Date(flight.destination.dateTime),
    });

    if (index < sortedFlights.length - 1) {
      const nextFlight = sortedFlights[index + 1];
      acc.push({
        location: nextFlight.origin.airportCode,
        startDate: new Date(flight.destination.dateTime),
        endDate: new Date(nextFlight.origin.dateTime),
      });
    }

    if (index === sortedFlights.length - 1) {
      acc.push({
        location: flight.destination.airportCode,
        startDate: new Date(flight.destination.dateTime),
        endDate: lastSaturday,
      });
    }

    return acc;
  }, []);
};

const updatePosition = (position: number) => {
  return (position + 1) % MAX_LANE_POSITIONS;
};

const mapItineraryByWeek = (
  itinerary: ItineraryElement[],
  firstSunday: Date
) => {
  const localItinerary = [...itinerary];
  const weeks: WeekItinerary[] = [];
  let dayCounter = 0;
  let position = 0;

  while (localItinerary.length) {
    const week: WeekItinerary = [];

    while (week.length < 7) {
      const startOfTheDay = new Date(firstSunday);
      startOfTheDay.setDate(firstSunday.getDate() + dayCounter);

      const endOfTheDay = new Date(startOfTheDay);
      endOfTheDay.setHours(23, 59, 59, 999);

      const dayItinerary: DayItinerary = [];

      while (localItinerary[0] && localItinerary[0].startDate <= endOfTheDay) {
        if (localItinerary[0].startDate >= startOfTheDay) {
          if (localItinerary[0].endDate <= endOfTheDay) {
            dayItinerary.push({
              ...localItinerary[0],
              position,
            });
            localItinerary.shift();
            position = updatePosition(position);
          } else {
            dayItinerary.push({
              ...localItinerary[0],
              endDate: endOfTheDay,
              position,
            });
            break;
          }
        } else {
          if (localItinerary[0].endDate <= endOfTheDay) {
            dayItinerary.push({
              ...localItinerary[0],
              startDate: startOfTheDay,
              position,
            });
            localItinerary.shift();
            position = updatePosition(position);
          } else {
            dayItinerary.push({
              ...localItinerary[0],
              startDate: startOfTheDay,
              endDate: endOfTheDay,
              position,
            });
            break;
          }
        }
      }

      week.push(dayItinerary);
      dayCounter++;
    }

    weeks.push(week);
  }

  return weeks;
};

const Itinerary: FC<ItineraryProps> = ({ flights }) => {
  const sortedFlights = getSortedFlights(flights);
  const firstSunday = getFirstSunday(sortedFlights);
  const lastSaturday = getLastSaturday(sortedFlights);

  const itinerary = transformItinerary(
    sortedFlights,
    firstSunday,
    lastSaturday
  );

  const itineraryByWeek = mapItineraryByWeek(itinerary, firstSunday);

  const weeks = itineraryByWeek.map((week, index) => (
    <Week key={index} itinerary={week} />
  ));

  return (
    <>
      <h2>Itinerary</h2>
      {weeks}
    </>
  );
};

export default Itinerary;
