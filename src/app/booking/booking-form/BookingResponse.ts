import {FlightTicket} from "../booking-result/flight-ticket";

export interface BookingResponse {
  id: number,
  firstName: string,
  flightId: number,
  lastName: string,
  status: string,
  tickets: FlightTicket[],
  updatedAt: Date,
  username: string
}
