import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./login-request";
import {LoginResponse} from "./login-response";
import {ApiResponse} from "../api-response";
import {retry, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logginStatus: boolean = false

  constructor(private http: HttpClient,
              private router: Router) {
    this.logginStatus = localStorage.getItem("loggedIn") != null;
  }

  login(loginRequest: LoginRequest) {
    this.http.post<ApiResponse<LoginResponse>>("/auth/login", loginRequest)
      .pipe(
        tap(response => console.log(response)),
        retry(1)
      )
      .subscribe(response => {
        localStorage.setItem("loggedIn", "true");
        this.logginStatus = true;
        this.router.navigate(["home"]);
      });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("loggedIn") != null;
  }


  clear() {
    localStorage.clear();
    this.logginStatus = false;
  }

  logout() {
    this.clear();
    this.router.navigate(["login"]);
    this.logginStatus = false;
  }
}
