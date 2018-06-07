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

  alertUpdatePassword(route: string) {
    swal( {
      title: '',
      text: 'Sua senha foi alterada com Sucesso!',
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

  alertPermission(route: string) {
    swal( {
      title: '',
      text: 'Você não possui permissão para executar essa tarefa!',
      icon: 'error',
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

  alertToCancel(route: string) {
    swal( {
      title: '',
      text: 'Deseja realmente CANCELAR?',
      icon: 'warning',
      // buttons: ['Não', 'Sim'],
      buttons: {
        confirm: true,
        cancel: {
          text: 'Não',
          className: 'swal-btn-cancel'
        },
      },
      closeOnClickOutside: false,
      className: 'swal-cancel'
    })
    .then((confirm) => {
      if (confirm) {
        this.router.navigate([route]);
      }
    });
  }

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

  alertToSave(): Promise<boolean> {
    return swal( {
      title: '',
      text: 'Deseja salvar as alterações?',
      icon: 'warning',

      buttons: {
        confirm: true,
        cancel: {
          text: 'Não'
        },
      },
      closeOnClickOutside: false
    });
  }

}
