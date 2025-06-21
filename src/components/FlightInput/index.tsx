import type { FC } from "react";

const FlightInput: FC = () => {
  return (
    <form>
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
              <input type="text" name="originTimeZone" />
            </td>
            <td>
              <input type="text" name="destinationTimeZone" />
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
        </tbody>
      </table>
    </form>
  );
};

export default FlightInput;
