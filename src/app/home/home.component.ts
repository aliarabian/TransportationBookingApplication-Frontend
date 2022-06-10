import {Component, OnDestroy, OnInit} from '@angular/core';
import {Flight} from "./flights-list/flight";
import {FlightsSearchService} from "./flights-list/flights-search.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  fetchedFlights: Flight[] | undefined;
  subscriptions?: Subscription;

  constructor(private flightSearchService: FlightsSearchService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.subscriptions = this.activatedRoute.data
      .subscribe(resolvedData => {
        this.fetchedFlights = resolvedData.flightsData.data;
      })
    this.flightSearchService.reload.next(false);
    this.flightSearchService.reload.subscribe(reload => {
      if (reload)
        this.flightSearchService.fetchLatestAvailableFlights().subscribe(response =>
          this.fetchedFlights = response.data)
    })
  }

  onSearchComplete(flights: Flight[]): void {
    this.fetchedFlights = flights;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
