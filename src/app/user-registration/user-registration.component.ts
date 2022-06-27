import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegistrationDto} from "./registration-dto";
import {ApiResponse} from "../api-response";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  UserRegistrationResultModalComponent
} from "../user-registration-result-modal/user-registration-result-modal.component";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup = this.fb.group({
    username: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(5), Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    nationalId: ['', [Validators.pattern("[0-9]{11}"), Validators.required]]
  });
  errorText?: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router,
              private dialog: MatDialog) {
    if (this.authService.isLoggedIn()) {
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
    this.http.post<ApiResponse<any>>("/users", userData)
      .pipe(catchError(err => throwError(err)))
      .subscribe((response: ApiResponse<any>) => {
        const registrationResultOpenModal = this.dialog.open(UserRegistrationResultModalComponent);
        setTimeout(() => {
          registrationResultOpenModal.close();
          this.router.navigate(['login'])
        }, 1000);
      }, (error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
        }
        if (error.status === 409) {
          this.errorText = "You already have an account";
        }
      });
  }

  hasError(formGroup: FormGroup, formControlName: string, errorTitle: string): boolean {
    return formGroup.controls[formControlName].hasError(errorTitle) &&
      this.isTouched(formGroup, formControlName);
  }

  isInvalid(formGroup: FormGroup, formControlName: string): boolean {
    return formGroup.controls[formControlName].invalid && this.isTouched(formGroup, formControlName);
  }

  private isTouched(formGroup: FormGroup, formControlName: string): boolean {
    return formGroup.controls[formControlName].touched;
  }

}
