import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BookingService} from "../booking.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order?: any;

  constructor(private router: Router, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.order = history.state.tickets;
    if (!this.order) {
      this.router.navigate(['home']);
    }
  }

  checkout() {
    this.bookingService.checkout(this.order.id, this.order.flightId)
      .subscribe(response => console.log(response))
  }
}
