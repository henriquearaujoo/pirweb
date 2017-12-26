import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { Rule } from '../../models/rule';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RuleService extends RestService {
  apiurl = Constant.BASE_URL;

  constructor(http: Http) {
    super(http);
  }

  public getRules() {
    const currentURL = this.apiurl.concat('rules/');
    return this.get(currentURL);
  }

  public saveRule(rules: Rule): Observable<Rule> {
    const saveRuleUrl = this.apiurl.concat('rules/');
    return this.post(saveRuleUrl, rules);
  }

  public editRule(rule: Rule): Observable<Rule> {
    const saveRuleUrl = this.apiurl.concat('rules/');
    return this.put(saveRuleUrl, rule);
  }

  public deleteRule(id: string) {
    const deleteRuleUrl = this.apiurl + 'rules' + '/' + id + '/';
    return this.deleteR(deleteRuleUrl);
  }
}
