import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {UnauthorizedInterceptor} from "./interceptors/unauthorized.interceptor";

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true}
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule {
}
