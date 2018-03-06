import { LoaderService } from './../../services/loader/loader.service';
import { AccessPageService } from './../../services/page/page.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user';

import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-notification/toast.service';
import { Observable } from 'rxjs/Observable';
import { sha256, sha224 } from 'js-sha256';
import { Rule } from '../../models/rule';
import { Page } from '../../models/page';
import { decodeToken } from 'jsontokens';
import { Permissions } from '../../helpers/permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 240) + 'px'};
  private user: User = new User();
  loading = false;
  returnUrl: string;
  private rules: Rule[] = new Array();
  private rules2: Rule[] = new Array();
  private pages: Page[] = new Array();
  isActivate: boolean;
  private checked: boolean;

  constructor(
      private authenticationService: AuthenticationService,
      private accessPageService: AccessPageService,
      private route: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
      private permisions: Permissions,
      private loaderService: LoaderService
     ) { }

  ngOnInit() {
      const login = localStorage.getItem('currentLogin');
      const psw = atob(localStorage.getItem('pirfas'));
      if ( login && psw ) {
        this.user.login = login;
        this.user.password = psw;
        this.checked = true;
      }
   // reset login
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.eventReset.subscribe(
        s => {
            this.toastService.toastMsg('Sucesso', 'Senha alterada com sucesso!');
        }
    );
  }

    sendData() {
        this.loaderService.show();
        this.authenticationService.login(this.user.login, this.user.password).subscribe(
            (data: Response) => {
                const token = data.headers.get('authorization');
                localStorage.setItem('tokenPir', token );
                if (token) {
                    const tokenData = decodeToken(token);
                    console.log('Decode Token:', tokenData);
                    localStorage.setItem('profileId_rules', tokenData.payload.pfl);
                    localStorage.setItem('currentUserPir', tokenData.payload.unm);
                    localStorage.setItem('currentIdPir', tokenData.payload.uid);

                    this.loaderService.hide();
                    this.router.navigate([this.returnUrl]);
                }
            },
            error => {
                this.loaderService.hide();
                this.verifyError(error);
                console.log('Error:', error);
            }
        );
    }

    verifyError(error) {
        switch (error) {
            case 'user.password.mismatch': {
                this.toastService.toastMsgWarn('Atenção', 'Autenticação incorreta!');
                break;
            }
            case 'login.username.notfound': {
                this.toastService.toastMsgWarn('Atenção', 'Autenticação incorreta!');
                break;
            }
            case 'user.disabled': {
                this.toastService.toastMsgWarn('Atenção', 'Usuário desativado!');
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
        this.router.navigate(['/send-email']);
    }

    remember(event) {
        if ( event.target.checked ) {
            if ( (this.user.login !== undefined) && (this.user.password !== undefined) ) {
                localStorage.setItem('currentLogin', this.user.login);
                localStorage.setItem('pirfas', btoa(this.user.password));
            }
        } else {
            localStorage.removeItem('currentLogin');
            localStorage.removeItem('pirfas');
        }
    }

    ngOnDestroy(): void {
        // throw new Error('Method not implemented.');
    }
}
