import { PagenateComponent } from './../../components/pagenate/pagenate.component';
import { PageService } from './../../services/pagenate/page.service';
import { PageComponent } from './../profile/page/page.component';
import { FormQuestionB } from './../../models/form-question-b';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Router } from '@angular/router';
import { Permissions, RuleState } from './../../helpers/permissions';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { FormService } from './../../services/form/form.service';
import { Form } from './../../models/form';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../components/modal/modal.service';
import { FormQuestion } from '../../models/form-question';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent extends PagenateComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private form: Form = new Form();
  private formQuestion: FormQuestion = new FormQuestion();
  private questions: FormQuestion[] = new Array();
  private isNewData: boolean;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private _range: number[] = Array();
  private indicators: any[] = Array();
  private band1: any[] = Array();
  private question: any = { type: ''};
  private show: boolean;
  private show_a: boolean;
  private show_b: boolean;
  public isNewQuestion: boolean;
  private index: number;
  private btn_cancel: boolean;
  private formTab: string;
  private questionsTab: string;

  constructor(
    private formService: FormService,
    private sweetAlertService: SweetAlertService,
    private permissions: Permissions,
    private route: Router,
    private toastService: ToastService,
    private modalService: ModalService,
    private servicePage: PageService
  ) {
    super(servicePage);
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
    this.index = 1;
   }

  ngOnInit() {
    this.permissions.canActivate(['/formularios/registro']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    /*check if is a new or update*/
    this.isNewData = true;
    this.question.type = 'UNDEFINED';
    this.urlId = localStorage.getItem('formId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    }

    for (let i = 1; i <= 11; i++) {
      this._range.push(i);
    }

    this.formTab = './assets/img/form/ic_form_enable.png';
    this.questionsTab = './assets/img/form/ic_questions_disable.png';

  }

  saveData() {
    this.form.from = Number(this.form.from);
    this.form.to = Number(this.form.to);
    // this.form.is_enabled = true;
    if ( this.btn_cancel) {
      return;
    }
    console.log(this.form);
    if (this.isNewData || this.form.id === undefined) {
      if (this.canCreate) {
        this.formService.insertForm(this.form).subscribe(
          success => {
            this.form = success;
            console.log('save:', this.form);
            this.urlId = this.form.id;
            this.isNewData  = false;
            this.sweetAlertService.alertSuccess('/formularios/registro');
          },
          error => {
            this.verifyError(error);
          }
        );
      } else {
        this.sweetAlertService.alertPermission('/formularios');
      }
    } else {
      if (this.canUpdate) {
        this.formService.updateForm(this.form).subscribe(
          success => {
            this.sweetAlertService.alertSuccessUpdate('/formularios/registro');
          },
          error => {
            this.verifyError(error);
          }
        );
      } else {
        this.sweetAlertService.alertPermission('/formularios');
      }
    }
  }

  verifyError(error) {
    switch (error) {
      case 'zone.found':
      this.toastService.toastMsgError('Erro', 'Indicador já cadastrado');
      break;
      case 'invalid.indicator':
      this.toastService.toastMsgError('Erro', 'Indicador inválido');
      break;
      default:
      this.toastService.toastError();
      console.log('update error:', error);
      break;
    }
  }

  saveQuestion() {
    console.log(this.question);
    if ((this.question.description === null || this.question.description === undefined || this.question.description === '') &&
       (this.question.type === null || this.question.type === undefined)) {
      this.toastService.toastMsgError('Erro', 'Descrição da questão e Tipo da questão são campos obrigatórios!');
      this.load();
      return false;
    }
    if (this.question.description === null || this.question.description === undefined || this.question.description === '') {
      this.toastService.toastMsgError('Erro', 'Descrição da questão é um campo obrigatório!');
      this.load();
      return false;
    } else if (this.question.type === null || this.question.type === undefined) {
      this.toastService.toastMsgError('Erro', 'Tipo da questão é um campo obrigatório!');
      this.load();
      return false;
    }
    if ( this.isNewQuestion || this.question.id === undefined ) {
      if (this.canCreate) {
        this.question.form_id = this.form.id;
      this.formService.insertQuestion(this.question).subscribe(
        success => {
          this.isNewQuestion = false;
          this.question = success;
          this.load();
          this.toastService.toastSuccess();
        },
        error => console.log(error)
      );
      } else {
        this.sweetAlertService.alertPermission('/formularios');
      }
    } else {
      if (this.canUpdate) {
        this.formService.updateQuestion(this.question).subscribe(
          success => {
            this.load();
            this.toastService.toastSuccess();
          },
          error => console.log(error)
        );
      } else {
        this.sweetAlertService.alertPermission('/formularios');
      }
    }
  }

  load() {
    this.formService.load(this.urlId).subscribe(
      success => {
        this.form = success;
        this.questions = this.form.questions;
        console.log(this.questions);
        this.questions = this.questions.sort(function (a, b) {
            return a.description.localeCompare(b.description);
        });
        this.index = 1;
        this.questions.forEach( el => {
          el.number = this.index ++;
        });
        this.allItems = this.questions;
        this.pagedItems = this.questions;
        this.setPage(1);
      },
      error => console.log(error)
    );
  }

  onEdit(item) {
    console.log(item);
    this.show = false;
    this.isNewQuestion = false;
    this.question = item;
  }

  loadQuestions() {
    this.formService.getQuestions();
  }

  createNewQuestion() {
    this.show = false;
    this.isNewQuestion = true;
    this.question = new FormQuestion();
  }

  showQuestion(item) {
    this.show = true;
    this.question = item;
  }

  changeStatus(item) {
    this.question = item;
  }

  disableEnableQuestion() {
    if (this.question.is_enabled === true) {
      this.question.is_enabled = false;
    } else {
      this.question.is_enabled = true;
    }
    console.log(this.question);

    this.formService.updateQuestion(this.question).subscribe(
      success => {
        this.question = success;
        this.load();
        this.toastService.toastSuccess();
      },
      error => {
        this.toastService.toastError();
        this.load();
      }
    );
  }

  onCancelQuestion() {
   this.load();
  }

  onCancel() {
    this.btn_cancel = true;
    this.modalService.modalCancel('/formularios');
    // this.sweetAlertService.alertToCancel('/form-template-list');
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

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.formTab = './assets/img/form/ic_form_enable.png';
      this.questionsTab = './assets/img/form/ic_questions_disable.png';
      break;
      case 1:
      this.formTab = './assets/img/form/ic_form_disable.png';
      this.questionsTab = './assets/img/form/ic_questions_enable.png';
      break;
    }
  }

}
