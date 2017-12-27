import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Question } from '../../../../../models/question';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  private question: Question = new Question();
  @Output() private cancel = new EventEmitter<boolean>();
  private btn_cancel: boolean;
  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  constructor() { }

  ngOnInit() {
    this.btn_cancel = false;
  }

  onCancel() {
    this.cancel.emit(true);
    this.btn_cancel = true;
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
