import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter, map} from "rxjs/operators";
import {FlightsSearchService} from "./home/flights-list/flights-search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'TransportationBookingApplication-Frontend';

  constructor(private router: Router, public authService: AuthService, private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private flightService: FlightsSearchService) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = 'Transportation Booking App';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }

  goHome() {
    if (this.router.url !== '/home') {
      console.log(this.router.url)
      this.flightService.reload.next(false)
      this.router.navigate(['home'])
      return;
    }
    this.flightService.reload.next(true);
  }
}
