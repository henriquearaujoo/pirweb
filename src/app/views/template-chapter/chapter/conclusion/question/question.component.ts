import { error } from 'util';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Question } from '../../../../../models/question';
import { ConclusionService } from '../../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../../services/toast-notification/toast.service';
import { Conclusion } from '../../../../../models/conclusion';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() private conclusion: Conclusion;
  private question: Question = new Question();
  private questions: Question[] = new Array();
  @Output() private cancel = new EventEmitter<boolean>();
  private btn_cancel: boolean;
  private add_question: boolean;
  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  constructor(
    private conclusionService: ConclusionService,
    private toastSerivce: ToastService
  ) { }

  ngOnInit() {
    this.btn_cancel = false;
  }

  saveData() {
    this.question.for_conclusion = this.conclusion.id;
    this.conclusionService.insertQuestion(this.question).subscribe(
      success => {
        this.question = success;
        this.toastSerivce.toastSuccess();
      },
      error => console.log(error)
    );
  }

  onCancel() {
    this.btn_cancel = true;
  }

  onCancelAddAnswer(event) {
    if (event) {
      this.cancel.emit(true);
    }
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
