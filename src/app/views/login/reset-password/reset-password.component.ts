import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { User } from '../../../models/user';

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
  private user: any = [
      {
        password: '',
        confirmPassword: ''
      }
  ];

  constructor(
      private toastService: ToastService
     ) { }

  ngOnInit() {
    //   this.password = '';
    //   this.confirmPassword = '';
  }

    sendData() {
    }

    save(model: User, isValid: boolean) {
        // call API to save customer
        console.log(model, isValid);
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
