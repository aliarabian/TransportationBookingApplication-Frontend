import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingComponent} from "./booking.component";
import {BookingFormComponent} from "./booking-form/booking-form.component";
import {BookingResultComponent} from "./booking-result/booking-result.component";
import {AuthGuard} from "../auth/auth.guard";
import {CanDeactivateGuard} from "./can-deactivate.guard";
import {CheckoutComponent} from "./checkout/checkout.component";

const routes: Routes = [

  {
    path: '',
    component: BookingComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: BookingFormComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: "Booking Flight Tickets"
        }
      },
      {
        path: 'tickets',
        component: BookingResultComponent,
        data: {
          title: "Tickets"
        }
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Checkout'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
