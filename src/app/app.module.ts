import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthModule} from "./auth/auth.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {UserAccountMenuComponent} from './user-acount-menu/user-account-menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {UserBookedTicketsComponent} from './user-booked-tickets/user-booked-tickets.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BookingModule} from "./booking/booking.module";
import {HomeModule} from "./home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserAccountMenuComponent,
    UserBookedTicketsComponent,
    UserRegistrationComponent,
    UserAccountComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
