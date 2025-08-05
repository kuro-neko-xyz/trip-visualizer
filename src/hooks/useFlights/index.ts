import { useState } from "react";
import type { Flights } from "../../models/Flight";

const useFlights = () => {
  const [flights, setFlights] = useState<Flights>(() => {
    const stored = localStorage.getItem("flights");
    return stored ? JSON.parse(stored) : [];
  });

  const storeFlights = (
    args: Flights | ((prevFlights: Flights) => Flights)
  ) => {
    if (typeof args === "function") {
      setFlights((prevFlights) => {
        const newFlights = args(prevFlights);
        localStorage.setItem("flights", JSON.stringify(newFlights));
        return newFlights;
      });
    } else {
      setFlights(args);
      localStorage.setItem("flights", JSON.stringify(args));
    }
  };

  return [flights, storeFlights] as [
    Flights,
    (args: Flights | ((flights: Flights) => Flights)) => void
  ];
};

export default useFlights;
