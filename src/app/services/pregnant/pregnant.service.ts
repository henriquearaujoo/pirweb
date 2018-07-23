import { Pregnant } from './../../models/pregnant';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Injectable()
export class PregnantService extends RestService {

  private apiurl = Constant.BASE_URL + 'pregnant/';
  private size: number;

  constructor( http: Http) {
    super(http);
    this.size = 10;
   }

  public getPregnant(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page);
    }
  }


  public insert(mother: Pregnant): Observable<Pregnant> {
    return this.post(this.apiurl, mother);
  }

  public update(pregant: Pregnant): Observable<Pregnant> {
    return this.put(this.apiurl, pregant);
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }
}
