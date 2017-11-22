import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../rest/rest.service';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs/Observable';
import { RuleProfile } from '../../models/rule-profile';
import { Rule } from '../../models/rule';

@Injectable()
export class ProfileService extends RestService {

  apiurl = Constant.BASE_URL;
  constructor(http: Http) {
    super(http);
  }

  public getProfiles() {
    const currentURL = this.apiurl.concat('profiles/');
    console.log(currentURL);
    return this.get(currentURL);
  }

  public getPages(profileid: string) {
    const currentURL = this.apiurl + 'profiles/' + profileid + '/pages';
    console.log(currentURL);
    return this.get(currentURL);
  }

  public getProfileWithParam(profiles: string) {
    const getProfileURL = this.apiurl.concat('profiles/' + profiles);
    return this.get(getProfileURL);
  }

  public saveProfile(profiles: Profile): Observable<Profile> {
    const saveProfileUrl = this.apiurl.concat('profiles/');
    return this.post(saveProfileUrl, profiles);
  }

  public saveEditProfile(profile: Profile): Observable<Profile> {
    const saveProfileUrl = this.apiurl.concat('profiles/');
    return this.put(saveProfileUrl, profile);
  }

  public deleteProfile(profile: string): Observable<Profile> {
    const deleteProfileURL = this.apiurl.concat('profiles');
    return this.deleteServiceWithId(deleteProfileURL, 'id', profile);
  }

  public disableProfile(profile: Profile): Observable<Profile> {
    const saveProfileUrl = this.apiurl.concat('profiles/');
    return this.put(saveProfileUrl, profile);
  }
}
