import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./auth/auth.guard";
import {UserRegistrationComponent} from "./user-registration/user-registration.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {UserBookedTicketsComponent} from "./user-booked-tickets/user-booked-tickets.component";
import {FlightsResolver} from "./home/flights-list/flights.resolver";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {
    path: 'booking',
    canActivate: [AuthGuard],
    loadChildren: () => import("./booking/booking.module").then(m => m.BookingModule)
  },

  {
    path: 'home',
    canActivate: [AuthGuard],
    resolve: {flightsData: FlightsResolver},
    data: {
      title: "Home"
    },
    component: HomeComponent
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
