import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../views/login/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

  private authenticatedUser: boolean = false

  showMenuEmitter = new EventEmitter<boolean>()

  constructor( private router: Router) { }

  login( user: User) {
    if (user.name === 'admin' &&
      user.password === 'adm') {

        this.authenticatedUser = true
        this.showMenuEmitter.emit(true)
        this.router.navigate(['/'])
        
      } else {
        this.router.navigate(['/login'])
        this.authenticatedUser = false
        this.showMenuEmitter.emit(false)
      }
  }

  userAuthenticated(){
    return this.authenticatedUser
  }
}
