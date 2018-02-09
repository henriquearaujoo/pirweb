import { LoaderService } from './../services/loader/loader.service';
import { error } from 'util';
import { ToastService } from './../services/toast-notification/toast.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ModalService } from '../components/modal/modal.service';
import swal from 'sweetalert';
@Injectable()
export class Interceptor extends XHRBackend {

  state: RouterStateSnapshot;
  constructor(
    browserXhr: BrowserXhr,
    baseResponseOptions: ResponseOptions,
    xsrfStrategy: XSRFStrategy,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService,
    private loaderService: LoaderService ) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    // tslint:disable-next-line:prefer-const
    let token = localStorage.getItem('tokenPir');
    request.headers.set('Authorization', `PIRFAS=${token}`);
    // request.headers.set('Content-Type', 'application/json');
    const xhrConnection = super.createConnection(request);
    // console.log('xhrConnection', xhrConnection);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if ( error.status === 401 ) {
        localStorage.removeItem('tokenPir');
        localStorage.removeItem('profileId_rules');
        localStorage.removeItem('currentUserPir');
        localStorage.removeItem('currentIdPir');

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
        // setTimeout(() => {
        //   window.location.href = '/login';
        // }, 1000);
      } else {
        if ( error.status === 0 ) {
          swal({
            title: '',
            text: 'Sem conexão com a internet',
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
      return Observable.throw(error);
    });
    return xhrConnection;
  }
// tslint:disable-next-line:eofline
}