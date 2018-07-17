import { Unity } from './../../models/unity';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Regional } from '../../models/regional';

@Injectable()
export class RegionalService extends RestService {

  private apiurl = Constant.BASE_URL + 'regional/';
  private apiurl_unity = Constant.BASE_URL + 'unity/';
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 10;
   }

  public getAll(filter?: any, page?: number) {
      return this.get(this.apiurl);
  }

  public getRegionais(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&sort=name,asc');
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&name=' + filter + '&sort=name,asc');
    }
  }

  public loadUnity(id: string) {
      return this.get(this.apiurl_unity + id);
  }

  public insert(regional: Regional): Observable<Regional> {
    return this.post(this.apiurl, regional);
  }

  public update(regional: Regional): Observable<Regional> {
    return this.put(this.apiurl, regional);
  }
  // public update(regional: Regional): Observable<Regional> {
  //   return this.put(this.apiurl + regional.id, regional);
  // }

  public load(id: string) {
    return this.get(this.apiurl + id);
  }

  public getCities(state_id: string) {
    return this.get(Constant.BASE_URL + 'states/' + state_id);
  }

  // public getCities() {
  //   return this.get(Constant.BASE_URL + 'cities/');
  // }

  public getState() {
    return this.get(Constant.BASE_URL + 'states/search/?name=amazonas');
  }

  public getCity(city_id?: string) {
    return this.get(Constant.BASE_URL + 'states/city/' + city_id + '/');
 }

 /* UC */
 public insertUC(uc: Unity): Observable<Unity> {
  return this.post(this.apiurl_unity, uc);
}
public updateUC(uc: Unity): Observable<Unity> {
  return this.put(this.apiurl_unity, uc);
}

}
