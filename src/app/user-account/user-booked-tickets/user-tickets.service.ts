import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../../api-response";
import {FlightTicket} from "../../booking/booking-result/flight-ticket";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserTicketsService {
  private userId: number = 924427;

  constructor(private http: HttpClient) {

  }

  getBookedTickets() {
    return this.http.get<ApiResponse<FlightTicket[]>>(`/users/${(this.userId)}/flight-bookings`)
      .pipe(
        map(response => response.data)
      );

  }
}
