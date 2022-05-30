import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../api-response";
import {Flight} from "./flight";
import {FlightSearchQuery} from "../flight-search-form/flight-search-form.component";

@Injectable({
  providedIn: 'root'
})
export class FlightsSearchService {

  constructor(private http: HttpClient) {
  }

  searchWithQueryParams(queryParams: FlightSearchQuery) {
    return this.search(queryParams.offset, queryParams.destination, queryParams.departureDate);
  }

  search(offset: string, destination: string, departuresAt: Date): Observable<ApiResponse<Flight[]>> {
    return this.http
      .get<ApiResponse<Flight[]>>('http://localhost:8080/flights', {
        params: {
          offset: offset, destination: destination, departureTime: departuresAt.toISOString()
        }
      })
  }

  fetchLatestAvailableFlights() {
    return this.http.get<ApiResponse<Flight[]>>("http://localhost:8080/flights");
  }
}
