import {Component, OnInit} from '@angular/core';
import {Flight} from "./flight";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {

  flights?: Flight[];

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.data
      .subscribe(resolvedData => {
        this.flights = resolvedData.flightsData.data;
      })
  }

}
