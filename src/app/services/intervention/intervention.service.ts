import { Observable } from 'rxjs/Observable';
import { Intervention } from './../../models/intervention';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Constant } from '../../constant/constant';

@Injectable()
export class InterventionService extends RestService {

  private apiurl = Constant.BASE_URL + 'chapters/intervention/';

  constructor(http: Http) {
    super(http);
  }

  public insert(i: Intervention): Observable<Intervention> {
    return this.post(this.apiurl, i);
  }

  public update(i: Intervention): Observable<Intervention> {
    return this.put(this.apiurl , i);
  }

  public load(chapter_id: string) {
    return this.get(this.apiurl + 'search/?chapter_id=' + chapter_id);
  }
}
