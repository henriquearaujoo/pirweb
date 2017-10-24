import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';

@Injectable()
export class RuleService extends RestService {
  apiurl = 'http://localhost:3000/';

  constructor(http: Http) { 
    super(http)
  }

  public getRules() {      
    const currentURL = this.apiurl.concat('rules');
    return this.get(currentURL);
  }


}
