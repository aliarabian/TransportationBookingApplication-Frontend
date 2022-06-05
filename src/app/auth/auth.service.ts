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
  loginStatus: boolean = false

  constructor(private http: HttpClient,
              private router: Router) {
    this.loginStatus = localStorage.getItem("loggedIn") != null;
  }

  login(loginRequest: LoginRequest) {
    this.http.post<ApiResponse<LoginResponse>>("/auth/login", loginRequest)
      .pipe(
        tap(response => console.log(response)),
        retry(1)
      )
      .subscribe(response => {
        localStorage.setItem("loggedIn", "true");
        this.loginStatus = true;
        this.router.navigate(["home"]);
      });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("loggedIn") != null;
  }


  clear() {
    localStorage.clear();
    this.loginStatus = false;
  }

  logout() {
    this.clear();
    this.router.navigate(["login"]);
    this.loginStatus = false;
  }
}
