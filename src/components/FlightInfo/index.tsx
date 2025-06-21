import type { FC } from "react";
import type { Flight } from "../../models/Flight";

interface FlightInfoProps {
  flight: Flight;
}

const FlightInfo: FC<FlightInfoProps> = ({ flight }) => {
  return (
    <div className="flight-info">
      <h2>Flight Information</h2>
      <div className="flight-details">
        <div className="flight-origin">
          <h3>Origin</h3>
          <p>
            Airport Code: {flight.origin.airportCode}
            <br />
            Time Zone: {flight.origin.timeZone}
            <br />
            Date: {new Date(flight.origin.dateTime).toLocaleDateString()}
            <br />
            Time: {new Date(flight.origin.dateTime).toLocaleTimeString()}
          </p>
        </div>
        <div className="flight-destination">
          <h3>Destination</h3>
          <p>
            Airport Code: {flight.destination.airportCode}
            <br />
            Time Zone: {flight.destination.timeZone}
            <br />
            Date: {new Date(flight.destination.dateTime).toLocaleDateString()}
            <br />
            Time: {new Date(flight.destination.dateTime).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
