import { Permissions, RuleState } from './../../../../helpers/permissions';
import { Route, Router } from '@angular/router';
import { ToastService } from './../../../../services/toast-notification/toast.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../../../../services/form/formBuilder.service';
import { FormBuilderM } from '../../../../models/formBuilder-m';

@Component({
  selector: 'app-form-builder-list',
  templateUrl: './form-builder-list.component.html',
  styleUrls: ['./form-builder-list.component.css']
})
export class FormBuilderListComponent implements OnInit {

private forms: FormBuilderM[] = new Array();
private form: FormBuilderM;

private canRead: boolean;
private canUpdate: boolean;
private canCreate: boolean;
private canDelete: boolean;

  constructor(
    private formService: FormBuilderService,
    private toastService: ToastService,
    private router: Router,
    private permissions: Permissions
  ) { }

  ngOnInit() {
    this.permissions.canActivate(['/formularios/construtor']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.getForms();
  }

  newForm() {
    localStorage.removeItem('formBuilderId');
    this.router.navigate(['/formularios/construtor/registro']);
  }

  getForms() {
    this.formService.getForms().subscribe(
      s => {
        this.forms = s;
        console.log(s);
      },
      error => console.log(error)
    );
  }

  changeStatus(form: FormBuilderM) {
    this.form = form;
  }

  disableEnableForm() {
    if (this.form.status === true) {
      this.form.status = false;
    } else {
      this.form.status = true;
    }

    this.formService.updateForm(this.form).subscribe(
      success => {
        this.form = success;
        this.getForms();
        this.toastService.toastSuccess();
      },
      error => {
        this.toastService.toastError();
        this.getForms();
      }
    );
  }


}
