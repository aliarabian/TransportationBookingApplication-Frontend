import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-user-acount-menu',
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.scss']
})
export class UserAccountMenuComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
