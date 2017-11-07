import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user';

import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-notification/toast.service';

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

  login() {
    this.loading = true;
    console.log(this.user);
    this.authenticationService.login(this.user.login, this.user.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                this.toastService.toastSuccess();
            },
            error => {
                this.toastService.toastError();
                this.loading = false;
            });
}


}
