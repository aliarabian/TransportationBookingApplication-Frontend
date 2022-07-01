import {BookingDetails} from "./booking-details";

export class BookingRequest {
  seatingSectionId: number;
  customerId: number;
  transportationId: number;
  seatIds: number[];

  passengersBookingDetails: BookingDetails[];

  constructor(customerId: number, transportationId: number, seatingSectionId: number, passengersBookingDetails: BookingDetails[], seats: number[]) {
    this.seatingSectionId = seatingSectionId;
    this.customerId = customerId;
    this.transportationId = transportationId;
    this.passengersBookingDetails = passengersBookingDetails;
    this.seatIds = seats;
  }
}
