import {Component, OnInit} from '@angular/core';
import {FlightTicket} from "../booking/flight-ticket";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-result',
  templateUrl: './booking-result.component.html',
  styleUrls: ['./booking-result.component.css']
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

}
