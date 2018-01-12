import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalCancelService {

  private modalSubject = new Subject<ModalState>();
  modalState = this.modalSubject.asObservable();
  private route: any;

  constructor() { }

  show(route?: any) {
    this.route = route;
    this.modalSubject.next(<ModalState>{show: true});
    console.log('Show Modal');
  }

  hide() {
      this.modalSubject.next(<ModalState>{show: false});
      console.log('Hide Modal');
  }

  getRoute() {
    return this.route;
  }

}

export interface ModalState {
  show: boolean;
}