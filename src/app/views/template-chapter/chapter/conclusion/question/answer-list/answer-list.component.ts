import { Constant } from './../../../../../../constant/constant';
import { PagenateComponent } from './../../../../../../components/pagenate/pagenate.component';
import { Paginate } from '../../../../../../models/paginate';
import { Alternative } from './../../../../../../models/Alternative';
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

  private answer: Alternative = new Alternative();
  private answerEdit: Alternative = new Alternative();
  private answers: Alternative[] = new Array();
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
    this.conclusionService.getAlternative(this.question.id).subscribe(
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
    this.verifyEditor();
    if (this.validEditor) {
      if (this.isNewData || this.answer.id === undefined) {
        this.answer.question_id = this.question.id;
        this.conclusionService.insertAlternative(this.answer).subscribe(
          success => {
            this.toastService.toastSuccess();
            this.isNewData = false;
            this.getAnswers();
          },
          error => {
            this.verifyError(error);
          }
        );
      } else {
        if (this.answer.answer === null || this.answer.answer === undefined) {
          this.toastService.toastMsgError('Erro', 'Descrição da resposta é um campo obrigatório!');
          this.getAnswers();
          return false;
        }
        this.conclusionService.updateAlternative(this.answer).subscribe(
          success => {
            this.getAnswers();
            this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso');
          },
          error => {
            this.verifyError(error);
          }
        );
      }
    } else {
      this.toastService.toastMsgError('Erro', 'Ação não realizada. Verifique o preenchimento de todos os campos!');
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

  public verifyError(error) {
    if (error.length < 3) {
      for (let i = 0; i < error.length; i++) {
        if (error[i] === 'answer.missing') {
          this.toastService.toastMsgWarn('Atenção', 'Descrição da resposta é um campo obrigatório!');
        }
        if (error[i] === 'type.missing') {
          this.toastService.toastMsgWarn('Atenção', 'Tipo da resposta é um campo obrigatório!');
        }
      }
    } else {
      if ( error === 'answer.found') {
        this.toastService.toastMsgWarn('Atenção', 'Resposta já está cadastrada');
      } else {
        this.toastService.toastError();
      }
    }

  }

  onNewAnswer() {
    this.show = false;
    this.isNewData = true;
    this.answer = new Alternative();
  }

  onEdit(answer: Alternative) {
    this.show = false;
    this.answer = answer;
    this.isNewData = false;
  }

  showAnswer(answer: Alternative) {
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

  setAnswer(answer: Alternative) {
    this.answer = answer;
  }

  onDelete() {
   this.conclusionService.deleteAlternative(this.answer.id).subscribe(
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
    return (field.dirty || field.touched || form.submitted) && !field.valid;
  }

  applyCssError(form, field, position?) {
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
