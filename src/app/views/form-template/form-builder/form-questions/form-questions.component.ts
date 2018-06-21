import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.css']
})
export class FormQuestionsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('group')
  questionForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  //   this.questionForm = this._fb.group({
  //     description: ['', [Validators.required, Validators.minLength(5)]],
  //     value_type: ['', [Validators.required, Validators.minLength(1)]]
  // });
  }

  initAlternative() {
    return this._fb.group({
        description: ['', Validators.required],
        value_type: ['']
    });
  }

  addAlternative() {
    const control = <FormArray>this.questionForm.controls['alternatives'];
    control.push(this.initAlternative());
  }

  removeAlternative(i: number) {
    const control = <FormArray>this.questionForm.controls['alternatives'];
    control.removeAt(i);
  }

}
