import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../rest/rest.service';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService extends RestService{
  apiurl = 'http://localhost:3000/';
  
    constructor(http : Http) {
      super(http);
    }
  
    public getProfiles() {      
      const currentURL = this.apiurl.concat('profile');
      return this.get(currentURL);
    }

    public saveProfile(profiles: Profile): Observable<Profile> {
      const saveProfileUrl = this.apiurl.concat('profile');
      return this.post(saveProfileUrl, profiles);
    }

    public saveEditRule(profiles: Profile): Observable<Profile> {
      const saveProfileUrl = this.apiurl.concat('profile/' + profiles.id);
      return this.put(saveProfileUrl, profiles);
    }
}
