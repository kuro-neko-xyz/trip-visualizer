import { useState } from "react";
import type { Accommodations } from "../../models/Accommodation";

const useAccommodations = () => {
  const [accommodations, setAccommodations] = useState<Accommodations>(() => {
    const stored = localStorage.getItem("accommodations");
    return stored ? JSON.parse(stored) : [];
  });

  const storeAccommodations = (
    args:
      | Accommodations
      | ((prevAccommodations: Accommodations) => Accommodations)
  ) => {
    if (typeof args === "function") {
      setAccommodations((prevAccommodations) => {
        const newAccommodations = args(prevAccommodations);
        localStorage.setItem(
          "accommodations",
          JSON.stringify(newAccommodations)
        );
        return newAccommodations;
      });
    } else {
      setAccommodations(args);
      localStorage.setItem("accommodations", JSON.stringify(args));
    }
  };

  return [accommodations, storeAccommodations] as [
    Accommodations,
    (
      args:
        | Accommodations
        | ((accommodations: Accommodations) => Accommodations)
    ) => void
  ];
};

export default useAccommodations;
