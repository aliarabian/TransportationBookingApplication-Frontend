import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookingRequest} from "./booking-form/booking-request";
import {Observable} from "rxjs";
import {ApiResponse} from "../api-response";
import {FlightTicket} from "./booking-result/flight-ticket";
import {BookingResponse} from "./booking-form/BookingResponse";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  bookTickets(bookingRequest: BookingRequest): Observable<ApiResponse<FlightTicket[]>> {
    const bookingURL = `/flights/${bookingRequest.transportationId}/bookings`;
    return this.http.post<ApiResponse<FlightTicket[]>>(bookingURL, bookingRequest);
  }

  bookTicketsWithRequestedSeats(bookingRequest: BookingRequest): Observable<ApiResponse<BookingResponse>> {
    const checkoutUrl = `/flights/${bookingRequest.transportationId}/seat-bookings`;
    return this.http.post<ApiResponse<BookingResponse>>(checkoutUrl, bookingRequest);
  }

  checkout(id: number, flightId: number): Observable<ApiResponse<BookingResponse>> {
    const checkoutUrl = `/flights/${flightId}/seat-bookings`;

    return this.http.put<ApiResponse<BookingResponse>>(checkoutUrl, {orderId: id});
  }
}
