import { useState } from "react";
import "./App.css";
import FlightInput from "./components/FlightInput";
import type { Flight, Flights } from "./models/Flight";
import FlightInfo from "./components/FlightInfo";

function App() {
  const [flights, setFlights] = useState<Flights>([]);
  const [showForm, setShowForm] = useState(false);

  const handleDeleteFlight = (flightId: string) => {
    setFlights((prevFlights) =>
      prevFlights.filter((flight) => flight.id !== flightId)
    );
  };

  const handleAddFlight = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const flightData: Flight = {
      id: crypto.randomUUID(),
      origin: {
        airportCode: formData.get("originAirportCode") as string,
        timeZone: formData.get("originTimeZone") as string,
        dateTime: `${formData.get("departureDate")}T${formData.get(
          "departureTime"
        )}`,
      },
      destination: {
        airportCode: formData.get("destinationAirportCode") as string,
        timeZone: formData.get("destinationTimeZone") as string,
        dateTime: `${formData.get("arrivalDate")}T${formData.get(
          "arrivalTime"
        )}`,
      },
    };
    setFlights((prevFlights) => [...prevFlights, flightData]);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <>
      <h1>Flights</h1>
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
    </>
  );
}

export default App;
