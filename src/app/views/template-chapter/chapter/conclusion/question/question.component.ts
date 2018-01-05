import { error } from 'util';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Question } from '../../../../../models/question';
import { ConclusionService } from '../../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../../services/toast-notification/toast.service';
import { Conclusion } from '../../../../../models/conclusion';
import { Paginate } from '../../../../../models/paginate';
import { AnswerListComponent } from './answer-list/answer-list.component';
import index from 'quill';
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
  @Input() private addQuestion: boolean;
  @Input() public isNewData: boolean;
  private paginate: Paginate = new Paginate();
  @ViewChild('answer')
  answer: AnswerListComponent;
  @Input() private index: any;
  private indexEdit: any;

  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.btn_cancel = false;
  }

  saveData() {
    this.question.for_conclusion = this.conclusion.id;
    if (this.isNewData || this.conclusion.id === undefined) {
      this.conclusionService.insertQuestion(this.question).subscribe(
        success => {
          this.question = success;
          this.isNewData  = false;
          this.indexEdit = this.index;
          localStorage.setItem('questionId', this.question.id);
          this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
        },
        error => {
          if ( error === 'question.exists') {
            this.toastService.toastMsgWarn('Atenção', 'Questão já está cadastrada');
          } else {
            this.toastService.toastError();
          }
          console.log(error);
        }
      );
     } else {
      this.conclusionService.updateQuestion(this.question).subscribe(
        s => {
          this.question = s;
          this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso');
          console.log('saved with success!', this.question);
        },
        error => {
          if ( error === 'question.exists') {
            this.toastService.toastMsgWarn('Atenção', 'Questão já está cadastrada');
          } else {
            this.toastService.toastError();
          }
          console.log('error update: ' + error);
        }
      );
    }
  }

  load(question_id) {
    this.conclusionService.loadQuestion(question_id).subscribe(
      success => {
        this.paginate = success;
          this.question = this.paginate.content[0];
          this.isNewData = false;
          this.indexEdit = localStorage.getItem('questionIndex');
          console.log('LoadQuestion:', this.question);
          this.answer.getAnswers();
          if (this.question === undefined) {
            this.question = new Question();
          }
          // localStorage.removeItem('questionId');
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  onCancel() {
    this.btn_cancel = true;
    console.log('onCancel()');
  }

  onCancelAddAnswer(event) {
    if (event) {
      this.cancel.emit(true);
      this.question = new Question();
      this.isNewData = true;
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
