import { useState } from "react";
import "./App.css";
import type { Flight, Flights } from "./models/Flight";
import Container from "./components/Container";
import useFlights from "./hooks/useFlights";
import useAccommodations from "./hooks/useAccommodations";
import type { Accommodation, Accommodations } from "./models/Accommodation";

function App() {
  const [flights, storeFlights] = useFlights();
  const [accommodations, storeAccommodations] = useAccommodations();

  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showAccommodationForm, setShowAccommodationForm] = useState(false);

  const handleUpdateAllFlights = (updatedFlights: Flights) => {
    storeFlights(updatedFlights);
  };

  const handleUpdateAllAccommodations = (
    updatedAccommodations: Accommodations
  ) => {
    storeAccommodations(updatedAccommodations);
  };

  const handleDeleteFlight = (flightId: string) => {
    storeFlights((prevFlights: Flights) =>
      prevFlights.filter((flight) => flight.id !== flightId)
    );
  };

  const handleDeleteAccommodation = (accommodationId: string) => {
    storeAccommodations((prevAccommodations: Accommodations) =>
      prevAccommodations.filter(
        (accommodation) => accommodation.id !== accommodationId
      )
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
    setShowFlightForm(false);
  };

  const handleAddAccommodation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accommodationData: Accommodation = {
      id: crypto.randomUUID(),
      airportCode: formData.get("airportCode") as string,
      checkIn: `${formData.get("checkInDate")}T${formData.get(
        "checkInTime"
      )}${formData.get("timeZone")}`,
      checkOut: `${formData.get("checkOutDate")}T${formData.get(
        "checkOutTime"
      )}${formData.get("timeZone")}`,
    };
    storeAccommodations((prevAccommodations: Accommodations) => [
      ...prevAccommodations,
      accommodationData,
    ]);
    setShowAccommodationForm(false);
  };

  const handleShowFlightForm = () => {
    setShowFlightForm(true);
  };

  return (
    <Container
      flights={flights}
      handleUpdateAllFlights={handleUpdateAllFlights}
      handleAddFlight={handleAddFlight}
      handleDeleteFlight={handleDeleteFlight}
      handleShowFlightForm={handleShowFlightForm}
      showFlightForm={showFlightForm}
      accommodations={accommodations}
      handleUpdateAllAccommodations={handleUpdateAllAccommodations}
      handleAddAccommodation={handleAddAccommodation}
      handleDeleteAccommodation={handleDeleteAccommodation}
      handleShowAccommodationForm={() => setShowAccommodationForm(true)}
      showAccommodationForm={showAccommodationForm}
    />
  );
}

export default App;
