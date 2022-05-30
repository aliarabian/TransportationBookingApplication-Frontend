import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlightsSearchService} from "../flights-list/flights-search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent implements OnInit {
  searchFlightForm: FormGroup = this.fb.group({
    "flightOffset": ['', [Validators.required]],
    "flightDestination": ['', [Validators.required]],
    "flightDepartureTime": ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private flightsSearchService: FlightsSearchService, private route: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.route.navigate(['/search'], {
      queryParams: {
        offset: this.searchFlightForm.value.flightOffset,
        destination: this.searchFlightForm.value.flightDestination,
        departureDate: new Date(this.searchFlightForm.value.flightDepartureTime)
      }
    }).then(() => window.location.reload())
  }

}
