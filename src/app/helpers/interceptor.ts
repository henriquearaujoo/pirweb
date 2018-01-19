import { Injectable } from '@angular/core';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class Interceptor extends XHRBackend {

  constructor(browserXhr: BrowserXhr, baseResponseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    // tslint:disable-next-line:prefer-const
    let token = localStorage.getItem('tokenPir');
    request.headers.set('Authorization', `PIRFAS=${token}`);
    // request.headers.set('Content-Type', 'application/json');
    // tslint:disable-next-line:prefer-const
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if (error.status === 401 || error.status === 403) {
        console.log('acesso não autorizado');
        localStorage.removeItem('tokenPir');
        localStorage.removeItem('profileId_rules');
      }
      return Observable.throw(error);
    });
    return xhrConnection;
  }
}