import { useState } from "react";
import type { Accommodations } from "../../models/Accommodation";

const useAccommodations = () => {
  const [accommodations, setAccommodations] = useState<Accommodations>(() => {
    const stored = localStorage.getItem("accommodations");
    return stored ? JSON.parse(stored) : [];
  });

  const storeAccommodations = (
    callback: (prevAccommodations: Accommodations) => Accommodations
  ) => {
    setAccommodations((prevAccommodations) => {
      const newAccommodations = callback(prevAccommodations);
      localStorage.setItem("accommodations", JSON.stringify(newAccommodations));
      return newAccommodations;
    });
  };

  return [accommodations, storeAccommodations] as [
    Accommodations,
    (updater: (accommodations: Accommodations) => Accommodations) => void
  ];
};

export default useAccommodations;
