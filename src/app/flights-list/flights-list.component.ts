import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "./flight";
import {HttpClient} from "@angular/common/http";
import {SeatingSection} from "./seating-section";
import {FlightCardModalComponent} from "../flight-card-modal/flight-card-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css'],
  animations: [
    trigger('collapsable', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class FlightsListComponent implements OnInit {

  @Input() flights?: Flight[];
  collapse: boolean[][] = [[]];

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
