import { Responsible } from './../../models/responsible';
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
      return this.get(this.apiurl + 'responsibles/search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get(this.apiurl + 'responsibles/search/page/?size=' + this.size + '&page=' + page + '&name=' + filter);
    }
  }

  public getMothers(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(Constant.BASE_URL + 'mother/search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get( Constant.BASE_URL + 'mother/search/page/?size=' + this.size + '&page=' + page + '&mother.name=' + filter);
    }
  }

  public _getMothers() {
    return this.get(Constant.BASE_URL + 'mother/');
  }

  public _getResponsible(filter?: any) {
      return this.get(this.apiurl);
  }

  public insert(responsible: Responsible): Observable<Responsible> {
    return this.post(this.apiurl, responsible);
  }

  public update(responsible: Responsible): Observable<Responsible> {
    return this.put(this.apiurl, responsible);
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }
}
