import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthGuard} from "./auth/auth.guard";
import {UserRegistrationComponent} from "./user-registration/user-registration.component";
import {FlightsResolver} from "./flights-list/flights.resolver";


const routes: Routes = [
  {path: 'home', canActivate: [AuthGuard], resolve: {flightsData: FlightsResolver}, component: HomePageComponent},
  {path: 'search', canActivate: [AuthGuard], resolve: {flightsData: FlightsResolver}, component: HomePageComponent},
  {path: 'users/registration', component: UserRegistrationComponent},
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
