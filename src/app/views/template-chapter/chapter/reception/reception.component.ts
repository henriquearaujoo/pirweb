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

  constructor(private service: ReceptionService, private toast: ToastService) { }

  ngOnInit() {

  }

  saveData() {
    if ( this.chapter === null) {
      this.returnEvent.emit(false);
      return;
    }
    this.reception.chapter = this.chapter.id;
    if (this.isNewData) {
      this.service.insert(this.reception).subscribe(
        s => this.reception = s,
        e => console.log(e)
      );
    }else {
      this.service.update(this.reception).subscribe();
    }
  }

  load(chapter) {
    this.service.load(chapter).subscribe(
      s => {
        this.reception = s;
      }
    );
  }

}
