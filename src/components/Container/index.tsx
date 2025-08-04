import type { FC } from "react";
import type { Flight } from "../../models/Flight";
import Itinerary from "../Itinerary";
import Flights from "../Flights";

interface ContainerProps {
  flights: Flight[];
  handleAddFlight: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteFlight: (flightId: string) => void;
  handleShowForm: () => void;
  showForm: boolean;
}

const Container: FC<ContainerProps> = ({
  flights,
  handleAddFlight,
  handleDeleteFlight,
  handleShowForm,
  showForm,
}) => {
  return (
    <>
      <Flights
        flights={flights}
        handleAddFlight={handleAddFlight}
        handleDeleteFlight={handleDeleteFlight}
        handleShowForm={handleShowForm}
        showForm={showForm}
      />
      <Itinerary flights={flights} />
    </>
  );
};

export default Container;
