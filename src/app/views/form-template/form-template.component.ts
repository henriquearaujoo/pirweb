import { FormQuestionB } from './../../models/form-question-b';
import { FormQuestionA } from './../../models/form-question-a';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Router } from '@angular/router';
import { Permissions, RuleState } from './../../helpers/permissions';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { FormService } from './../../services/form/form.service';
import { Form } from './../../models/form';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../components/modal/modal.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {

  private form: Form = new Form();
  private questionA: FormQuestionA = new FormQuestionA();
  private questionB: FormQuestionB = new FormQuestionB();
  private isNewData: boolean;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private _range: number[] = Array();
  private indicators: any[] = Array();
  private band1: any[] = Array();

  constructor(
    private formService: FormService,
    private sweetAlertService: SweetAlertService,
    private permissions: Permissions,
    private route: Router,
    private toastService: ToastService,
    private modalService: ModalService
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate('/form-template');
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
    this.urlId = localStorage.getItem('formId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    }

    for (let i = 1; i <= 11; i++) {
      this._range.push(i);
    }

  }

  saveData() {
    this.form.from = Number(this.form.from);
    this.form.to = Number(this.form.to);
      console.log(this.form);
      if (this.isNewData || this.form.id === undefined) {
        this.formService.insertForm(this.form).subscribe(
          success => {
            this.form = success;
            console.log('save:', this.form);
            this.isNewData  = false;
            this.sweetAlertService.alertSuccess('form-template-list');
          },
          error => {
            this.toastService.toastError();
            console.log('save error:', error);
          }
        );
      } else {
        this.formService.updateForm(this.form).subscribe(
          success => {
            this.sweetAlertService.alertSuccessUpdate('form-template-list');
          },
          error => {
            this.toastService.toastError();
            console.log('update error:', error);
          }
        );
      }
  }

  saveQuestion() {
    console.log('A', this.questionA.dimension);
    console.log('B', this.questionB);
    this.formService.insertQuestionA(this.questionA).subscribe(
      success => {
        this.sweetAlertService.alertSuccess('form-template');
      },
      error => console.log(error)
    );
  }

  load() {
    this.formService.load(this.urlId).subscribe(
      success => {
        this.form = success;
      },
      error => console.log(error)
    );
  }

  loadQuestions() {
    this.formService.getQuestions();
  }

  createNewQuestion() { }

  onCancel() {
    this.modalService.modalCancel('/form-template-list');
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

}
