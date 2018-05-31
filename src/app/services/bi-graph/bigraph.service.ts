import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { RestService } from './../rest/rest.service';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class BigraphService  extends RestService {

  private apiurl = Constant.BASE_URL;

  constructor(http: Http) {
    super(http);
   }

   public getGraph() {
     return  this.http.get(this.apiurl + 'graph/');
   }

   public generateReport(item) {
    return this.post(this.apiurl + 'query/', item);
   }
}
