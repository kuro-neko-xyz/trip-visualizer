import type { FC } from "react";
import { timeZones } from "../../constants/timeZones";
import styles from "./styles.module.scss";

interface FlightInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FlightInput: FC<FlightInputProps> = ({ onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
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
              <input type="text" name="originAirportCode" required/>
            </td>
            <td>
              <input type="text" name="destinationAirportCode" required/>
            </td>
          </tr>
          <tr>
            <th scope="row">Time zone</th>
            <td>
              <select name="originTimeZone" required>
                {timeZones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="destinationTimeZone" required>
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
              <input type="date" name="departureDate" required/>
            </td>
            <td>
              <input type="date" name="arrivalDate" required/>
            </td>
          </tr>
          <tr>
            <th scope="row">Time (Departure/Arrival)</th>
            <td>
              <input type="time" name="departureTime" required/>
            </td>
            <td>
              <input type="time" name="arrivalTime" required/>
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
