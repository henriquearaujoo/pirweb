import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { PageService } from './../../../services/pagenate/page.service';
import { ModalService } from './../../../components/modal/modal.service';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { FormQuestion } from './../../../models/form-question';
import { Form } from './../../../models/form';
import { FormService } from './../../../services/form/form.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template-details',
  templateUrl: './form-template-details.component.html',
  styleUrls: ['./form-template-details.component.css']
})
export class FormTemplateDetailsComponent extends PagenateComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private form: Form = new Form();
  private formQuestion: FormQuestion = new FormQuestion();
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

  constructor(
    private formService: FormService,
    private permissions: Permissions,
    private toastService: ToastService,
    private modalService: ModalService,
    private servicePage: PageService
  ) {
    super(servicePage);
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
  }

  load() {
    this.formService.load(this.urlId).subscribe(
      success => {
        this.form = success;
        this.form.questions = this.form.questions.sort(function (a, b) {
          return a.description.localeCompare(b.description);
         });
        this.allItems = this.form.questions;
        this.pagedItems = this.form.questions;
        this.setPage(1);
      },
      error => console.log(error)
    );
  }

  showQuestion(item) {
    this.show = true;
    this.question = item;
  }

  onCancel() {
    this.modalService.modalCancel('/form-template-list');
    // this.sweetAlertService.alertToCancel('/form-template-list');
  }

}
