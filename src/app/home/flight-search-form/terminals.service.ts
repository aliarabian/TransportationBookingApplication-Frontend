import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Terminal} from "./terminal";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../../api-response";

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {

  constructor(private http: HttpClient) {
  }

  fetchTerminals(): Observable<ApiResponse<Terminal[]>> {
    return this.http.get<ApiResponse<Terminal[]>>("/terminals");
  }
}
