import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FlightsSearchService} from "./flights-search.service";

@Injectable({
  providedIn: 'root'
})
export class FlightsResolver implements Resolve<boolean> {
  constructor(private flightsService: FlightsSearchService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (!route.queryParamMap.get("offset")) {
      return this.flightsService.fetchLatestAvailableFlights();
    }
    return this.flightsService.search(route.queryParamMap.get("offset")!,
      route.queryParamMap.get("destination") !,
      new Date(route.queryParamMap.get("departureDate")!));
  }
}
