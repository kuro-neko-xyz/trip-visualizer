import type { FC } from "react";
import FlightInfo from "../FlightInfo";
import FlightInput from "../FlightInput";
import type { Flight } from "../../models/Flight";

interface FlightsProps {
  flights: Flight[];
  handleAddFlight: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteFlight: (flightId: string) => void;
  handleShowForm: () => void;
  showForm: boolean;
}

const Flights: FC<FlightsProps> = ({
  flights,
  handleAddFlight,
  handleDeleteFlight,
  handleShowForm,
  showForm,
}) => {
  return (
    <>
      <h2>Flights</h2>
      <details open>
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
      </details>
    </>
  );
};

export default Flights;
