import {NgModule} from "@angular/core";
import {FlightSearchFormComponent} from "./flight-search-form/flight-search-form.component";
import {FlightsListComponent} from "./flights-list/flights-list.component";
import {FlightDetailsComponent} from "./flight-details/flight-details.component";
import {FlightCardModalComponent} from "./flight-card-modal/flight-card-modal.component";
import {ClickOutsideDirective} from "./click-outside.directive";
import {SelectComponent} from "./select/select.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    MatIconModule
  ],
  exports: [
    FlightDetailsComponent
  ],

  declarations: [
    HomeComponent,
    FlightSearchFormComponent,
    FlightsListComponent,
    FlightDetailsComponent,
    FlightCardModalComponent,
    ClickOutsideDirective,
    SelectComponent,
  ]
})
export class HomeModule {

}
