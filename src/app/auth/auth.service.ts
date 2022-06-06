import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginRequest} from "./login-request";
import {LoginResponse} from "./login-response";
import {ApiResponse} from "../api-response";
import {Router} from "@angular/router";
import {catchError, retry, tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStatus: boolean = false
  authError: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject<HttpErrorResponse>(new HttpErrorResponse({}));

  constructor(private http: HttpClient,
              private router: Router) {
    this.loginStatus = localStorage.getItem("loggedIn") != null;
  }

  login(loginRequest: LoginRequest) {
    this.http.post<ApiResponse<LoginResponse>>("/auth/login", loginRequest)
      .pipe(
        tap(response => console.log(response)),
        retry(1),
        catchError((error: any) => {
          let httpError = (error as HttpErrorResponse);
          console.log(httpError)
          this.authError.next(httpError);
          return httpError.error;
        })
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
