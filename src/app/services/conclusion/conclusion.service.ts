import { Conclusion } from './../../models/conclusion';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/constant';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConclusionService extends RestService {

  private apiurl = Constant.BASE_URL + 'chapters/conclusion/';
  constructor(http: Http) {
    super(http);
   }

  public getConclusion() {
    return this.get(this.apiurl);
  }

  public insert(c: Conclusion): Observable<Conclusion> {
    return this.post(this.apiurl, c);
  }

  public update(c: Conclusion): Observable<Conclusion> {
    return this.put(this.apiurl, c);
  }

  public load(chapter_id: string) {
    return this.get(this.apiurl + '/search/?chapter_id=' + chapter_id);
  }
}

