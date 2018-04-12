import { SweetAlertService } from './../services/sweetalert/sweet-alert.service';
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
    private loaderService: LoaderService,
    private sweetAlertService: SweetAlertService ) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    const token = localStorage.getItem('tokenPir');
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
        // this.sweetAlertService.alertSessionExpired();
      } else {
        if ( error.status === 0 ) {
          localStorage.removeItem('tokenPir');
          localStorage.removeItem('profileId_rules');
          localStorage.removeItem('currentUserPir');
          localStorage.removeItem('currentIdPir');
          this.sweetAlertService.connectionError();
        }
      }
      return Observable.throw(error);
    });
    return xhrConnection;
  }
// tslint:disable-next-line:eofline
}