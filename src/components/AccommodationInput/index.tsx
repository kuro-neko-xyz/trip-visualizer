import type { FC } from "react";
import { timeZones } from "../../constants/timeZones";
import styles from "./styles.module.scss";

interface AccommodationInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AccommodationInput: FC<AccommodationInputProps> = ({ onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th scope="col">Accommodation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Airport Code</th>
            <td>
              <input type="text" name="airportCode" required/>
            </td>
          </tr>
          <tr>
            <th scope="row">Time zone</th>
            <td>
              <select name="timeZone" required>
                {timeZones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <th scope="row">Check-in Date</th>
            <td>
              <input type="date" name="checkInDate" required/>
            </td>
          </tr>
          <tr>
            <th scope="row">Check-in Time</th>
            <td>
              <input type="time" name="checkInTime" required/>
            </td>
          </tr>
          <tr>
            <th scope="row">Check-out Date</th>
            <td>
              <input type="date" name="checkOutDate" required/>
            </td>
          </tr>
          <tr>
            <th scope="row">Check-out Time</th>
            <td>
              <input type="time" name="checkOutTime" required/>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button type="submit">Add Accommodation</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AccommodationInput;
