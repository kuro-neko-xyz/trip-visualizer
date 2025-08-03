import type { FC } from "react";
import type { Flights } from "../../models/Flight";
import Week from "../Week";

interface ItineraryProps {
  flights: Flights;
}

const getFirstSunday = (flights: Flights): Date => {
  const firstDeparture = flights.reduce((earliest, flight) => {
    const departureDate = new Date(flight.origin.dateTime);
    return departureDate < earliest ? departureDate : earliest;
  }, new Date(flights[0].origin.dateTime));

  const daysFromSunday = -firstDeparture.getDay();
  const firstSunday = new Date(firstDeparture);
  firstSunday.setDate(firstDeparture.getDate() + daysFromSunday);

  return firstSunday;
};

const getLastSaturday = (flights: Flights): Date => {
  const lastArrival = flights.reduce((latest, flight) => {
    const arrivalDate = new Date(flight.destination.dateTime);
    return arrivalDate > latest ? arrivalDate : latest;
  }, new Date(flights[0].destination.dateTime));

  const daysToSaturday = 6 - lastArrival.getDay();
  const lastSaturday = new Date(lastArrival);
  lastSaturday.setDate(lastArrival.getDate() + daysToSaturday);

  return lastSaturday;
};

const getNumberOfWeeks = (firstDay: Date, secondDay: Date): number => {
  let earlierDay: number;
  let latterDay: number;

  const firstDayTime = firstDay.getTime();
  const secondDayTime = secondDay.getTime();

  if (firstDay < secondDay) {
    earlierDay = firstDayTime;
    latterDay = secondDayTime;
  } else {
    earlierDay = secondDayTime;
    latterDay = firstDayTime;
  }

  return Math.floor((latterDay - earlierDay) / 1000 / 60 / 60 / 24 / 7) + 1;
};

const Itinerary: FC<ItineraryProps> = ({ flights }) => {
  const firstSunday = getFirstSunday(flights);
  const lastSaturday = getLastSaturday(flights);
  const numberOfWeeks = getNumberOfWeeks(firstSunday, lastSaturday);

  const weeks = Array.from({ length: numberOfWeeks }, (_, index) => <Week key={index} />);

  return (
    <>
      <h2>Itinerary</h2>
      {weeks}
    </>
  );
};

export default Itinerary;
