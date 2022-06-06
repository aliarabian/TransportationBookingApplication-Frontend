import {BookingDetails} from "./booking-details";

export class BookingRequest {
  seatingSectionId: number;
  customerId: number;
  transportationId: number;


  passengersBookingDetails: BookingDetails[];

  constructor(customerId: number, transportationId: number, seatingSectionId: number, passengersBookingDetails: BookingDetails[]) {
    this.seatingSectionId = seatingSectionId;
    this.customerId = customerId;
    this.transportationId = transportationId;
    this.passengersBookingDetails = passengersBookingDetails;
  }


}
