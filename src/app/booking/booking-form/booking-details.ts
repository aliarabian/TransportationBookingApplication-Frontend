import {PassengerDetails} from "./passenger-details";

export class BookingDetails {
  seatingSectionPrivilegeIds: number[];
  passenger: PassengerDetails;

  constructor(seatingSectionPrivilegeIds: number[], passenger: PassengerDetails) {
    this.seatingSectionPrivilegeIds = seatingSectionPrivilegeIds;
    this.passenger = passenger;
  }
}
