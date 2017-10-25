import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RestService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getApiTest() {
    return this.http
    .get('https://jsonplaceholder.typicode.com/posts/1', this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  get(url: string): Observable<any> {
    return this.http
      .get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getWithParam(url: string, parameterName: string, parameterValue: any): Observable<any> {
    const param = new URLSearchParams();
    param.set(parameterName, parameterValue);

    return this.http
      .get(url, this.optionsHeader(param))
      .map(this.extractData)
      .catch(this.handleError);
  }

  post(url: string, param: any): Observable<any> {
    const body = JSON.parse(JSON.stringify(param), function(k, v){
      if (Array.isArray(v)) {
          const fArr = v.filter(e => e);
          return fArr.length && fArr || undefined;
      } else if ( typeof(v) === 'object' && !Object.keys(v).length) {
          return undefined;
      } else {return v; }
    });
    return this.http
      .post(url, body, this.optionsHeader())
      .map(this.extractData)
      .catch(this.handleError);
  }

  put(url: string, param: any): Observable<any> {
    const body = JSON.parse(JSON.stringify(param), function(k, v){
      if (Array.isArray(v)) {
          const fArr = v.filter(e => e);
          return fArr.length && fArr || undefined;
      } else if ( typeof(v) === 'object' && !Object.keys(v).length) {
          return undefined;
      } else {return v; }
    });
    return this.http
      .put(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  patch(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .patch(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(url: string, param: any): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    this.options = new RequestOptions({ headers: this.headers, search: params });
    return this.http
      .delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
    return this.http
      .delete(url + '/' + val, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.log(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.message;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  private optionsHeader(params?: URLSearchParams): RequestOptions {
    if (params !== null) {
      this.options = new RequestOptions({ headers: this.headers, params: params });
    } else {
      this.options = new RequestOptions({ headers: this.headers });
    }
    return this.options;
  }
}
