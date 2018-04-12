import { Constant } from './../../../../../../constant/constant';
import { PagenateComponent } from './../../../../../../components/pagenate/pagenate.component';
import { Paginate } from '../../../../../../models/paginate';
import { Answer } from './../../../../../../models/answer';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ConclusionService } from '../../../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../../../services/toast-notification/toast.service';
import { Question } from '../../../../../../models/question';
import { PageService } from '../../../../../../services/pagenate/page.service';
import { PaginateComponent } from '../../../../../../components/paginate/paginate.component';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent extends PagenateComponent implements OnInit {

  private answer: Answer = new Answer();
  private answerEdit: Answer = new Answer();
  private answers: Answer[] = new Array();
  private tasks = new Array();
  @Output() private cancel = new EventEmitter<boolean>();
  @Input() private question: Question;
  private btn_cancel: boolean;
  public isNewData: boolean;
  private show: boolean;
  page: number;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private index: number;
  private paginate: Paginate = new Paginate();

  private limit = Constant.LIMIT_CHARACTERS;
  private characters =  this.limit;

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
    private toastService: ToastService,
    private servicePage: PageService,
  ) {
    super(servicePage);
    this.index = 1;
  }

  ngOnInit() {
    this.btn_cancel = false;
    this.show = false;
    this.allItems = [];
  }

  getAnswers() {
    this.question.id = localStorage.getItem('questionId');
    this.conclusionService.getAnswer(this.question.id).subscribe(
      success => {
        this.answers = success;
        this.index = 1;
        this.answers.forEach( el => {
          el.number = this.index ++;
        });
        this.pagedItems = this.answers;
        this.allItems = this.answers;
        this.setPage(1);
      },
      error => console.log(error)
    );
  }

  saveData() {
    console.log('answer', this.answer);
    if ((this.answer.answer === null || this.answer.answer === undefined) &&
        (this.answer.type === null || this.answer.type === undefined) ) {
      this.toastService.toastMsgError('Erro', 'Descrição da resposta é um campo obrigatório!');
      this.toastService.toastMsgError('Erro', 'Tipo da resposta é um campo obrigatório!');
      this.getAnswers();
      return false;
    } else if (this.answer.answer === null || this.answer.answer === undefined) {
      this.toastService.toastMsgError('Erro', 'Descrição da resposta é um campo obrigatório!');
      this.getAnswers();
      return false;
    } else if (this.answer.type === null || this.answer.type === undefined) {
      this.toastService.toastMsgError('Erro', 'Tipo da resposta é um campo obrigatório!');
      this.getAnswers();
      return false;
    }
    if (this.isNewData || this.answer.id === undefined) {
      this.answer.question_id = this.question.id;
      this.conclusionService.insertAnswer(this.answer).subscribe(
        success => {
          this.toastService.toastSuccess();
          this.isNewData = false;
          this.getAnswers();
        },
        error => {
          if ( error === 'answer.exists') {
            this.toastService.toastMsgWarn('Atenção', 'Resposta já está cadastrada');
          } else {
            this.toastService.toastError();
          }
          console.log('error save:', error);
        }
      );
    } else {
      if (this.answer.answer === null || this.answer.answer === undefined) {
        this.toastService.toastMsgError('Erro', 'Descrição da resposta é um campo obrigatório!');
        this.getAnswers();
        return false;
      }
      this.conclusionService.updateAnswer(this.answer).subscribe(
        success => {
          this.getAnswers();
          this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso');
        },
        error => {
          if ( error === 'answer.exists') {
            this.toastService.toastMsgWarn('Atenção', 'Resposta já está cadastrada');
          } else {
            this.toastService.toastError();
          }
          console.log('error save:', error);
        }
      );
    }

  }

  onNewAnswer() {
    this.show = false;
    this.isNewData = true;
    this.answer = new Answer();
  }

  onEdit(answer: Answer) {
    this.show = false;
    this.answer = answer;
    this.isNewData = false;
  }

  showAnswer(answer: Answer) {
    this.show = true;
    this.answer = answer;
  }

  onCancel() {
    this.cancel.emit(true);
    this.btn_cancel = true;
  }

  cancel_() {
    this.getAnswers();
  }

  setAnswer(answer: Answer) {
    this.answer = answer;
  }

  onDelete() {
   this.conclusionService.deleteAnswer(this.answer.id).subscribe(
     success => {
       this.toastService.toastSuccess();
       this.getAnswers();
     },
     error => {
       this.toastService.toastError();
       console.log(error);
      }
   );
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

  onKey(event) {
    this.characters = (this.limit - event.editor.getLength()) + 1;
    if (event.editor.getLength() - 1 > this.limit) {
      event.editor.deleteText(this.limit, event.editor.getLength());
      event.editor.update();
    }
  }
}
