import { useState } from "react";
import "./App.css";
import type { Flight, Flights } from "./models/Flight";
import Container from "./components/Container";
import useFlights from "./hooks/useFlights";

function App() {
  const [flights, storeFlights] = useFlights();
  const [showForm, setShowForm] = useState(false);

  const handleDeleteFlight = (flightId: string) => {
    storeFlights((prevFlights: Flights) =>
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
        dateTime: `${formData.get("departureDate")}T${formData.get(
          "departureTime"
        )}${formData.get("originTimeZone")}`,
      },
      destination: {
        airportCode: formData.get("destinationAirportCode") as string,
        dateTime: `${formData.get("arrivalDate")}T${formData.get(
          "arrivalTime"
        )}${formData.get("destinationTimeZone")}`,
      },
    };
    storeFlights((prevFlights: Flights) => [...prevFlights, flightData]);
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
