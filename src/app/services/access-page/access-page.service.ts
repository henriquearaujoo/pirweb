import { RestService } from './../rest/rest.service';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Profile } from '../../models/profile';

@Injectable()
export class AccessPageService extends RestService implements OnInit{
  

  public profile: Profile[] = [];

  constructor(http: Http) {
    super(http);
 }

  apiurl = 'http://localhost:3000/';

  ngOnInit(){
    this.profile = []
  }
  getPages(){
    const currentURL = this.apiurl.concat('pages');
    return this.get(currentURL);
  }

  profileSelected(profile: Profile){
    let profileSelected: Profile = profile;
    this.profile = [];
    this.profile.push(profileSelected);
  }

  showProfile(): Profile[]{
    return this.profile;
  }
  

}
