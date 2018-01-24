import { Component, OnInit, Input, OnChanges, AfterViewChecked, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ModalService, ModalState } from './modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private route: string;
  private show_cancel: boolean;
  private show_success: boolean;
  private show_SessionExpired: boolean;
  private show_Permission: boolean;
  private subscription: Subscription;
  private openModalCancel: HTMLButtonElement;
  private openModalSuccess: HTMLButtonElement;
  private openModalSessionExpired: HTMLButtonElement;
  private openModalPermission: HTMLButtonElement;

  constructor(
    private router: Router,
    private modalService: ModalService
  ) {
    this.show_cancel = false;
    this.show_success = false;
    this.show_SessionExpired = false;
    this.show_Permission = false;
  }

  ngOnInit() {
    this.openModalCancel = (<HTMLButtonElement>document.getElementById('openModalCancel'));
    this.openModalCancel.style.display = 'none';

    this.openModalSuccess = (<HTMLButtonElement>document.getElementById('openModalSuccess'));
    this.openModalSuccess.style.display = 'none';

    this.openModalSessionExpired = (<HTMLButtonElement>document.getElementById('openModalSessionExpired'));
    this.openModalSessionExpired.style.display = 'none';

    this.openModalPermission = (<HTMLButtonElement>document.getElementById('openModalPermission'));
    this.openModalPermission.style.display = 'none';

    this.subscription = this.modalService.modalState.subscribe(
      (state: ModalState) => {
        this.show_cancel = state.showCancel;
        this.show_success = state.showSuccess;
        this.show_SessionExpired = state.show_SessionExpired;
        this.route = this.modalService.getRoute();
        console.log('show_SessionExpired', this.show_SessionExpired);
        this.openModal();
      });
  }

  openModal() {
    if (this.show_cancel) {
      this.openModalCancel.click();
      this.show_cancel = false;
      console.log('Open Modal Cancel');
    } else {
      if (this.show_success) {
        this.openModalSuccess.click();
        this.show_success = false;
        console.log('Open Modal Success');
      } else {
        if (this.show_SessionExpired) {
          this.openModalSessionExpired.click();
          this.show_SessionExpired = false;
          console.log('Open Modal Session Expired');
        } else {
          if (this.show_Permission) {
            this.openModalPermission.click();
            this.show_Permission = false;
            console.log('Open Modal Permission');
        }
       }
      }
    }
  }

  modalConfirm() {
    this.router.navigate([this.route]);
  }

  closeModal() {
    this.show_cancel = false;
    this.show_success = false;
    this.modalService.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
