import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ToastService {
  constructor(private toastService: NotificationsService) { }
    toastSuccess() {
      this.toastService.success('Sucesso!', 'Ação realizada com sucesso', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

    toastError(error) {
      this.toastService.error('Erro!', 'Ação não realizada' + error, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }

}
