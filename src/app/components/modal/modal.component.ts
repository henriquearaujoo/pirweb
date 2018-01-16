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
  private subscription: Subscription;
  private openModalCancel: HTMLButtonElement;
  private openModalSuccess: HTMLButtonElement;

  constructor(
    private router: Router,
    private modalService: ModalService
  ) {
    this.show_cancel = false;
    this.show_success = false;
  }

  ngOnInit() {
    this.openModalCancel = (<HTMLButtonElement>document.getElementById('openModalCancel'));
    this.openModalCancel.style.display = 'none';

    this.openModalSuccess = (<HTMLButtonElement>document.getElementById('openModalSuccess'));
    this.openModalSuccess.style.display = 'none';

    this.subscription = this.modalService.modalState.subscribe(
      (state: ModalState) => {
        this.show_cancel = state.showCancel;
        this.show_success = state.showSuccess;
        this.route = this.modalService.getRoute();
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
