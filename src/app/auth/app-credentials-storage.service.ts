import {Injectable} from '@angular/core';
import {LoginResponse} from "./login-response";

@Injectable({
  providedIn: 'root'
})
export class AppCredentialsStorageService {

  constructor() {
  }

  store(credentials: LoginResponse) {
    localStorage.setItem("authToken", JSON.stringify(credentials.token));
    localStorage.setItem("id", JSON.stringify(credentials.id));
    localStorage.setItem("username", JSON.stringify(credentials.username));
  }

  getToken(): string | null {
    let token = localStorage.getItem("authToken");
    return token ? JSON.parse(token) : null;
  }
}
