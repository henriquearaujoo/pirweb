import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  private modalSubject = new Subject<ModalState>();
  modalState = this.modalSubject.asObservable();
  private route: any;

  constructor() { }

  modalCancel(route: any) {
    this.route = route;
    this.modalSubject.next(<ModalState>{showCancel: true});
    console.log('Modal Cancel');
  }

  modalSuccess(route: any) {
    this.route = route;
    this.modalSubject.next(<ModalState>{showSuccess: true});
    console.log('Modal Success');
  }

  modalSessionExpired() {
    // this.route = route;
    this.modalSubject.next(<ModalState>{show_SessionExpired: true});
    console.log('Modal Session Expired');
  }

  modalPermission() {
    // this.route = route;
    this.modalSubject.next(<ModalState>{showPermission: true});
    console.log('Modal Permission');
  }

  hide() {
    this.modalSubject.next(<ModalState>{showCancel: false, showSuccess: false});
    console.log('Hide Modal');
  }

  getRoute() {
    return this.route;
  }

}

export interface ModalState {
  showCancel: boolean;
  showSuccess: boolean;
  show_SessionExpired: boolean;
  showPermission: boolean;
}