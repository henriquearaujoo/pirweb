import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../rest/rest.service';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs/Observable';
import { RuleProfile } from '../../models/rule-profile';

@Injectable()
export class ProfileService extends RestService{
  apiurl = 'http://localhost:3000/';
  
    constructor(http : Http) {
      super(http);
    }
  
    public getProfiles() {      
      const currentURL = this.apiurl.concat('profiles');
      return this.get(currentURL);
    }

    public saveProfile(profiles: Profile): Observable<Profile> {
      const saveProfileUrl = this.apiurl.concat('profiles');
      return this.post(saveProfileUrl, profiles);
    }

    public saveEditRule(profiles: RuleProfile): Observable<Profile> {
      const saveProfileUrl = this.apiurl.concat('profile');
      return this.post(saveProfileUrl, profiles);
    }
}
