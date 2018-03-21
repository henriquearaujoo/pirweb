import { State } from './../../models/states';
import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constant } from '../../constant/constant';
import { Community } from '../../models/community';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommunityService extends RestService {

  private apiurl = Constant.BASE_URL + 'communities/';
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 10;
   }

  public getCommunities(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&sort=name,asc');
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&name=' + filter + '&sort=name,asc');
    }
  }

  public _getCommunities() {
      return this.get(this.apiurl + 'search/');
  }

  public insert(community: Community): Observable<Community> {
    return this.post(this.apiurl, community);
  }

  public update(community: Community): Observable<Community> {
    return this.put(this.apiurl, community);
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }

  public getCities(state_id: string) {
    return this.get(Constant.BASE_URL + 'states/' + state_id);
  }

  public getState() {
    return this.get(Constant.BASE_URL + 'states/search/?name=amazonas');
  }

  public getCity(city_id?: string) {
    return this.get(Constant.BASE_URL + 'states/city/' + city_id + '/');
 }

}
