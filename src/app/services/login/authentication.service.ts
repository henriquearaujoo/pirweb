import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Constant } from '../../constant/constant';


@Injectable()
export class AuthenticationService {

  apiurl = Constant.BASE_URL;
  private users: User[];

  constructor( private router: Router, private http: Http, private userService: UserService) {

  }

  login(username: string, password: string) {
    const loginUrl = this.apiurl.concat('authenticate');
    // tslint:disable-next-line:comment-format
    //return this.http.post(loginUrl, JSON.stringify({ username: username, password: password }))
    return this.http.get(loginUrl)
        .map((response: Response) => {
            const user = response.json();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
}

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
