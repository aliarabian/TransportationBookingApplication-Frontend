import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Terminal} from "./terminal";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../api-response";

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {
  // terminals: Terminal[] = [{
  //   city: {country: {code: "", id: 1231, name: 'Iran'}, name: "Tehran", id: 123123},
  //   name: "Mehrabaad", id: 412342
  // }]

  constructor(private http: HttpClient) {
  }

  fetchTerminals(): Observable<ApiResponse<Terminal[]>> {
    return this.http.get<ApiResponse<Terminal[]>>("http://localhost:8080/terminals");
  }
}
