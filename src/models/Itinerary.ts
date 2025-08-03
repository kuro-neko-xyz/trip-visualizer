export interface ItineraryElement {
  location: string;
  startDate: Date;
  endDate: Date;
}

interface ExtendedItineraryElement extends ItineraryElement {
  position: number;
}

export type DayItinerary = ExtendedItineraryElement[];

export type WeekItinerary = DayItinerary[];
