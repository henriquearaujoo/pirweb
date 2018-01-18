import { RestService } from './../rest/rest.service';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { sha256, sha224 } from 'js-sha256';

@Injectable()
export class AuthenticationService extends RestService  {

  apiurl = Constant.BASE_URL;

  constructor(
    http: Http,
    private router: Router,
    private userService: UserService) {
      super(http);
    }

  login(username: string, password: string) {
    return this.post(this.apiurl + 'authentication/login', { username: username, password: sha256(password) });
  }

  getUser(login: string) {
    return this.get(this.apiurl + 'users/search/?login=' + login);
  }

  getPermissions(id: string) {
    return this.get(this.apiurl + 'rules/search/?profile_id=' + id);
  }

  logout(): void {
    localStorage.removeItem('tokenPir');
  }
}
