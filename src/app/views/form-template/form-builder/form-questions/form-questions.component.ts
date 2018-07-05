import { QuestionFormBuilder } from './../../../../models/questionFormBuilder';
import { FormBuilderComponent } from './../form-builder.component';
import { Question } from './../../../../models/question';
import { AlternativeFormBuilder } from './../../../../models/alternativeFormBuilder';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormBuilderM } from '../../../../models/formbuilder-m';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.css']
})
export class FormQuestionsComponent implements OnInit, OnChanges {

  _form: FormBuilderM;
  _parentQuestion: FormGroup;
  @Input() formSubmitAttempt: boolean;

  @Input() set parentQuestion(y: FormGroup) {
    this._parentQuestion = y;
  }

  get parentQuestion(): FormGroup {
    return this._parentQuestion;
  }

  @Input() set form(v: FormBuilderM) {
    this._form = v;
  }

  get form(): FormBuilderM {
    return this._form;
  }

  // @Input() formBuilder;

  constructor(public _fb: FormBuilder) { }

  ngOnInit() {
    const urlId = localStorage.getItem('formBuilderId');
    if (!urlId || urlId === '') {
       this.addQuestion();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rebuildForm();
    if (changes.parentQuestion) {
      this.form.questions = this.parentQuestion.controls['questions'].value;
    }

    this.parentQuestion.controls['questions'].valueChanges.subscribe((value) => {
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        if (value[i].type === 'DISSERTATIVE' || value[i].type === 'DATE') {
          this.form.questions = value;
        } else {
          this.form.questions = value;
        }
      }
    });
  }

  rebuildForm() {
    if (!this.form || !this.parentQuestion) {
      return;
    }
    this.form.questions = this.form.questions || new Array();
    this.setQuestion(this.form.questions);
  }

  get questions(): FormArray {
    return this.parentQuestion.get('questions') as FormArray;
  }

initQuestion(q: QuestionFormBuilder) {
    return this._fb.group({
        id: [q.id],
        description: [q.description, Validators.required],
        type: [q.type, Validators.required],
        value_type: [q.value_type, Validators.required],
        required: q.required,
        alternatives: this._fb.array(
          (q.alternatives || []).map( s => this.initAlternative(s))
      )
    });
  }

  initAlternative(a: AlternativeFormBuilder) {
    return this._fb.group({
        id: [a.id],
        description: [a.description, Validators.required],
        value_type: [a.value_type, Validators.required]
    });
  }

  setQuestion(question: QuestionFormBuilder[]) {
    const questionFGs = question.map(p => this.initQuestion(p));
    const questionFormArray = this._fb.array(questionFGs);
    this.parentQuestion.setControl('questions', questionFormArray);
  }

  addQuestion() {
    this.form.questions.push(new QuestionFormBuilder());
    this.questions.push(this.initQuestion(new QuestionFormBuilder()));
  }

  removeQuestion(id: number): void {
    if (id === 0) {
    } else {
      this.form.questions.splice(id, 1);
      this.questions.removeAt(id);
    }
  }

  addAlternative(question: FormGroup |any, i) {
    this.form.questions[i].alternatives = this.form.questions[i].alternatives || new Array();
    this.form.questions[i].alternatives.push(new AlternativeFormBuilder());
    question.controls.alternatives.push(this.initAlternative(new AlternativeFormBuilder()));
  }

  removeAlternative(question: FormGroup |any, i, a): void {
    if (a === 0) {
    } else {
      this.form.questions[i].alternatives.splice(a, 1);
      question.controls.alternatives.removeAt(a);
    }
  }

  verifyValidSubmitted(form, field) {
    if (field !== null) {
      return (form.controls[field].dirty || form.controls[field].touched || this.formSubmitAttempt ) && !form.controls[field].valid;
    }
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }

  verifyValidSubmittedAlternatives(field) {
    if (field !== null) {
      return (field.dirty || field.touched || this.formSubmitAttempt ) && !field.valid;
    }
  }

  applyCssErrorAlternatives(field) {
    return {
      'has-error': this.verifyValidSubmittedAlternatives(field),
      'has-feedback': this.verifyValidSubmittedAlternatives(field)
    };
  }
}
