import { AuthenticationService } from './../../../services/login/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['../login.component.css']
})
export class SendEmailComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private user: any = { email: ''};
  constructor(
    private toastService: ToastService,
    private authenticationService: AuthenticationService) {
   }

  ngOnInit() {
  }

  sendEmail() {
    console.log(this.user.email);
    this.authenticationService.recover(this.user.email).subscribe(
      success => {
        // console.log(success.text());
        this.toastService.toastMsg('Sucesso', 'Um link para redefinição de senha foi enviado' +
         ' para o e-mail informado!. Verifique sua caixa de e-mail.');
      },
      error => {
        console.log(error);
        if ( error === 'login.email.notfound' ) {
          this.toastService.toastMsgError('Atenção', 'E-mail não encontrado!');
        }
      }
    );
  }

}
