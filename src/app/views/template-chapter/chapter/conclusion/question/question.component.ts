import { Constant } from './../../../../../constant/constant';
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
  @Input() private index: number;
  private indexEdit: number;

  private limit = Constant.LIMIT_CHARACTERS;
  private characters =  this.limit;
  private fieldEditor: string[] = new Array();
  private validEditor: boolean;

  public editorOptions = {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }]
      ]
    },
    placeholder: '',
    theme: 'snow'
  };

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) {
    this.index = 0;
  }

  ngOnInit() {
    this.btn_cancel = false;
  }

  saveData() {
    this.question.conclusion_id = this.conclusion.id;
    this.verifyEditor();
    if (this.validEditor) {
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
  }

  public verifyEditor() {
    this.validEditor = true;
    for (let i = 0; i < this.fieldEditor.length; i++) {
      if (this.fieldEditor[i] === '') {
        this.validEditor = false;
        break;
      }
    }
  }

  load(question_id) {
    this.conclusionService.loadQuestion(question_id).subscribe(
      success => {
        this.paginate = success;
          this.question = this.paginate.content[0];
          this.isNewData = false;
          this.indexEdit = Number(localStorage.getItem('questionIndex'));
          this.answer.getAnswers();
          if (this.question === undefined) {
            this.question = new Question();
          }
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  onCancel() {
    this.btn_cancel = true;
  }

  onCancelAddAnswer(event) {
    if (event) {
      this.cancel.emit(true);
      this.question = new Question();
      this.isNewData = true;
    }
  }

  verifyValidSubmitted(form, field) {
    return (field.dirty || field.touched || form.submitted) && !field.valid;
  }

  applyCssError(form, field, position) {
    return {
      'has-error': this.verifyValidSubmitted(form, field) || this.verifyValidSubmittedEditor(form, field, position),
      'has-feedback': this.verifyValidSubmitted(form, field) || this.verifyValidSubmittedEditor(form, field, position)
    };
  }

  verifyValidSubmittedEditor(form, field, position?) {
    return this.fieldEditor[position] === '' && (form.submitted || field.dirty || field.touched);
  }

  onKey(event, position) {
    this.fieldEditor[position] = event.text.trim();
    this.characters = (this.limit - event.editor.getLength()) + 1;
    if (event.editor.getLength() - 1 > this.limit) {
      event.editor.deleteText(this.limit, event.editor.getLength());
      event.editor.update();
    }
  }

}
