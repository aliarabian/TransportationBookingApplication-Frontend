import {Injectable} from '@angular/core';
import {LoginResponse} from "./login-response";

@Injectable({
  providedIn: 'root'
})
export class AppCredentialsStorageService {

  constructor() {
  }

  store(credentials: LoginResponse) {
    localStorage.setItem("authDetails", JSON.stringify(credentials));
  }

  getToken(): string | null {
    let authDetails = localStorage.getItem("authDetails");
    return authDetails ? JSON.parse(authDetails).token : null;
  }

  clear() {
    localStorage.removeItem("authDetails");
  }
}
