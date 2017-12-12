import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Reception } from './../../models/reception';
import { RestService } from './../rest/rest.service';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceptionService extends RestService {

  apiurl = Constant.BASE_URL;
  constructor(http: Http) {
    super(http);
  }

  public getReception() {
    const currentUrl = this.apiurl + 'chapters/greetings/';
    return this.get(currentUrl);
  }

  public saveReception(reception: Reception): Observable<Reception> {
    const saveReceptionUrl = this.apiurl + 'chapters/greetings/';
    return this.post(saveReceptionUrl, reception);
  }

}
