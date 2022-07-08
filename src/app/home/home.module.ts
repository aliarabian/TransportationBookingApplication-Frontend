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
import {FilterPipe} from './select/filter.pipe';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ListItemComponent } from './list-item/list-item.component';
import {A11yModule} from "@angular/cdk/a11y";

@NgModule({
  declarations: [
    FilterPipe,
    HomeComponent,
    FlightSearchFormComponent,
    FlightsListComponent,
    FlightDetailsComponent,
    FlightCardModalComponent,
    ClickOutsideDirective,
    SelectComponent,
    ListItemComponent,
  ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        HomeRoutingModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        A11yModule
    ],
  exports: [
    FlightDetailsComponent,
  ],

})
export class HomeModule {

}
