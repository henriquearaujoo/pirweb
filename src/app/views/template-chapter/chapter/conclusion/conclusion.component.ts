import { Constant } from './../../../../constant/constant';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { Question } from './../../../../models/question';
import { error } from 'util';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Conclusion } from '../../../../models/conclusion';
import { ConclusionService } from '../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import { QuestionComponent } from './question/question.component';
import { Paginate } from '../../../../models/paginate';
import { Answer } from '../../../../models/answer';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {
  private tasks = new Array();

  private conclusion: Conclusion;
  public chapter: string;
  public isNewData: boolean;
  public isNewQuestion: boolean;
  @Output() cancelEvent = new EventEmitter();
  private btn_cancel: boolean;
  private btn_save: boolean;
  private add_question: boolean;
  @ViewChild('question')
  question: QuestionComponent;
  private questions: Question[] = new Array();
  private paginate: Paginate = new Paginate();
  private hasdata: boolean;
  private size: number;
  private answers: Answer[] = new Array();
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private index: number;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

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
    private permissions: Permissions
  ) {
    this.size = 5;
    this.index = 0;
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate('/chapter-dashboard');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.conclusion = new Conclusion();
    this.btn_cancel = false;
    this.btn_save = false;
    this.add_question = false;
    this.isNewQuestion = false;
    this.hasdata = false;
  }

  saveData() {
    if (this.btn_cancel) {
      this.btn_cancel = false;
      return false;
    }
    if (this.btn_save) {
      this.conclusion.chapter = this.chapter;
      if (this.isNewData || this.conclusion.id === undefined) {
        this.conclusionService.insert(this.conclusion).subscribe(
          s => {
            this.isNewData  = false;
            this.index = 0;
            this.conclusion = s;
            this.hasdata = true;
            this.btn_save = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
            console.log('saved with success!', this.conclusion);
          },
          error => {
            if ( error[0] === 'chapter.conclusion.chapter.missing') {
              this.toastService.toastErrorChapterId();
            } else {
              this.toastService.toastError();
            }
            console.log('error save: ', error);
          }
        );
      } else {
        this.conclusionService.update(this.conclusion).subscribe(
          s => {
            this.conclusion = s;
            this.hasdata = true;
            this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso');
            console.log('updated with success!', this.conclusion);
          },
          error => {
            if ( error[0] === 'chapter.conclusion.chapter.missing') {
              this.toastService.toastErrorChapterId();
            } else {
              this.toastService.toastError();
            }
            console.log('error update: ', error);
          }
        );
      }
    }

  }

  load(chapter) {
    this.chapter = chapter;
    this.conclusionService.load(chapter).subscribe(
      success => {
          this.conclusion = success[0];
          this.getQuestions();
          this.hasdata = true;
          console.log('Load Conclusion!', this.conclusion);
          console.log('Load:', this.conclusion);
          if (this.conclusion === undefined) {
            this.conclusion = new Conclusion();
            this.hasdata = false;
          }
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  getQuestions() {
    if ( this.conclusion !== undefined) {
      this.conclusionService.getQuestion(this.conclusion.id, this.size).subscribe(
        success => {
          this.paginate = success;
          this.questions = this.paginate.content;
          console.log('CONCLUSION:', this.conclusion.id);
          console.log('QUESTIONS PAGINATE:', this.paginate);
        },
        error => console.log(error)
      );
    }
  }

  getAnswers(question: Question) {
    console.log('question.id:', question);
    this.conclusionService.getAnswer(question.id).subscribe(
      success => {
       //  this.paginate = success;
       //  this.answers = this.paginate.content;
        this.answers = success;
        console.log('ANSWERS2:', this.answers);
      },
      error => {
         console.log(error);
      }
    );
  }

  createNewQuestion() {
    this.getQuestions();
    this.add_question = true;
    this.isNewQuestion = true;
    if (this.paginate.totalElements !== undefined) {
      console.log('paginate1:', this.paginate.totalElements);
      this.index = this.paginate.totalElements + 1;
    } else {
      console.log('paginate2:', this.paginate.totalElements);
      this.index = 1;
    }
  }

  onEdit(question: Question, index) {
    localStorage.setItem('questionId', question.id);
    index = index + 1;
    localStorage.setItem('questionIndex', index);
    this.add_question = true;
    // const q = localStorage.getItem('questionId');
    // console.log('CONCLUSION: onEdit()questionId', q);
    this.question.load(question.id);
  }

  onDelete(question: Question) {
    console.log('Delete!');
    this.conclusionService.deleteQuestion(question.id).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.getQuestions();
      },
      error => {
        this.toastService.toastError();
        console.log(error);
      }
    );
  }

  onCancel() {
    this.cancelEvent.emit();
    this.btn_cancel = true;
  }

  onSave() {
    this.btn_save = true;
  }

  onCancelAddAnswer(event) {
    if (event) {
      this.add_question = false;
      if (this.chapter !== undefined) {
        this.load(this.chapter);
      }
    }
  }

  setPageQuestion() {
    this.size = this.size + 5 ;
    this.getQuestions();
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
