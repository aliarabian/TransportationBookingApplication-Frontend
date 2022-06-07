import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlightsSearchService} from "../flights-list/flights-search.service";
import {Flight} from "../flights-list/flight";
import {Observable, Subscription} from "rxjs";
import {TerminalsService} from "./terminals.service";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.sass']
})
export class FlightSearchFormComponent implements OnInit, OnDestroy {
  searchFlightForm: FormGroup = this.fb.group({
    "flightOffset": ['', [Validators.required]],
    "flightDestination": ['', [Validators.required]],
    "flightDepartureTime": ['', [Validators.required]],
  });
  inputDataList?: Observable<string[]>;
  @Output() searchResult = new EventEmitter<Flight[]>()

  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private flightsSearchService: FlightsSearchService,
              private terminalsService: TerminalsService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {

    this.inputDataList = this.terminalsService.fetchTerminals()
      .pipe(
        map(response => [...new Set(response.data.map(terminal => terminal.city.name))]),
        shareReplay(1)
      )
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
