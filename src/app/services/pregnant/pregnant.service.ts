import { Observable } from 'rxjs/Observable';
import { Pregnant } from './../../models/pregnant';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Injectable()
export class PregnantService extends RestService {

  private apiurl = Constant.BASE_URL + 'pregnant';

  constructor( http: Http) {
    super(http);
   }

  public getPregnant() {
    return this.get(this.apiurl);
  }

  public update(pregnant: Pregnant): Observable<Pregnant> {
    return this.put(this.apiurl, pregnant);
  }

  public load(id: string) {
     return this.get(this.apiurl + 'search/?pregnant_id=' + id);
    // return this.get(this.apiurl + '?id=' + id);
  }
}
