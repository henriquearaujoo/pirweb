import { SweetAlert2Service } from './../../../../services/sweetalert/sweet-alert.2service';
import { Constant } from './../../../../constant/constant';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { ToastService } from './../../../../services/toast-notification/toast.service';
import { ReceptionService } from './../../../../services/reception/reception.service';
import { Subject } from 'rxjs/Subject';
import { Reception } from './../../../../models/reception';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { Route, Router } from '@angular/router';

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
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  @Output() returnEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  private onChange: boolean;

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

  // onCancel() {
  //   this.cancelEvent.emit();
  //   this.btn_cancel = true;
  // }


  constructor(
    private service: ReceptionService,
    private toastService: ToastService,
    private permissions: Permissions,
    private sweetAlert2Service: SweetAlert2Service,
    private router: Router) {
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
    this.reception = new Reception();
   }

  saveData() {
    // if (this.btn_cancel) {
    //   this.btn_cancel = false;
    //   return false;
    // }
    if ( this.chapter === undefined) {
      this.returnEvent.emit(false);
      return;
    }

    this.reception.chapter_id = this.chapter;
    this.verifyEditor();
    if (this.validEditor) {
      if (this.isNewData || this.reception.id === undefined) {
        this.service.insert(this.reception).subscribe(
          s => {
            this.reception = s;
            this.returnEvent.emit(true);
            this.isNewData  = false;
            // this.btn_cancel = true;
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
            setTimeout(() => {
              if (this.btn_cancel) {
                this.router.navigate(['/capitulos']);
              }
            }, 1000);
           },
          e => {
            console.log(e);
            this.returnEvent.emit(false);
          }
        );
      }
    } else {
      this.btn_cancel = false;
      this.toastService.toastMsgError('Erro', 'Preencha todos os campos obrigatórios do formulário!');
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
      s => {
        this.reception = s[0];
        if (this.reception === undefined) {
          this.reception = new Reception();
        }
      },
      e => {
        console.log('error: ' + e);
      }
    );
  }

  onCancel() {
    if (this.onChange) {
      this.sweetAlert2Service.alertToSave()
        .then((result) => {
          if (result.value) {
            this.btn_cancel = true;
            this.saveData();
          } else {
            this.router.navigate(['/capitulos']);
          }
        });
    } else {
      this.cancelEvent.emit();
      this.btn_cancel = true;
    }
  }

  verifyValidSubmitted(form, field) {
    if (field.dirty) {
      this.onChange = true;
    }
    return (field.dirty || field.touched || form.submitted) && !field.valid;
  }

  applyCssError(form, field, position) {
    return {
      'has-error': this.verifyValidSubmitted(form, field) || this.verifyValidSubmittedEditor(form, field, position),
      'has-feedback': this.verifyValidSubmitted(form, field) || this.verifyValidSubmittedEditor(form, field, position)
    };
  }

  verifyValidSubmittedEditor(form, field, position?) {
    if (field.dirty) {
      this.onChange = true;
    }
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
