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
  private users: User[];

  constructor(
    http: Http,
    private router: Router,
    private userService: UserService) {
      super(http);
    }

  // login1(username: string, password: string) {
  //   const loginUrl = this.apiurl.concat('authenticate');
  //   // tslint:disable-next-line:comment-format
  //   //return this.http.post(loginUrl, JSON.stringify({ username: username, password: password }))
  //   return this.http.get(loginUrl)
  //       .map((response: Response) => {
  //           const user = response.json();
  //           if (user) {
  //               localStorage.setItem('currentUser', JSON.stringify(user));
  //           }

  //           return user;
  //       });
  // }
// senha hash 256
  login(username: string, password: string): Observable<any> {
    return this.post(this.apiurl + 'authentication/login', { username: username, password: sha256(password) })
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
