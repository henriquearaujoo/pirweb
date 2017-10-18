import { UserService } from './user.service';
import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

  private isAuthenticated: boolean = false
  private users = [new User(1, 'admin','adm'), new User(2, 'user1','123')]
  private users2: User
  //private userService: UserServices

  constructor( private router: Router, private http: Http, private userService: UserService) { }

  
  login( user: User) {  

   /* this.userService.getUsers()
    .subscribe((data: User) => this.users2 = data,
    error => console.log(error));

    console.log(this.users2.password)*/
  
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
