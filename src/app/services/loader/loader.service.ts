import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    // console.log('show loader');
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  hide() {
    // console.log('hide loader');
      this.loaderSubject.next(<LoaderState>{show: false});
  }

}

export interface LoaderState {
  show: boolean;
}
