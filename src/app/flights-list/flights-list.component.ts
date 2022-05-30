import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "./flight";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {

  @Input() flights?: Flight[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

}
