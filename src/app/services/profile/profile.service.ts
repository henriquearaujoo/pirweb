import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../rest/rest.service';
import { Profile } from '../../models/Profile';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService extends RestService{
  apiurl = 'http://localhost:3000/profile';
  
    constructor(http : Http) {
      super(http);
    }
  
    public getProfiles() {
      return this.get(this.apiurl);
    }

    public updateProfile(profiles: Profile): Observable<Profile> {
      const saveProfileUrl = this.apiurl.concat('');
      return this.post(saveProfileUrl, profiles);
    }
}
