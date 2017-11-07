import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { User } from '../../models/user';

@Injectable()
export class UserService extends RestService {

  apiurl = Constant.BASE_URL;

  constructor(http: Http) {
    super(http);
  }

  public getUsers() {
    const currentURL = this.apiurl.concat('users');
    console.log(currentURL);
    return this.get(currentURL);
  }

}
