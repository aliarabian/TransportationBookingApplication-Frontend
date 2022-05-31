export interface FlightTicket {
  ticketId: number,
  transportationId: number,
  offset: string,
  destination: string,
  departureDateTime: Date,
  passportNO: string,
  passengerName: string,
  age: number,
  sectionId: number,
  seatingSectionDescription: string,
  seatNO: string,
  selectedPrivileges: string[]


}
