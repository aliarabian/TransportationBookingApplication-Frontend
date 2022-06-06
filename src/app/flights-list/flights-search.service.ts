import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../api-response";
import {Flight} from "./flight";
import {FlightSearchQuery} from "../flight-search-form/flight-search-form.component";
import {fchmod} from "fs";

@Injectable({
  providedIn: 'root'
})
export class FlightsSearchService {

  flightsEndpointURL: string = "/flights";

  reload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
  }

  searchWithQueryParams(queryParams: FlightSearchQuery) {
    return this.search(queryParams.offset, queryParams.destination, queryParams.departureDate);
  }

  search(offset: string, destination: string, departuresAt: Date): Observable<ApiResponse<Flight[]>> {
    return this.http
      .get<ApiResponse<Flight[]>>(this.flightsEndpointURL, {
        params: {
          offset: offset, destination: destination, departureTime: departuresAt.toISOString()
        }
      })
  }

  fetchLatestAvailableFlights(): Observable<ApiResponse<Flight[]>> {
    return this.http.get<ApiResponse<Flight[]>>(this.flightsEndpointURL);
  }

  getFlight(id: number): Observable<ApiResponse<Flight>> {
    return this.http.get<ApiResponse<Flight>>(this.flightsEndpointURL + `/${id}`);
  }

}
