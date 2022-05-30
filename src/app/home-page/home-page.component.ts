import {Component, OnInit} from '@angular/core';
import {Flight} from "../flights-list/flight";
import {FlightsSearchService} from "../flights-list/flights-search.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  fetchedFlights: Flight[] | undefined;


  constructor(private flightSearchService: FlightsSearchService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.data
      .subscribe(resolvedData => {
        this.fetchedFlights = resolvedData.flightsData.data;
      })
  }

  onSearchComplete(flights: Flight[]) {
    this.fetchedFlights = flights;
  }
}
