import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RegistrationDto} from "./registration-dto";
import {ApiResponse} from "../api-response";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup = this.fb.group({
    username: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(5), Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    nationalId: ['', [Validators.minLength(11)]]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) {
      this.router.navigate(['home'])
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let
      userData: RegistrationDto = {
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        nationalId: this.registrationForm.value.nationalId
      }
    this.http.post<ApiResponse<any>>("http://localhost:8080/users", userData)
      .subscribe((response: ApiResponse<any>) => {
        console.log(response)
        this.router.navigate(['login', {registrationSuccess: true}])
      });
  }
}
