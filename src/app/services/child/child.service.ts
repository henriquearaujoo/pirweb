import { Observable } from 'rxjs/Observable';
import { Child } from './../../models/child';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class ChildService extends RestService {

  private apiurl = Constant.BASE_URL + 'child';

  constructor( http: Http) {
    super(http);
   }

  public getChildren() {
    return this.get(this.apiurl);
  }

  public update(child: Child): Observable<Child> {
    return this.put(this.apiurl, child);
  }

  public load(id: string) {
     return this.get(this.apiurl + 'search/?child_id=' + id);
    // return this.get(this.apiurl + '?id=' + id);
  }
}
