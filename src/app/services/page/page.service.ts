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
  public pages: Page[] = new Array();

  constructor(http: Http) {
    super(http);
 }

  apiurl = 'http://10.10.1.150:2020/pir/';

  ngOnInit() { }

  getAllPages() {
    const getPageURL = this.apiurl.concat('pages');
    return this.get(getPageURL);
  }

  getPagesDenied(rule: Rule) {
    const getPageURL = this.apiurl.concat('pages/' + rule.page_id);
    return this.get(getPageURL);
  }

  public getPagesAllowed(rule: Rule) {
    const getPageURL = this.apiurl.concat('pages/' + rule.page_id);
    return this.get(getPageURL);
  }

  profileSelected(profile: Profile): void{
    console.log('perfil retornado so service: ', profile);
    this.profile = profile;
  }

  setRules(rules: Rule) {
    this.rule = rules;
  }

  setPages (pages: Page[]) {
    this.pages = pages;
  }

  getProfile(): Profile {
    return this.profile;
  }

  getRulesProfile(): Rule {
    return this.rule;
  }

  getPages(): Page[] {
    return this.pages;
  }

}
