import {SeatingSection} from "./seating-section";

export interface Flight {
  availableSeats: number,
  departuresAt: Date,
  destination: string,
  id: number,
  offset: string,
  sections: SeatingSection[],
  vehicleModelName: string
}
