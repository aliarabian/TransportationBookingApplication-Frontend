import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Flight} from "../flights-list/flight";
import {SeatingSection} from "../flights-list/seating-section";

export interface DialogData {
  flight: Flight,
  section: SeatingSection

}

@Component({
  selector: 'app-flight-card-modal',
  templateUrl: './flight-card-modal.component.html',
  styleUrls: ['./flight-card-modal.component.scss']
})
export class FlightCardModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

}
