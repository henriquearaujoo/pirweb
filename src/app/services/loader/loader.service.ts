import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderState>{show: true});
    console.log('Show loader');
  }

  hide() {
      this.loaderSubject.next(<LoaderState>{show: false});
      console.log('Hide loader');
  }

}

export interface LoaderState {
  show: boolean;
}