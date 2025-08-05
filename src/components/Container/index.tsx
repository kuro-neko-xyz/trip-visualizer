import type { FC } from "react";
import type { Flights } from "../../models/Flight";
import Itinerary from "../Itinerary";
import FlightsContainer from "../FlightsContainer";
import AccommodationsContainer from "../AccommodationsContainer";
import type { Accommodations } from "../../models/Accommodation";
import Header from "../Header";

interface ContainerProps {
  flights: Flights;
  handleUpdateAllFlights: (updatedFlights: Flights) => void;
  handleAddFlight: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteFlight: (flightId: string) => void;
  handleShowFlightForm: () => void;
  showFlightForm: boolean;
  accommodations: Accommodations;
  handleUpdateAllAccommodations: (
    updatedAccommodations: Accommodations
  ) => void;
  handleAddAccommodation: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteAccommodation: (flightId: string) => void;
  handleShowAccommodationForm: () => void;
  showAccommodationForm: boolean;
}

const Container: FC<ContainerProps> = ({
  flights,
  handleUpdateAllFlights,
  handleAddFlight,
  handleDeleteFlight,
  handleShowFlightForm,
  showFlightForm,
  accommodations,
  handleUpdateAllAccommodations,
  handleAddAccommodation,
  handleDeleteAccommodation,
  handleShowAccommodationForm,
  showAccommodationForm,
}) => {
  return (
    <>
      <Header
        handleUpdateAllFlights={handleUpdateAllFlights}
        handleUpdateAllAccommodations={handleUpdateAllAccommodations}
      />
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
