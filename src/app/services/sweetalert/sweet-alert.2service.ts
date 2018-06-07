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
        width: 350,
        html: '<p style="font-size:18px;">Deseja salvar as alterações?</p>',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      });
    }
}
