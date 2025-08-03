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
