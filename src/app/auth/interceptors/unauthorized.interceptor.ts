import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.log(error.staus);
          this.authService.clearToken();
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
