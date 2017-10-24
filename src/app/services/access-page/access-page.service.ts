import { RestService } from './../rest/rest.service';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Profile } from '../../models/profile';

@Injectable()
export class AccessPageService extends RestService implements OnInit{
  

  public profile: Profile = new Profile();

  constructor(http: Http) {
    super(http);
 }

  apiurl = 'http://localhost:3000/';

  ngOnInit(){
    //this.profile = []
  }
  getPages(){
    const currentURL = this.apiurl.concat('pages');
    return this.get(currentURL);
  }

  profileSelected(profile: Profile): void{
    // let profileSelected: Profile = profile;
    // this.profile = [];
    // this.profile.push(profileSelected);
    console.log("perfil retornado so service", profile)
    this.profile = profile;
  }

  getProfile(): Profile{
    return this.profile;
  }
  

}
