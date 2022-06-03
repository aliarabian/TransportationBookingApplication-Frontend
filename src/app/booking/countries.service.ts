import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "./country";
import {ApiResponse} from "../api-response";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
  }

  fetchAllCountries(): Observable<Country[]> {
    return this.http.get<ApiResponse<Country[]>>("/countries")
      .pipe(
        map(response => response.data)
      );
  }
}
