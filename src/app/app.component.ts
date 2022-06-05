import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'TransportationBookingApplication-Frontend';

  constructor(private http: HttpClient, public authService: AuthService) {
  }

  ngOnInit(): void {
    // this.http.head("/flights");
  }

}
