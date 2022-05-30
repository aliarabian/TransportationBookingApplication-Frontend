import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
    let token = this.tokenExtractor.getToken() as string;
    console.log(token)
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({headers: req.headers.set(headerName, token)});
    }
    return next.handle(req);
  }
}
