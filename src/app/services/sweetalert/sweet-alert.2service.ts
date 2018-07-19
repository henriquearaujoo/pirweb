import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import swal, { SweetAlertResult } from 'sweetalert2';

@Injectable()
export class SweetAlert2Service {

  constructor(
    private router: Router) { }

    alertToSave(): Promise<SweetAlertResult> {
      return swal({
        title: '',
        width: 421,
        html: '<p style="font-size:16px;">Deseja salvar as alterações?</p>',
        imageUrl: './assets/img/global/ic_action.png',
        imageClass: 'img-warning',
        showCancelButton: true,
        confirmButtonColor: '#373d40',
        cancelButtonColor: '#dfe8ed',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim',
        reverseButtons: true,
        customClass: 'modal-lg',
        confirmButtonClass: 'confirm-lg',
        cancelButtonClass: 'cancel-lg',
        allowOutsideClick: false
      });
    }
}
