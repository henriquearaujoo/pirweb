import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      // tslint:disable-next-line:prefer-const
      let currentUser = localStorage.getItem('tokenPir');
      if (currentUser) {
          request = request.clone({
              setHeaders: {
                  Authorization: `PIRFAS= ${currentUser}`
              }
          });
      }

      return next.handle(request);
  }
}
