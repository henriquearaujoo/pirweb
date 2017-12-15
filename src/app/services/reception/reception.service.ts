import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Reception } from './../../models/reception';
import { RestService } from './../rest/rest.service';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceptionService extends RestService {

  apiurl = Constant.BASE_URL + 'chapters/greeting/';
  constructor(http: Http) {
    super(http);
  }

  public getReception() {
    return this.get(this.apiurl);
  }

  public saveReception(reception: Reception): Observable<Reception> {
    return this.post(this.apiurl, reception);
  }

}
