import { ToastService } from './../../../../services/toast-notification/toast.service';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Chapter } from '../../../../models/chapter';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  private chapter: Chapter = new Chapter();
  private estimated_time: number;
  public isNewData = true;
  public number: number;
  @Output() returnEvent = new EventEmitter();

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private toastService: ToastService) {
  }

  ngOnInit() { }

  getNextChapterNumber() {
    return this.chapterService.select();
  }

  public saveData() {

    this.chapter.number = Number(this.number);
    this.chapter.time_next_visit = Number(this.chapter.time_next_visit);
    this.chapter.estimated_time = Number(this.chapter.estimated_time);

    if ( this.isNewData ) {
      this.chapterService.insert(this.chapter).subscribe(
        s => {
          //this.chapter = s;
          this.returnEvent.emit(true);
          console.log('saved with success!');
        },
        e => {
          this.returnEvent.emit(false);
          console.log('error: ' + e);
        }
      );
    }else {
      this.chapterService.update(this.chapter).subscribe(
        s => {
          this.chapter = s;
          this.returnEvent.emit(true);
          console.log('saved with success!');
        },
        e => {
          this.returnEvent.emit(false);
          console.log('error: ' + e);
        }
      );
    }
  }

  public load(id: string): Observable<Chapter> {
   return  this.chapterService.load(id);
  }

  public loadForm(c: Chapter) {
    this.chapter = c;
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
