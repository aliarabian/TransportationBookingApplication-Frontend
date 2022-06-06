import {NgModule} from "@angular/core";
import {BookingFormComponent} from "./booking-form/booking-form.component";
import {BookingResultComponent} from "./booking-result/booking-result.component";
import {CommonModule} from "@angular/common";
import {BookingRoutingModule} from "./booking-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";
import {BookingComponent} from "./booking.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule(
  {
    declarations: [
      BookingComponent,
      BookingFormComponent,
      BookingResultComponent

    ],
    imports: [
      CommonModule,
      BookingRoutingModule,
      HomeModule,
      ReactiveFormsModule,
      MatIconModule,
    ],
    providers: []
  }
)
export class BookingModule {

}
