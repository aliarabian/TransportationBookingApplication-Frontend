import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlightsSearchService} from "../flights-list/flights-search.service";
import {Flight} from "../flights-list/flight";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent implements OnInit, OnDestroy {
  searchFlightForm: FormGroup = this.fb.group({
    "flightOffset": ['', [Validators.required]],
    "flightDestination": ['', [Validators.required]],
    "flightDepartureTime": ['', [Validators.required]],
  });

  @Output() searchResult = new EventEmitter<Flight[]>()

  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private flightsSearchService: FlightsSearchService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    let queryParams: FlightSearchQuery = {
      offset: this.searchFlightForm.value.flightOffset,
      destination: this.searchFlightForm.value.flightDestination,
      departureDate: new Date(this.searchFlightForm.value.flightDepartureTime)

    };
    this.subscription = this.flightsSearchService
      .searchWithQueryParams(queryParams).subscribe((response) => {
        this.searchResult.emit(response.data)
      });
  }

}

export interface FlightSearchQuery {
  offset: string,
  destination: string,
  departureDate: Date
}
