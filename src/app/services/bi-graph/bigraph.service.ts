import { Http } from '@angular/http';
import { RestService } from './../rest/rest.service';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class BigraphService  extends RestService {

  private apiurl = Constant.BASE_URL + 'graph/';
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 10;
   }

   public getGraph() {
     return  this.http.get(this.apiurl);
   }

}
