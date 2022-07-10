import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Router} from "@angular/router";
import {BookingService} from "../booking.service";
import {catchError} from "rxjs/operators";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order?: any;
  timedout: boolean = false;
  counter: number = 0;
  countDownSubscription: Subscription | undefined;

  constructor(private router: Router, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.order = history.state.tickets;
    if (!this.order) {
      this.router.navigate(['home']);
    }
    this.counter = this.order.orderCheckoutTimeLimit * 60;
    console.log(this.counter);
    this.countDownSubscription = timer(0, 1000).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.timedout = true
        setTimeout(() => {
          history.back();
        }, 1000);
      }
    });
  }

  checkout() {
    this.bookingService.checkout(this.order.id, this.order.flightId)
      .pipe(
        catchError(error => {
          this.timedout = true;
          setTimeout(() => {
            history.back();
          }, 1000);
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response)
        this.countDownSubscription?.unsubscribe();
        this.router.navigate(['booking/tickets'], {state: {tickets: response.data.tickets}});
      })
  }
}


@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
