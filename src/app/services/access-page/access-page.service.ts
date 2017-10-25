import { RestService } from './../rest/rest.service';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Profile } from '../../models/profile';
import { AccessPage } from '../../models/access-page';
import { Observable } from 'rxjs/Observable';
import { RuleProfile } from '../../models/rule-profile';

@Injectable()
export class AccessPageService extends RestService implements OnInit{
  

  public profile: Profile = new Profile();
  public rule: RuleProfile = new RuleProfile();

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

  public getPagesAllowed(profile: Profile){
    const getPageURL = this.apiurl.concat('profiles/' + profile.id);
    return this.get(getPageURL);
  }

  profileSelected(profile: Profile): void{  
    console.log("perfil retornado so service", profile)
    this.profile = profile;
  }

  setRules(rulesProfile: RuleProfile) {
    this.rule = rulesProfile;
  }

  getProfile(): Profile{
    return this.profile;
  }
  
  getRulesProfile(): RuleProfile {
    return this.rule;
  }

}
