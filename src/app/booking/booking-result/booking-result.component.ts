import {Component, OnInit} from '@angular/core';
import {FlightTicket} from "./flight-ticket";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-booking-result',
  templateUrl: './booking-result.component.html',
  styleUrls: ['./booking-result.component.scss']
})
export class BookingResultComponent implements OnInit {
  tickets?: FlightTicket[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.tickets = history.state.tickets;
    if (!this.tickets) {
      this.router.navigate(['home']);
    }
  }

  tickets$(): Observable<FlightTicket[]> {
    return of(this.tickets!);
  }
}
