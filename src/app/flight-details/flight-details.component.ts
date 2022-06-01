import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "../flights-list/flight";

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  @Input() flightDetails: Flight | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
