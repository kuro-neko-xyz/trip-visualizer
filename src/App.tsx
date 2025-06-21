import { useState } from "react";
import "./App.css";
import FlightInput from "./components/FlightInput";
import type { Flights } from "./models/Flight";
import FlightInfo from "./components/FlightInfo";

function App() {
  const [flights, setFlights] = useState<Flights>([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <h1>Flights</h1>
      {flights.map((flight) => (
        <FlightInfo flight={flight} key={flight.id} />
      ))}
      {showForm ? (
        <FlightInput setFlights={setFlights} setShowForm={setShowForm} />
      ) : (
        <button onClick={() => setShowForm(true)}>Add New Flight</button>
      )}
    </>
  );
}

export default App;
