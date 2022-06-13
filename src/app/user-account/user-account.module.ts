import {NgModule} from "@angular/core";
import {UserAccountMenuComponent} from "./user-acount-menu/user-account-menu.component";
import {UserBookedTicketsComponent} from "./user-booked-tickets/user-booked-tickets.component";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {UserAccountComponent} from "./user-account.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatExpansionModule,
    MatDividerModule
  ],
  exports: [
    UserAccountMenuComponent,
    // UserAccountMenuComponent
  ],
  declarations: [
    UserAccountComponent,
    UserAccountMenuComponent,
    UserBookedTicketsComponent
  ]
})
export class UserAccountModule {
}
