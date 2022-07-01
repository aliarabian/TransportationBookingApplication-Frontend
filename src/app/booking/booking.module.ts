import {NgModule} from "@angular/core";
import {BookingFormComponent} from "./booking-form/booking-form.component";
import {BookingResultComponent} from "./booking-result/booking-result.component";
import {CommonModule} from "@angular/common";
import {BookingRoutingModule} from "./booking-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";
import {BookingComponent} from "./booking.component";
import {MatIconModule} from "@angular/material/icon";
import {UserAccountModule} from "../user-account/user-account.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {BookingFailedModalComponent} from './booking-failed-modal/booking-failed-modal.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule(
  {
    declarations: [
      BookingComponent,
      BookingFormComponent,
      BookingResultComponent,
      BookingFailedModalComponent,
      CheckoutComponent

    ],
    imports: [
      CommonModule,
      BookingRoutingModule,
      HomeModule,
      ReactiveFormsModule,
      MatIconModule,
      UserAccountModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule
    ],
    providers: []
  }
)
export class BookingModule {

}
