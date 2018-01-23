import { ToastService } from './../services/toast-notification/toast.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ModalService } from '../components/modal/modal.service';
@Injectable()
export class Interceptor extends XHRBackend {

  state: RouterStateSnapshot;
  constructor(
    browserXhr: BrowserXhr,
    baseResponseOptions: ResponseOptions,
    xsrfStrategy: XSRFStrategy,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService ) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    // tslint:disable-next-line:prefer-const
    let token = localStorage.getItem('tokenPir');
    request.headers.set('Authorization', `PIRFAS=${token}`);
    // request.headers.set('Content-Type', 'application/json');
    // tslint:disable-next-line:prefer-const
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if (error.status === 401 || error.status === 403 || error.status === 0) {
        console.log('acesso não autorizado');
        // this.modalService.modalSessionExpired();
        this.toastService.toastMsgError('Atenção', 'Sessão expirada!');
        localStorage.removeItem('tokenPir');
        localStorage.removeItem('profileId_rules');
        // alert('test');
        this.router.navigate(['/login']);
      }
        // if ( error.status === 0) {
        //   // this.toastService.toastMsgError('Atenção', 'Sem conexão com o servidor!');
        //   localStorage.removeItem('tokenPir');
        //   localStorage.removeItem('profileId_rules');
        //   // alert('Sessão expirada!');
        //   this.router.navigate(['/login']);
        //   this.toastService.toastMsgError('Atenção', 'Sessão expirada!');
        // }

      return Observable.throw(error);
    });
    return xhrConnection;
  }
}