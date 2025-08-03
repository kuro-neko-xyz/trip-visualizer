import { useState } from "react";
import type { Flights } from "../../models/Flight";

const useFlights = () => {
  const [flights, setFlights] = useState<Flights>(() => {
    const stored = localStorage.getItem("flights");
    return stored ? JSON.parse(stored) : [];
  });

  const storeFlights = (callback: (prevFlights: Flights) => Flights) => {
    setFlights((prevFlights) => {
      const newFlights = callback(prevFlights);
      localStorage.setItem("flights", JSON.stringify(newFlights));
      return newFlights;
    });
  };

  return [flights, storeFlights] as [
    Flights,
    (updater: (flights: Flights) => Flights) => void
  ];
};

export default useFlights;
