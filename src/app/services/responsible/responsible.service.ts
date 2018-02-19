import { ResponsibleChild } from './../../models/responsible-child';
import { Observable } from 'rxjs/Observable';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponsibleService extends RestService {

  private apiurl = Constant.BASE_URL + 'responsible';

  constructor( http: Http) {
    super(http);
   }

  public getResponsible() {
    return this.get(this.apiurl);
  }

  public update(responsible: ResponsibleChild): Observable<ResponsibleChild> {
    return this.put(this.apiurl, responsible);
  }

  public load(id: string) {
     return this.get(this.apiurl + 'search/?responsible_id=' + id);
    // return this.get(this.apiurl + '?id=' + id);
  }
}
