import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthModule} from "./auth/auth.module";
import {RouterModule} from "@angular/router";
import {HomePageComponent} from './home-page/home-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {FlightsListComponent} from './flights-list/flights-list.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FlightSearchFormComponent} from './flight-search-form/flight-search-form.component';
import {TerminalsListComponent} from './terminals-list/terminals-list.component';
import {SelectComponent} from './select/select.component';
import {ClickOutsideDirective} from './click-outside.directive';
import { BookingComponent } from './booking/booking.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomePageComponent,
    FlightsListComponent,
    UserRegistrationComponent,
    FlightSearchFormComponent,
    TerminalsListComponent,
    SelectComponent,
    ClickOutsideDirective,
    BookingComponent,
    FlightDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
