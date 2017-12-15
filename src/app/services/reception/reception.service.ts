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

  public select() {
    return this.get(this.apiurl);
  }

  public load(id: string) {
    return this.get(this.apiurl + id);
  }

  public insert(reception: Reception): Observable<Reception> {
    return this.post(this.apiurl, reception);
  }

  public update(reception: Reception): Observable<Reception> {
    return this.put(this.apiurl, reception);
  }

}
