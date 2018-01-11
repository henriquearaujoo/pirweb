import { ToastService } from './../../../../services/toast-notification/toast.service';
import { ReceptionService } from './../../../../services/reception/reception.service';
import { Subject } from 'rxjs/Subject';
import { Reception } from './../../../../models/reception';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Chapter } from '../../../../models/chapter';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})

export class ReceptionComponent implements OnInit {

  private reception: Reception;
  public isNewData = true;
  public chapter: string;
  private btn_cancel: boolean;

  @Output() returnEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  public editorOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }]
      ]
    },
    placeholder: '...',
    theme: 'snow'
  };

  onCancel() {
    this.cancelEvent.emit();
    this.btn_cancel = true;
  }


  constructor(private service: ReceptionService, private toast: ToastService) { }

  ngOnInit() {
    this.btn_cancel = false;
    this.reception = new Reception();
   }

  saveData() {
    if (this.btn_cancel) {
      this.btn_cancel = false;
      return false;
    }
    if ( this.chapter === undefined) {
      this.returnEvent.emit(false);
      return;
    }

    this.reception.chapter = this.chapter;
    if (this.isNewData || this.reception.id === undefined) {
      this.service.insert(this.reception).subscribe(
        s => {
          this.reception = s;
          this.returnEvent.emit(true);
          this.isNewData  = false;
         },
        e => {
          console.log(e);
          this.returnEvent.emit(false);
        }
      );
    }else {
      this.service.update(this.reception).subscribe(
        s => {
          this.reception = s;
          this.returnEvent.emit(true);
         },
        e => {
          console.log(e);
          this.returnEvent.emit(false);
        }
      );
    }
  }

  load(chapter) {
    this.chapter = chapter;
    this.service.load(chapter).subscribe(
      s => {
        this.reception = s[0];
        console.log('Load:', this.reception);
        if (this.reception === undefined) {
          this.reception = new Reception();
        }
      },
      e => {
        console.log('error: ' + e);
      }
    );
  }

  verifyValidSubmitted(form, field) {
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }
}
