import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "./flight";
import {HttpClient} from "@angular/common/http";
import {SeatingSection} from "./seating-section";
import {FlightCardModalComponent} from "../flight-card-modal/flight-card-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {

  @Input() flights?: Flight[];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  openModal(flight: Flight, section: SeatingSection) {
    this.dialog.open(FlightCardModalComponent, {
      data: {
        flight: flight,
        section: section
      }
    });
  }
}
