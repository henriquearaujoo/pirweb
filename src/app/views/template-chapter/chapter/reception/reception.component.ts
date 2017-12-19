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

  private reception: Reception =  new Reception();
  public isNewData = true;
  public chapter: Chapter;
  @Output() returnEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  onCancel() {
    this.cancelEvent.emit();
  }


  constructor(private service: ReceptionService, private toast: ToastService) { }

  ngOnInit() {

  }

  saveData() {
    if ( this.chapter === undefined) {
      this.returnEvent.emit(false);
      return;
    }
    this.reception.chapter = this.chapter.id;
    if (this.isNewData) {
      this.service.insert(this.reception).subscribe(
        s => {
          this.reception = s;
          this.returnEvent.emit(true);
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
    this.service.load(chapter).subscribe(
      s => {
        this.reception = s;
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
