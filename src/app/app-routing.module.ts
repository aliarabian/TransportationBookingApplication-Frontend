import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthGuard} from "./auth/auth.guard";
import {UserRegistrationComponent} from "./user-registration/user-registration.component";
import {FlightsResolver} from "./flights-list/flights.resolver";
import {BookingComponent} from "./booking/booking.component";
import {BookingResultComponent} from "./booking-result/booking-result.component";
import {BookingFormComponent} from "./booking-form/booking-form.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {UserBookedTicketsComponent} from "./user-booked-tickets/user-booked-tickets.component";


const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuard], resolve: {flightsData: FlightsResolver},
    data: {
      title: "Home"
    },
    component: HomePageComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
    children: [
      {
        path: '',
        component: BookingFormComponent,
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
      }
    ]
  },
  {
    path: 'user/account', component: UserAccountComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "tickets",
        component: UserBookedTicketsComponent,
        data: {
          title: "Booked Tickets"
        }
      }
    ]
  },
  {
    path: 'registration',
    component: UserRegistrationComponent,
    data: {
      title: "User Registration"
    }
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
