import { AuthenticationService } from './../../../services/login/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../components/modal/modal.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 240) + 'px'};
  // private user: User = new User();
//   private password: string;
//   private confirmPassword: string;
  loading = false;
  returnUrl: string;
  isActivate: boolean;
  private reset: string;
  private user: any = [
      {
        password: '',
        confirmPassword: ''
      }
  ];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private toastService: ToastService,
      private authenticationService: AuthenticationService,
      private modalService: ModalService
     ) { }

  ngOnInit() {
    //   this.password = '';
    //   this.confirmPassword = '';

    this.reset = this.route.snapshot.queryParams['reset'];
    console.log('reset:', this.reset);
  }

  save(model: User, isValid: boolean) {
      // call API to save customer
      console.log(model, isValid);
      this.authenticationService.reset(this.reset, this.user.password).subscribe(
        success => {
          console.log(success);
          // this.toastService.toastMsg('Sucesso', 'Senha alterada com sucesso!');
          this.modalService.modalPassword('/login');
          // this.authenticationService._reset();
          //  this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          if (error === 'invalid.token') {
            this.toastService.toastMsgError('Erro', 'Link expirado!');
          }
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
}
