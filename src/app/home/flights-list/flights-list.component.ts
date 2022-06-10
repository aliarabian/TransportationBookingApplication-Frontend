import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Flight} from "./flight";
import {HttpClient} from "@angular/common/http";
import {SeatingSection} from "./seating-section";
import {FlightCardModalComponent} from "../flight-card-modal/flight-card-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss'],
  animations: [
    trigger('collapsable', [
      state('false', style({
        height: 0, width: 0, visibility: 'hidden', opacity: 0, margin: '-16px'
      })),
      state('true', style({
        height: AUTO_STYLE, visibility: AUTO_STYLE, opacity: 1
      })),
      transition('false => true', animate(1000 + 'ms ease-in-out')),
      transition('true => false', animate(1000 + 'ms ease-in-out'))
    ])
  ]
})
export class FlightsListComponent implements OnInit, OnChanges {

  @Input() flights?: Flight[];
  collapsed: boolean[][] = [];
  filters: string[] = ['business class', 'economy class', 'first class'];

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

  ngOnChanges(changes: SimpleChanges): void {
    this.collapsed = [];
      for (let i = 0; i < changes.flights.currentValue.length; i++) {
        let sectionCard: boolean[] = []
        for (let j = 0; j < changes.flights.currentValue[i].sections.length; j++) {
          sectionCard.push(false);
        }
        this.collapsed.push(sectionCard);
      }
  }


  onCollapse($event: MouseEvent, i: number, j: number) {
    $event.stopImmediatePropagation();
    this.collapsed[i][j] = !this.collapsed[i][j];
  }

  onFilterChange($event: Event) {
    let target = $event.target as HTMLInputElement;
    let filter = target.value;
    filter = filter + " class";
    if (!target.checked) {
      let indexOf = this.filters.indexOf(filter);
      this.filters.splice(indexOf, 1);
      return;
    }
    this.filters.push(filter)
  }
}
