import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientXsrfModule} from "@angular/common/http";
import {UnauthorizedInterceptor} from "./interceptors/unauthorized.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {HttpXsrfInterceptor} from "./interceptors/http-xsrf.interceptor";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true}

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientXsrfModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class AuthModule {
}
