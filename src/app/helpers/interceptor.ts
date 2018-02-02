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
    // this.loaderService.show();
    // tslint:disable-next-line:prefer-const
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
        console.log('ERROR', error);
        if (error.status === 401 || error.status === 403) {
          // this.loaderService.hide();
          console.log('acesso não autorizado');
          this.toastService.toastMsgError('Atenção', 'Sessão expirada!');
          localStorage.removeItem('tokenPir');
          localStorage.removeItem('profileId_rules');
          localStorage.removeItem('currentUserPir');
          this.router.navigate(['/login']);
        } else {
          if (error.status === 0) {
            // this.loaderService.hide();
            this.toastService.toastMsgError('Erro', 'Sem conexão com o servidor!');
            localStorage.removeItem('tokenPir');
            localStorage.removeItem('profileId_rules');
            localStorage.removeItem('currentUserPir');
            this.router.navigate(['/login']);
          }
        }
        // switch (error.status) {
        //   case 401:
        //     console.log('acesso não autorizado');
        //     // this.modalService.modalSessionExpired();
        //     this.toastService.toastMsgError('Atenção', 'Sessão expirada!');
        //     localStorage.removeItem('tokenPir');
        //     localStorage.removeItem('profileId_rules');
        //     localStorage.removeItem('currentUserPir');
        //     this.router.navigate(['/login']);
        //     location.reload();
        //     break;
        //   case 403:
        //     console.log('acesso não autorizado');
        //     // this.modalService.modalSessionExpired();
        //     this.toastService.toastMsgError('Atenção', 'Sessão expirada!');
        //     localStorage.removeItem('tokenPir');
        //     localStorage.removeItem('profileId_rules');
        //     localStorage.removeItem('currentUserPir');
        //     // alert('test');
        //     this.router.navigate(['/login']);
        //     location.reload();
        //     break;
        //   case 0:
        //     this.toastService.toastMsgError('Error', 'Sem conexão com o servidor!');
        //     localStorage.removeItem('tokenPir');
        //     localStorage.removeItem('profileId_rules');
        //     localStorage.removeItem('currentUserPir');
        //     this.router.navigate(['/login']);
        //     // location.reload();
        //     break;
        //   default:
        //     this.router.navigate(['/login']);
        //     break;
        // }

      return Observable.throw(error);
    });
    // this.loaderService.hide();
    return xhrConnection;
  }
// tslint:disable-next-line:eofline
}