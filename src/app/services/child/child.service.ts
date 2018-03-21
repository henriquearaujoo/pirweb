import { Observable } from 'rxjs/Observable';
import { Child } from './../../models/child';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class ChildService extends RestService {

  private apiurl = Constant.BASE_URL + 'children/';
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 10;
   }

  public getChildren(filter?: any, page?: number) {
    if ( filter === undefined || filter === '' ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&sort=name,asc');
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&name=' + filter + '&sort=name,asc');
    }
  }

  // public getMothers() {
  //  return this.get(Constant.BASE_URL + 'responsibles/search/');
  // }

  public insert(child: Child): Observable<Child> {
    return this.post(this.apiurl, child);
  }

  public update(child: Child): Observable<Child> {
    return this.put(this.apiurl, child);
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }
}
