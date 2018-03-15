import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { FormService } from './../../../services/form/form.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Form } from './../../../models/form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template-list',
  templateUrl: './form-template-list.component.html',
  styleUrls: ['./form-template-list.component.css']
})
export class FormTemplateListComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private form: Form = new Form();
  private forms: Form[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  private page: number;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private router: Router,
    private formService: FormService,
    private toastService: ToastService,
    private permissions: Permissions,
    private loaderService: LoaderService
  ) {
      this.page = 0;
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate('/form-template-list');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.hasdata = false;
    this.page = 0;
    this.getForms();
    localStorage.removeItem('formId');
  }

  getForms() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.subscription = this.formService.getForms(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.forms = this.paginate.content;
        this.hasdata = true;
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
      },
      error => {
        this.loaderService.hide();
        this.hasdata = false;
      }
    );

  }
  setForm(form: Form) {
    localStorage.setItem('formId', form.id);
    this.router.navigate(['form-template']);
  }

  toView(form: Form) {
    localStorage.setItem('formId', form.id);
    this.router.navigate(['form-template-details']);
  }

  setPage(page: number) {
    this.page = page;
    this.getForms();
  }

  changeStatus(form: Form) {
    this.form = form;
  }

  disableEnableForm() {
    if (this.form.is_enabled === true) {
      this.form.is_enabled = false;
    } else {
      this.form.is_enabled = true;
    }

    this.formService.updateForm(this.form).subscribe(
      success => {
        this.form = success;
        this.toastService.toastSuccess();
      },
      error => {
        this.toastService.toastError();
        this.getForms();
      }
    );
  }

}
