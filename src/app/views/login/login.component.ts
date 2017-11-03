import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user';

import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User();

  constructor(private authenticationService: AuthenticationService,
      private restService: RestService) { }

  ngOnInit() {
   // reset login
    this.authenticationService.logout();
    console.log(localStorage.getItem('currentUser'));
  }

  login() {
    this.authenticationService.login(this.user);
  }


}
