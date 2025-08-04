import type { FC } from "react";
import type { Flights } from "../../models/Flight";
import Itinerary from "../Itinerary";
import FlightsContainer from "../FlightsContainer";
import AccommodationsContainer from "../AccommodationsContainer";
import type { Accommodations } from "../../models/Accommodation";

interface ContainerProps {
  flights: Flights;
  handleAddFlight: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteFlight: (flightId: string) => void;
  handleShowFlightForm: () => void;
  showFlightForm: boolean;
  accommodations: Accommodations;
  handleAddAccommodation: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteAccommodation: (flightId: string) => void;
  handleShowAccommodationForm: () => void;
  showAccommodationForm: boolean;
}

const Container: FC<ContainerProps> = ({
  flights,
  handleAddFlight,
  handleDeleteFlight,
  handleShowFlightForm,
  showFlightForm,
  accommodations,
  handleAddAccommodation,
  handleDeleteAccommodation,
  handleShowAccommodationForm,
  showAccommodationForm,
}) => {
  return (
    <>
      <FlightsContainer
        flights={flights}
        handleAddFlight={handleAddFlight}
        handleDeleteFlight={handleDeleteFlight}
        handleShowForm={handleShowFlightForm}
        showForm={showFlightForm}
      />
      <AccommodationsContainer
        accommodations={accommodations}
        handleAddAccommodation={handleAddAccommodation}
        handleDeleteAccommodation={handleDeleteAccommodation}
        handleShowForm={handleShowAccommodationForm}
        showForm={showAccommodationForm}
      />
      <Itinerary flights={flights} accommodations={accommodations} />
    </>
  );
};

export default Container;
