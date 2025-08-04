import type { FC } from "react";
import AccommodationInput from "../AccommodationInput";
import type { Accommodations } from "../../models/Accommodation";
import AccommodationInfo from "../AccommodationInfo";

interface AccommodationProps {
  accommodations: Accommodations;
  handleAddAccommodation: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteAccommodation: (accommodationId: string) => void;
  handleShowForm: () => void;
  showForm: boolean;
}

const AccommodationsContainer: FC<AccommodationProps> = ({
  accommodations,
  handleAddAccommodation,
  handleDeleteAccommodation,
  handleShowForm,
  showForm,
}) => {
  return (
    <>
      <h2>Accommodations</h2>
      {accommodations.map((accommodation) => (
        <AccommodationInfo
          accommodation={accommodation}
          key={accommodation.id}
          onDeleteClick={handleDeleteAccommodation}
        />
      ))}
      {showForm ? (
        <AccommodationInput onSubmit={handleAddAccommodation} />
      ) : (
        <button onClick={handleShowForm}>Add New Accommodation</button>
      )}
    </>
  );
};

export default AccommodationsContainer;
