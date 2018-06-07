import { Constant } from './../../../../constant/constant';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { ToastService } from './../../../../services/toast-notification/toast.service';
import { InterventionService } from './../../../../services/intervention/intervention.service';
import { Intervention } from './../../../../models/intervention';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})

export class InterventionComponent implements OnInit {

  private intervention: Intervention;
  public chapter: string;
  public isNewData: boolean;
  @Output() cancelEvent = new EventEmitter();
  @Output() returnEvent = new EventEmitter();
  private btn_cancel: boolean;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  private limit = Constant.LIMIT_CHARACTERS;
  private characters =  this.limit;
  private fieldEditor: string[] = new Array();
  private validEditor: boolean;

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
    theme: 'snow'
  };

  constructor(
    private service: InterventionService,
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
    this.intervention = new Intervention();
    this.btn_cancel = false;
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
    this.intervention.chapter_id = this.chapter;
    this.verifyEditor();
    if (this.validEditor) {
      if (this.isNewData || this.intervention.id === undefined) {
        this.service.insert(this.intervention).subscribe(
          s => {
            this.isNewData  = false;
            this.intervention = s;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          },
          e => {
            if ( e[0] === 'chapter.intervention.chapter.missing') {
              this.toastService.toastErrorChapterId();
            } else {
              this.toastService.toastError();
            }
            console.log('error: ' + e);
          }
        );
      }else {
        this.service.update(this.intervention).subscribe(
          s => {
            this.intervention = s;
            this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso');
          },
          e => {
            this.toastService.toastError();
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

  load(chapter) {
    this.chapter = chapter;
    this.service.load(chapter).subscribe(
      success => {
          this.intervention = success[0];
          if (this.intervention === undefined) {
            this.intervention = new Intervention();
          }
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  onCancel() {
    this.cancelEvent.emit();
    this.btn_cancel = true;
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
    this.characters = (this.limit - event.editor.getLength()) + 1;
    if (event.editor.getLength() - 1 > this.limit) {
      event.editor.deleteText(this.limit, event.editor.getLength());
      event.editor.update();
    }
  }
}
