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
  }

  modalSuccess(route: any) {
    this.route = route;
    this.modalSubject.next(<ModalState>{showSuccess: true});
  }

  modalSessionExpired() {
    // this.route = route;
    this.modalSubject.next(<ModalState>{show_SessionExpired: true});
  }

  modalPermission() {
    // this.route = route;
    this.modalSubject.next(<ModalState>{showPermission: true});
  }

  modalRemove(route: any) {
    this.route = route;
    this.modalSubject.next(<ModalState>{showRemove: true});
  }

  modalPassword(route: any) {
    this.route = route;
    this.modalSubject.next(<ModalState>{showPassword: true});
  }

  hide() {
    this.modalSubject.next(<ModalState>{showCancel: false, showSuccess: false});
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
  showRemove: boolean;
  showPassword: boolean;
}
