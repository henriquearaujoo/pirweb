import { ResponsibleChild } from './../../models/responsible-child';
import { Observable } from 'rxjs/Observable';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponsibleService extends RestService {

  private apiurl = Constant.BASE_URL + 'responsible/';
  private size: number;

  constructor( http: Http) {
    super(http);
    this.size = 10;
   }

  public getResponsible(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page);
    }
  }

  public insert(responsible: ResponsibleChild): Observable<ResponsibleChild> {
    return this.post(this.apiurl, responsible);
  }

  public update(responsible: ResponsibleChild): Observable<ResponsibleChild> {
    return this.put(this.apiurl, responsible);
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }
}
