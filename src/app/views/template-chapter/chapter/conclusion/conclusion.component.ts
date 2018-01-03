import { Question } from './../../../../models/question';
import { error } from 'util';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Conclusion } from '../../../../models/conclusion';
import { ConclusionService } from '../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import { QuestionComponent } from './question/question.component';
import { Paginate } from '../../../../models/paginate';

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

  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) {
    this.size = 1;
   }

  ngOnInit() {
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
            this.conclusion = s;
            this.hasdata = true;
            this.btn_save = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
            console.log('saved with success!', this.conclusion);
          },
          e => {
            this.toastService.toastError();
            console.log('error save: ' + e);
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
          e => {
            this.toastService.toastError();
            console.log('error update: ' + e);
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
          console.log('QUESTIONS:', this.questions);
        },
        error => console.log(error)
      );
    }
  }

  createNewQuestion() {
    this.add_question = true;
    this.isNewQuestion = true;
  }

  onEdit(event) {
    if (event) {
      this.add_question = true;
      const q = localStorage.getItem('questionId');
      console.log('CONCLUSION: onEdit()questionId', q);
      this.question.load(q);
    }
  }

  onDelete(event) {
    if (event) {
      this.getQuestions();
    }
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
    this.size = this.size + 1 ;
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
}
