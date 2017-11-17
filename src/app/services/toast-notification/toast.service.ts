import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Injectable()
export class ToastService {
  constructor(
    private toastService: NotificationsService,
    private router: Router) { }
    toastSuccess() {
      this.toastService.success('Sucesso!', 'Ação realizada com sucesso', {
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

}
