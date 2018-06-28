import { AlternativeFormBuilder } from './../../../../../models/alternativeFormBuilder';
import { FormBuilderM } from './../../../../../models/formbuilder-m';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form-alternative',
  templateUrl: './form-alternative.component.html',
  styleUrls: ['./form-alternative.component.css']
})
export class FormAlternativeComponent implements OnInit, OnChanges {

  _form: FormBuilderM;
  _parentAlternative: FormGroup;

  @Input() set parentAlternative(y: FormGroup) {
    this._parentAlternative = y;
  }

  get parentAlternative(): FormGroup {
    return this._parentAlternative;
  }

  @Input() set form(v: FormBuilderM) {
    this._form = v;
  }

  get form(): FormBuilderM {
    return this._form;
  }

  @Input() formBuilder;
  // private questions: QuestionFormBuilder = new QuestionFormBuilder;

  constructor(public _fb: FormBuilder) { }

  ngOnInit() {
    // this.addAlternative();
  }

  ngOnChanges() {
    // this.rebuildForm();
  }

  rebuildForm() {
    if (!this.form || !this.parentAlternative) {
      return;
    }
    this.form.questions[0].alternatives = this.form.questions[0].alternatives || new Array();
    this.setAlternative(this.form.questions[0].alternatives);
  }

  get alternatives(): FormArray {
    return this.parentAlternative.get('alternatives') as FormArray;
  }

  initAlternative(a: AlternativeFormBuilder) {
    return this._fb.group({
        id: [a.id],
        description: [a.description, Validators.required],
        value_type: [a.value_type]
    });
  }

  setAlternative(alternative: AlternativeFormBuilder[]) {
    const alternativeFGs = alternative.map(a => this.initAlternative(a));
    const alternativeFormArray = this._fb.array(alternativeFGs);
    this.parentAlternative.setControl('alternatives', alternativeFormArray);
  }

  addAlternative() {
    this.alternatives.push(this._fb.group(new AlternativeFormBuilder()));
  }

  removeAlternative(id: number): void {
    if (id === 0) {
    } else { this.alternatives.removeAt(id); }
  }
}
