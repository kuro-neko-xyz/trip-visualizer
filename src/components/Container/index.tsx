import type { FC } from "react";
import type { Flight } from "../../models/Flight";
import FlightInfo from "../FlightInfo";
import FlightInput from "../FlightInput";
import Itinerary from "../Itinerary";

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
      <h2>Flights</h2>
      {flights.map((flight) => (
        <FlightInfo
          flight={flight}
          key={flight.id}
          onDeleteClick={handleDeleteFlight}
        />
      ))}
      {showForm ? (
        <FlightInput onSubmit={handleAddFlight} />
      ) : (
        <button onClick={handleShowForm}>Add New Flight</button>
      )}
      <Itinerary flights={flights} />
    </>
  );
};

export default Container;
