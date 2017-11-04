import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthenticationService {

  private isAuthenticated: boolean = false;
  private users: User[];

  constructor( private router: Router, private http: Http, private userService: UserService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const user = new User();
    user.username =  'admin';
    user.password = 'adm';
    this.users = [user];

  }

  login( user: User) {

    let userAuthenticated = this.users.find(u => u.username === user.username);
    if (userAuthenticated && userAuthenticated.password === user.password) {
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, password: user.password}));

     // location.reload();
      this.router.navigate(['']);
      console.log(localStorage.getItem('currentUser'));
      } else {
        this.isAuthenticated = false;
      }
  }

  userAuthenticated() {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
