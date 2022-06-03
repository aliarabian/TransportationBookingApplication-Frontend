import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FlightTicket} from "../booking/flight-ticket";
import {ActivatedRoute} from "@angular/router";
import {BookingService} from "../booking/booking.service";
import {waitForAsync} from "@angular/core/testing";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";

@Component({
  selector: 'app-booking-result',
  templateUrl: './booking-result.component.html',
  styleUrls: ['./booking-result.component.css']
})
export class BookingResultComponent implements OnInit {
  tickets?: Observable<FlightTicket[]>;

  constructor(private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.tickets = this.bookingService.tickets()
  }

}
