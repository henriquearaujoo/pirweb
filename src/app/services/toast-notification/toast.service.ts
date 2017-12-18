import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToastService {
  private subject = new Subject<any>();

  constructor(
    private toastService: NotificationsService,
    private router: Router) { }
    toastSuccess() {
      this.toastService.success('Sucesso!', 'Ação realizada com sucesso', {
        timeOut: 800,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastMsg(title: string, msg: string, timeOut?: number, clickClose?: boolean, pauseOnHover?: boolean) {
      this.toastService.success(title, msg, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover:  true,
        clickToClose: true
      });
    }
    toastErrorChapterId() {
      this.toastService.error('Erro!', 'Salve as informações do cápitulo para poder registar as outras informações', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    toastErrorLabel() {
      this.toastService.error('Erro!', 'Necessário o preenchimento de todos os campos obrigatórios', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastError() {
      this.toastService.error('Erro!', 'Ação não realizada', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastErrorExist() {
      this.toastService.error('Erro!', 'Perfil já cadastrado!', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastErrorExists(res) {
      this.toastService.warn('Atenção!', res + ' já cadastrado.', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastErrorValid(res) {
      this.toastService.warn('Atenção!', res + ' informado não é válido.', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    toastErrorPassword() {
      this.toastService.warn('Atenção!', 'SENHA informada não é válida.', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastErrorChangeStatus() {
      this.toastService.warn('Atenção!', ' Não é possível habilitar essa versão.', {
        timeOut: 800,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
}
