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

  private bookedTickets: ReplaySubject<FlightTicket[]> = new ReplaySubject<FlightTicket[]>(1);

  constructor(private http: HttpClient) {
  }

  bookTickets(bookingRequest: BookingRequest): void {
    const bookingURL = `http://localhost:8080/flights/${bookingRequest.transportationId}/bookings`;
    this.http.post<ApiResponse<FlightTicket[]>>(bookingURL, bookingRequest)
      .pipe(
        map(response => response.data)
      ).subscribe(flights =>
      this.bookedTickets.next(flights)
    );
  }

  tickets(): Observable<FlightTicket[]> {
    return this.bookedTickets;
  }
}
