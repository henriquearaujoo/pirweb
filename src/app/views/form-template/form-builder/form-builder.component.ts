import { FormBuilderM } from './../../../models/formbuilder-m';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      questions: this._fb.array([
          this.initQuestion(),
      ])
  });
  }

  initQuestion() {
    return this._fb.group({
        description: ['', Validators.required],
        type: [''],
        value_type: [''],
        alternatives: this._fb.array([
          this.initAlternative(),
      ])
    });
  }

initAlternative() {
  return this._fb.group({
      description: ['', Validators.required],
      value_type: ['']
  });
}

addQuestion() {
    const control = <FormArray>this.myForm.controls['questions'];
    control.push(this.initQuestion());
}

removeQuestion(i: number) {
    const control = <FormArray>this.myForm.controls['questions'];
    control.removeAt(i);
}

// addAlternative() {
//   const control = <FormArray>this.myForm.get('questions').get('alternative');
//   control.push(this.initAlternative());
// }

// removeAlternative(i: number) {
//   const control = <FormArray>this.myForm.get('questions').get('alternatives');
//   control.removeAt(i);
// }

save(model: FormBuilderM) {
    // call API to save
    // ...
    console.log(model);
}
}
