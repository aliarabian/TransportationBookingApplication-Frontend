import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registered: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]
      ]
    }
  );
  errorMessage: string = "Wrong Username or Password"
  error: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()
    ) {
      this.router.navigate(['/home'])
    }
    this.route.paramMap.pipe(
      tap(params => {
        this.registered = Boolean(params.get('registrationSuccess')!);
      })
    ).subscribe();

    this.authenticationService.authError.subscribe(error => {
      this.error = error.status == 401 || error.status == 400;
      if (error.status == 401) {
        this.loginForm.reset();
      }
    });

  }

  get username() {
    return this.loginForm.controls.username as FormControl;
  }

  onSubmit() {
    this.authenticationService.authError.next(new HttpErrorResponse({}));
    this.authenticationService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
  }

}
