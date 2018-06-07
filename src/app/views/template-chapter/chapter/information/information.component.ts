import { Constant } from './../../../../constant/constant';
import { element } from 'protractor';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { ToastService } from './../../../../services/toast-notification/toast.service';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Chapter } from '../../../../models/chapter';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { Observable } from 'rxjs/Observable';
import { Delta } from 'quill';


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
  private fieldEditor: string[] = new Array();
  private validEditor: boolean;

  @Output() returnEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  public editorContent = '';
  private limit = Constant.LIMIT_CHARACTERS;
  private characters =  this.limit;
  public editorOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }]
      ]
    },
    placeholder: '',
    theme: 'snow',
  };

  onCancel() {
    this.cancelEvent.emit();
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
    this.permissions.canActivate(['/capitulos/registro']);
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
    this.validEditor = true;
    console.log(this.fieldEditor);
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
    this.verifyEditor();
    if (this.validEditor) {
      if ( this.isNewData && this.chapter !== undefined ) {
        this.chapterService.insert(this.chapter).subscribe(
          s => {
            this.chapter = s;
            this.returnEvent.emit(s);
            this.isNewData  = false;
            this.chapter.version = this.lastVersion;
          },
          e => {
            // this.toastService.toastError();
            this.returnEvent.emit(null);
            console.log('error: ' + e);
          }
        );
      }else {
        this.chapter.medias.forEach( elem => {
          elem.media_type = undefined;
          elem.storage_type = undefined;
        });

        this.chapterService.update(this.chapter).subscribe(
          s => {
            this.chapter = s;
            this.returnEvent.emit(s);
          },
          e => {
            this.returnEvent.emit(null);
            console.log('error: ' + e);
          }
        );
      }
    }
  }

  public verifyEditor() {
    this.validEditor = true;
    for (let i = 0; i < this.fieldEditor.length; i++) {
      if (this.fieldEditor[i] === '') {
        this.validEditor = false;
        break;
      }
    }
  }

  public load(id: string): Observable<Chapter> {
   return  this.chapterService.load(id);
  }

  public loadForm(c: Chapter) {
    this.chapter = c;
  }

  verifyValidSubmitted(form, field) {
    return (field.dirty || field.touched || form.submitted) && !field.valid;
  }

  applyCssError(form, field, position) {
    return {
      'has-error': this.verifyValidSubmitted(form, field) || this.verifyValidSubmittedEditor(form, field, position),
      'has-feedback': this.verifyValidSubmitted(form, field) || this.verifyValidSubmittedEditor(form, field, position)
    };
  }

  verifyValidSubmittedEditor(form, field, position?) {
    return this.fieldEditor[position] === '' && (form.submitted || field.dirty || field.touched);
  }

  onKey(event, position) {
    this.fieldEditor[position] = event.text.trim();
    console.log('position ' + position +  this.fieldEditor[position]);
    this.characters = (this.limit - event.editor.getLength()) + 1;
    if (event.editor.getLength() - 1 > this.limit) {
      event.editor.deleteText(this.limit, event.editor.getLength());
      event.editor.update();
    }
  }
}
