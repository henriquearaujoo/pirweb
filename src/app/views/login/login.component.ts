import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User()

  constructor( private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.user)
    this.authenticationService.login(this.user)
  }

}
