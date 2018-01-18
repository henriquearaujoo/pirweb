import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user';

import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-notification/toast.service';
import { Observable } from 'rxjs/Observable';
import { sha256, sha224 } from 'js-sha256';
import { Rule } from '../../models/rule';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 240) + 'px'};
  private user: User = new User();
  private rules: Rule[] = new Array();
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
            (data: Response) => {
                console.log(data.headers.get('authorization'));
                const token = data.headers.get('authorization');
                localStorage.setItem('tokenPir', token );
                if (token) {
                    this.getRules();
                }
            },
            error => {
                this.verifyError(error);
                console.log('Error:', error);
            }
        );
    }

    getRules() {
        this.authenticationService.getUser(this.user.login).subscribe(
            success_user => {
                this.user = success_user[0];
                this.authenticationService.getPermissions(this.user.id).subscribe(
                    success_rules => {
                        this.rules = success_rules;
                        console.log('RULES:', this.rules);
                        this.router.navigate([this.returnUrl]);
                    }
                );
            },
            error => {
                this.toastService.toastMsg('Erro', 'Não foi possível carregar as regras de acesso!');
                console.log(error);
            }
        );
    }

    verifyError(error) {
        switch (error) {
            case 'user.password.mismatch': {
                this.toastService.toastMsgWarn('Atenção', 'Senha inválida!');
                break;
            }
            case 'login.username.notfound': {
                this.toastService.toastMsgWarn('Atenção', 'Usuário inválido!');
                break;
            }
        }
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

    resetPassword() {
        this.router.navigate(['/reset-password']);
    }

    ngOnDestroy(): void {
        // throw new Error('Method not implemented.');
    }
}
