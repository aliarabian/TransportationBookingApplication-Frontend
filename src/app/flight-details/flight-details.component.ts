import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "../flights-list/flight";
import {SeatingSection} from "../flights-list/seating-section";
import {Observable} from "rxjs";

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  @Input() flightDetails: Flight | undefined;
  @Input() section: SeatingSection | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
