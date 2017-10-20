import { UserService } from './user.service';
import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

  private isAuthenticated: boolean = false
  private users:User[];
  //private userService: UserServices

  constructor( private router: Router, private http: Http, private userService: UserService) { 
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var user2 = new User();    
    user2.username = "admin";
    user2.password = "adm";
    this.users = [user2];
    
  }

  
  login( user: User) {  
  
    var authenticatedUser = this.users.find(u => u.username === user.username)
    if (authenticatedUser && authenticatedUser.password === user.password) {      
        
      this.isAuthenticated = true                 
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, password: user.password}));
       
      this.router.navigate(['/'])
      console.log(localStorage.getItem('currentUser'))
        
      } else {
        this.isAuthenticated = false
      }
      
  }

  userAuthenticated(){
    return this.isAuthenticated
  }

  logout(): void{
    localStorage.removeItem('currentUser')
  }
}
