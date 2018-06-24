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
  public myForm: FormGroup;
  private _formbuilder: FormBuilderM = new FormBuilderM();

  constructor(
    private _fb: FormBuilder,
    private formService: FormBuilderService) { }

  ngOnInit() {
    this.urlId = localStorage.getItem('formBuilderId');
    if (this.urlId !== null && this.urlId !== '') {
      this.load();
      this.myForm = this._fb.group({
        title: [this._formbuilder.title, [Validators.required, Validators.minLength(5)]],
        description: [this._formbuilder.description, [Validators.required, Validators.minLength(5)]],
        questions: this._fb.array([
            this.initQuestion(),
        ])
      });
    }
    
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.myForm.reset({
      title: this._formbuilder.description,
      description: this._formbuilder.description
    });
    this.setQuestions(this._formbuilder.questions);
  }

  setQuestions(questions: QuestionFormBuilder[]) {
    const questionFGs = questions.map(question => this._fb.group(question));
    const questionFormArray = this._fb.array(questionFGs);
    this.myForm.setControl('questions', questionFormArray);
  }

  initQuestion() {
    return this._fb.group({
        description: ['', Validators.required],
        type: [''],
        value_type: [''],
        mandatory: false,
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

load() {
  this.formService.load(this.urlId).subscribe(
    s => {
      this._formbuilder = s;
      this.rebuildForm();
      console.log(this._formbuilder);
    }
  )

}
}
