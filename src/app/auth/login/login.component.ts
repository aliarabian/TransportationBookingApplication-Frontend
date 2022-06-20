import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]
      ]
    }
  );
  errorMessage: string = "Wrong Username or Password"
  error: boolean = false;
  private subscription?: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.authenticationService.authError.next(new HttpErrorResponse({}))
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()
    ) {
      this.router.navigate(['/home'])
    }
    this.route.paramMap.subscribe();

    this.subscription = this.authenticationService.authError.subscribe(error => {
      this.error = error.status == 401 || error.status == 400;
      if (this.error)
        this.loginForm.reset();
    });

  }

  get username() {
    return this.loginForm.controls.username as FormControl;
  }

  get password() {
    return this.loginForm.controls.password as FormControl;
  }

  onSubmit() {
    this.authenticationService.authError.next(new HttpErrorResponse({}));
    this.authenticationService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
  }

  hasError(formControlName: string, errorTitle: string): boolean {
    return this.loginForm.controls[formControlName].hasError(errorTitle) &&
      (this.loginForm.controls[formControlName].dirty ||
        this.loginForm.controls[formControlName].touched);
  }

  isInvalid(formControlName: string): boolean {
    return this.loginForm.controls[formControlName].invalid &&
      (this.loginForm.controls[formControlName].dirty ||
        this.loginForm.controls[formControlName].touched);
  }
}
