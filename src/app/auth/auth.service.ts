import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./login-request";
import {LoginResponse} from "./login-response";
import {ApiResponse} from "../api-response";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(loginRequest: LoginRequest) {
    this.http.post<ApiResponse<LoginResponse>>("http://localhost:8080/auth/login", loginRequest)
      .pipe(
        tap(response => console.log(response))
      )
      .subscribe(response => {
        this.router.navigate(["home"]);
      });
  }

  isLoggedIn(): boolean {
    return true;
  }

}
