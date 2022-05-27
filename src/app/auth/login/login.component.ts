import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5)]]
    }
  )

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
  }

  onSubmit() {
    this.authenticationService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    })
  }

}
