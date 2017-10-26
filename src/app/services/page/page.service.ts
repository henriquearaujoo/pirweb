import { RestService } from './../rest/rest.service';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Profile } from '../../models/profile';
import { Page } from '../../models/page';
import { Observable } from 'rxjs/Observable';
import { RuleProfile } from '../../models/rule-profile';
import { Rule } from '../../models/rule';

@Injectable()
export class AccessPageService extends RestService implements OnInit{

  public profile: Profile = new Profile();
  public rule: Rule = new Rule();

  constructor(http: Http) {
    super(http);
 }

  apiurl = 'http://localhost:3000/';

  ngOnInit() { }

  getPagesDenied() {
    const currentURL = this.apiurl.concat('pagesdenied');
    return this.get(currentURL);
  }

  public getPagesAllowed(profile: Profile) {
    const getPageURL = this.apiurl.concat('profiles/' + profile.id);
    return this.get(getPageURL);
  }

  profileSelected(profile: Profile): void{
    console.log('perfil retornado so service: ', profile);
    this.profile = profile;
  }

  setRules(rules: Rule) {
    this.rule = rules;
  }

  getProfile(): Profile{
    return this.profile;
  }

  getRulesProfile(): Rule {
    return this.rule;
  }

}
