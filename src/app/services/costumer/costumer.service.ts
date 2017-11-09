import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../rest/rest.service';

@Injectable()
export class CostumerService extends RestService {
  apiurl = Constant.BASE_URL;

  constructor(http: Http) {
    super(http);
  }

  public getCostumers() {
    return this.get('http://localhost:18181/costumers');
  }
}
