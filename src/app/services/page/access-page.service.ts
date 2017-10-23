import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AccessPageService extends RestService{

  constructor(http: Http) {
    super(http);
 }

  apiurl = 'http://localhost:3000/';

  getPages(){
    const currentURL = this.apiurl.concat('page');
    return this.get(currentURL);
  }

}
