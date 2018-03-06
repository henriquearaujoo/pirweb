import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable()
export class SweetAlertService {

  constructor(
    private router: Router) { }

  alertSuccess(route: string) {
    swal( {
      title: '',
      text: 'Cadastro realizado com Sucesso!',
      icon: 'success',
      buttons: {
        confirm: {
          text: 'Fechar',
          className: 'swal-btn-close'
        }
      },
      closeOnClickOutside: false,
      className: 'swal-add-success'
    })
    .then((confirm) => {
      if (confirm) {
        this.router.navigate([route]);
      }
    });
  }

  alertSuccessUpdate(route: string) {
    swal( {
      title: '',
      text: 'Informações atualizadas com Sucesso!',
      icon: 'success',
      buttons: {
        confirm: {
          text: 'Fechar',
          className: 'swal-btn-close'
        }
      },
      closeOnClickOutside: false,
      className: 'swal-add-success'
    })
    .then((confirm) => {
      if (confirm) {
        this.router.navigate([route]);
      }
    });
  }

  // alertCancel(route: string) {
  //   swal( {
  //     title: '',
  //     text: 'Informações atualizadas com Sucesso!',
  //     icon: 'success',
  //     buttons: {
  //       confirm: {
  //         text: 'Fechar',
  //         className: 'swal-btn-close'
  //       }
  //     },
  //     closeOnClickOutside: false,
  //     className: 'swal-add-success'
  //   })
  //   .then((confirm) => {
  //     if (confirm) {
  //       this.router.navigate([route]);
  //     }
  //   });
  // }

  alertSessionExpired() {
    swal({
      title: 'Sessão expirada!',
      text: 'Você precisa efetuar o login novamente!',
      icon: 'warning',
      buttons: {
        ok: {
          text: 'Ok',
          className: 'swal-btn-ok'
        }
      },
      closeOnClickOutside: false,
      className: 'swal-btn-ok'
    })
    .then((c) => {
      if (c) {
        window.location.href = '/login';
      }
    });
  }

  connectionError() {
    swal({
      title: '',
      text: 'Falha na conexão com o servidor!',
      icon: 'warning',
      buttons: {
        ok: {
          text: 'Ok',
          className: 'swal-btn-ok'
        }
      },
      closeOnClickOutside: false,
      className: 'swal-btn-ok'
    })
    .then((c) => {
      if (c) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    });
  }

}
