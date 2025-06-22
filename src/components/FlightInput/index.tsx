import type { Dispatch, FC, SetStateAction } from "react";
import type { Flights } from "../../models/Flight";
import { timeZones } from "../../constants/timeZones";

interface FlightInputProps {
  setFlights: Dispatch<SetStateAction<Flights>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const FlightInput: FC<FlightInputProps> = ({ setFlights, setShowForm }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const flightData = {
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

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th scope="col">Origin</th>
            <th scope="col">Destination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Airport Code</th>
            <td>
              <input type="text" name="originAirportCode" />
            </td>
            <td>
              <input type="text" name="destinationAirportCode" />
            </td>
          </tr>
          <tr>
            <th scope="row">Time zone</th>
            <td>
              <select name="originTimeZone">
                {timeZones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="destinationTimeZone">
                {timeZones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <th scope="row">Date (Departure/Arrival)</th>
            <td>
              <input type="date" name="departureDate" />
            </td>
            <td>
              <input type="date" name="arrivalDate" />
            </td>
          </tr>
          <tr>
            <th scope="row">Time (Departure/Arrival)</th>
            <td>
              <input type="time" name="departureTime" />
            </td>
            <td>
              <input type="time" name="arrivalTime" />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <button type="submit">Add Flight</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FlightInput;
