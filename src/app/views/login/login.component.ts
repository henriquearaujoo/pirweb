import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user';

import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-notification/toast.service';
import { Observable } from 'rxjs/Observable';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User();
  loading = false;
  returnUrl: string;

  constructor(
      private authenticationService: AuthenticationService,
      private route: ActivatedRoute,
      private router: Router,
      private toastService: ToastService
     ) { }

  ngOnInit() {
   // reset login
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

    sendData() {
        this.authenticationService.login(this.user.login, this.user.password).subscribe(
            success => {
                console.log('test', success.headers.get('authorization'));
                console.log('authentication:', success);
                // login successful if there's a jwt token in the response
                // if (this.user && this.user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(this.user));
                // }

                // return this.user;

            },
            error => console.log('Error:', error)
        );
    }

    test() {
        const a = sha256('12345678');
        console.log(a);
    }

    applyCssError(form, field) {
        return {
          'has-error': this.verifyValidSubmitted(form, field),
          'has-feedback': this.verifyValidSubmitted(form, field)
        };
      }

    verifyValidSubmitted(form, field) {
    return form.submitted && !field.valid;
    }
}
