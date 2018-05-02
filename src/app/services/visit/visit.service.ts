import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VisitService extends RestService {

  private apiurl = Constant.BASE_URL + 'visit/';
  private size: number;
  constructor(http: Http) {
    super(http);
    this.size = 10;
   }


   public getVisits (idAgent: string, type_filter?: any, filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page +
      'agent_id=' + idAgent );
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page +
      'agent_id=' + idAgent + '&' + type_filter + '=' + filter);
    }
  }

  //  public getAnswers (filter?: any, page?: number) {
  //   if ( filter === undefined ) {
  //     return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page );
  //   } else {
  //     return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page );
  //   }
  // }



}
