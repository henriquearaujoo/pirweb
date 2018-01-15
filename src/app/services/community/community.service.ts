import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constant } from '../../constant/constant';
import { Community } from '../../models/community';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommunityService extends RestService {

  private apiurl = Constant.BASE_URL + 'community';
  constructor(http: Http) {
    super(http);
   }

  public getCommunity() {
    return this.get(this.apiurl);
  }

  public insert(community: Community): Observable<Community> {
    return this.post(this.apiurl, community);
  }

  public update(community: Community): Observable<Community> {
    return this.put(this.apiurl, community);
  }

}
