import { Permissions, RuleState } from './../../../helpers/permissions';
import { SweetAlertService } from './../../../services/sweetalert/sweet-alert.service';
import { AlternativeFormBuilder } from './../../../models/alternativeFormBuilder';
import { FormBuilderM } from './../../../models/formbuilder-m';
import { QuestionFormBuilder } from './../../../models/questionFormbuilder';
import { Component, OnInit, OnChanges } from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormBuilderService } from '../../../services/form/formBuilder.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, OnChanges {

  private urlId: string;
  form: FormGroup;
  private _formbuilder: FormBuilderM = new FormBuilderM();
  private isNewData: boolean;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private _fb: FormBuilder,
    private formService: FormBuilderService,
    private sweetAlertService: SweetAlertService,
    private permissions: Permissions) { }

  ngOnInit() {
    this.permissions.canActivate(['/formularios/construtor/registro']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.urlId = localStorage.getItem('formBuilderId');
    if (this.urlId !== null && this.urlId !== '') {
      this.formService.load(this.urlId).subscribe(
        s => {
          this._formbuilder = s;
          this.createForm();
          this.isNewData = false;
          console.log(this._formbuilder);
        }
      );
    } else {
      this.isNewData = true;
      this.createForm();
    }
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  createForm() {
    this.form = this._fb.group({
      id: [this._formbuilder.id],
      description: [this._formbuilder.description],
      questions: this._fb.array([
        // this.initQuestion()
      ])
    });
  }

  initQuestion() {
    return this._fb.group({
        id: [''],
        description: [''],
        type: [''],
        value_type: [''],
        required: false,
        alternatives: this._fb.array([
          this.initAlternative()
      ])
    });
  }

  initAlternative() {
    return this._fb.group({
        id: [''],
        description: [''],
        value_type: ['']
    });
  }

  rebuildForm() {
    this.form.reset({
      id: this._formbuilder.id,
      description: this._formbuilder.description
    });
  }

  save() {
    if (this.form.value.id === null) {
      this.form.value.id = undefined;
    }
    if ( this.isNewData || this._formbuilder.id === undefined ) {
      if (this.form.value.questions.length > 0) {
        for (let i = 0; i < this.form.value.questions.length; i++ ) {
          this.form.value.questions[i].id = undefined;
          if (this.form.value.questions[i].required === null) {
            this.form.value.questions[i].required = false;
          }
          if (this.form.value.questions[i].alternatives.length > 0) {
            for (let j = 0; j < this.form.value.questions.length; j++ ) {
              this.form.value.questions[i].alternatives[j].id = undefined;
            }
          }
        }
      }
      if (this.canCreate) {
        console.log(this.form.value);
        this.formService.insertForm(this.form.value).subscribe(
        success => {
          this.isNewData = false;
          // this._formbuilder = success;
          this.sweetAlertService.alertSuccess('/formularios/construtor');
        },
        error => console.log(error)
      );
      } else {
        this.sweetAlertService.alertPermission('/formularios/construtor');
      }
    } else {
      if (this.canUpdate) {
        console.log(this.form.value);
        this.formService.updateForm(this.form.value).subscribe(
          success => {
            this.sweetAlertService.alertSuccessUpdate('/formularios/construtor');
          },
          error => console.log(error)
        );
      } else {
        this.sweetAlertService.alertPermission('/formularios');
      }
    }
  }

  // save(model: FormBuilderM) {
  //   const data = JSON.stringify(this.form.value);
  //   const formB: FormBuilderM = this.form.value;
  //   console.log(formB);
  //   this.formService.insertForm(formB).subscribe(
  //     s => {
  //       console.log(s);
  //     },
  //     error => console.log(error)
  //   );
  // }
}
