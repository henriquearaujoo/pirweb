import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-waiting-answer',
  templateUrl: './modal-waiting-answer.component.html',
  styleUrls: ['./modal-waiting-answer.component.css']
})
export class ModalWaitingAnswerComponent implements OnInit {

  @Input() inProgress: boolean;
  private openModalButton: HTMLButtonElement;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private modal: HTMLButtonElement;

  constructor() { }

  ngOnInit() {
    this.openModalButton = (<HTMLButtonElement>document.getElementById('openModalButton'));
    this.modal = (<HTMLButtonElement>document.getElementById('modal'));
    this.openModalButton.style.display = 'none';
    this.onShow();
  }

  onShow() {
    this.openModalButton.click();
  }

  onClose() {
    this.modal.click();
  }
}
