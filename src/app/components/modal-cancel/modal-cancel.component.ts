import { Component, OnInit, Input, OnChanges, AfterViewChecked, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ModalCancelService, ModalState } from './modal-cancel.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.css']
})
export class ModalCancelComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private route: string;
  private _show: boolean;
  private subscription: Subscription;
  private openModalButton: HTMLButtonElement;

  constructor(
    private router: Router,
    private modalService: ModalCancelService
  ) {
    this._show = false;
  }

  ngOnInit() {
    this.openModalButton = (<HTMLButtonElement>document.getElementById('openModalBtn'));
    this.openModalButton.style.display = 'none';

    this.subscription = this.modalService.modalState.subscribe(
      (state: ModalState) => {
        this._show = state.show;
        console.log('modal-cancel.component!', this._show);
        if (this._show) {
          this.route = this.modalService.getRoute();
          this.openModal();
        }
      });
  }

  openModal() {
    if (this._show) {
      this.openModalButton.click();
      this._show = false;
      console.log('modal-cancel openModal');
    }
  }

  modalConfirm() {
    this.router.navigate([this.route]);
  }

  closeModal() {
    this._show = false;
    this.modalService.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
