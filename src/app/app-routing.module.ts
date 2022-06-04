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
import {UserTicketsResolver} from "./user-booked-tickets/user-tickets.resolver";


const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuard], resolve: {flightsData: FlightsResolver},
    component: HomePageComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
    children: [
      {
        path: '',
        component: BookingFormComponent
      },
      {
        path: 'tickets',
        component: BookingResultComponent
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
        // resolve: {tickets: UserTicketsResolver},
        component: UserBookedTicketsComponent
      }
    ]
  },
  {path: 'registration', component: UserRegistrationComponent},
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
