import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  registered: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5)]]
    }
  );

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
    this.route.paramMap.pipe(
      tap(params => {
        this.registered = Boolean(params.get('registrationSuccess')!);
      })
    ).subscribe();
  }

  onSubmit() {
    this.authenticationService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
  }

}
