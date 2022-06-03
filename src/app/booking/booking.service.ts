import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookingRequest} from "./booking-request";
import {Observable, ReplaySubject} from "rxjs";
import {ApiResponse} from "../api-response";
import {FlightTicket} from "./flight-ticket";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  bookTickets(bookingRequest: BookingRequest): Observable<ApiResponse<FlightTicket[]>> {
    const bookingURL = `http://localhost:8080/flights/${bookingRequest.transportationId}/bookings`;
    return this.http.post<ApiResponse<FlightTicket[]>>(bookingURL, bookingRequest);
  }

}
