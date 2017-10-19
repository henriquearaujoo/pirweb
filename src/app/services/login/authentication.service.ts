import { UserService } from './user.service';
import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

  private isAuthenticated: boolean = false
  private users = [new User('admin','adm'), new User('user1','123')]
  //private users2: User
  //private userService: UserServices

  constructor( private router: Router, private http: Http, private userService: UserService) { }

  
  login( user: User) {  
  
    var authenticatedUser = this.users.find(u => u.username === user.username)
    if (authenticatedUser && authenticatedUser.password === user.password) {       
        this.isAuthenticated = true          
      
        this.router.navigate(['/'])
        
      } else {      
        this.isAuthenticated = false
      }
      
  }

  userAuthenticated(){
    return this.isAuthenticated
  }
}
