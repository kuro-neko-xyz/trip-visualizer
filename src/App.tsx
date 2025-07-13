import { useState } from "react";
import "./App.css";
import type { Flight, Flights } from "./models/Flight";
import Container from "./components/Container";

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
    <Container
      flights={flights}
      handleAddFlight={handleAddFlight}
      handleDeleteFlight={handleDeleteFlight}
      handleShowForm={handleShowForm}
      showForm={showForm}
    />
  );
}

export default App;
