import {Component, OnInit} from '@angular/core';
import {UserTicketsService} from "./user-tickets.service";
import {Observable} from "rxjs";
import {FlightTicket} from "../../booking/booking-result/flight-ticket";

@Component({
  selector: 'app-user-booked-tickets',
  templateUrl: './user-booked-tickets.component.html',
  styleUrls: ['./user-booked-tickets.component.scss']
})
export class UserBookedTicketsComponent implements OnInit {
  tickets?: Observable<FlightTicket[]>

  panelOpenState = false;

  constructor(private ticketsService: UserTicketsService) {
  }

  ngOnInit(): void {
    this.tickets = this.ticketsService.getBookedTickets();
  }

}
