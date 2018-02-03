import { Permissions, RuleState } from './../../../../helpers/permissions';
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
  private btn_cancel: boolean;
  private lastVersion: any;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

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
    console.log('cancel', this.btn_cancel);
    this.btn_cancel = true;
  }

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private toastService: ToastService,
    private permissions: Permissions) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate('/chapter-dashboard');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.btn_cancel = false;
    this.lastVersion = localStorage.getItem('lastVersion');
    if (!this.lastVersion) {
      this.lastVersion = 0;
    }
  }

  getNextChapterNumber() {
    return this.chapterService.select();
  }

  public saveData() {
    this.chapter.thumbnails = [];
    if (this.btn_cancel) {
      this.btn_cancel = false;
      return false;
    }
    if (this.isNewData) {
      this.chapter.number = Number(this.number);
    }

    this.chapter.time_next_visit = Number(this.chapter.time_next_visit);
    this.chapter.estimated_time = Number(this.chapter.estimated_time);

    if ( this.isNewData && this.chapter !== undefined ) {
      this.chapterService.insert(this.chapter).subscribe(
        s => {
          this.chapter = s;
          this.returnEvent.emit(s);
          this.isNewData  = false;
          this.chapter.version = this.lastVersion;
          console.log('saved with success!', this.chapter);
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
          this.returnEvent.emit(s);
          console.log('updated with success!');
        },
        e => {
          this.returnEvent.emit(null);
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
