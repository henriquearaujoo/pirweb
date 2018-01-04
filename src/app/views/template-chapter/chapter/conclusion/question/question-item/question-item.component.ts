import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../../../../models/paginate';
import { Answer } from './../../../../../../models/answer';
import { ToastService } from './../../../../../../services/toast-notification/toast.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { Question } from '../../../../../../models/question';
import { ConclusionService } from '../../../../../../services/conclusion/conclusion.service';
import { AnswerListComponent } from '../answer-list/answer-list.component';
import { Subscriber } from 'rxjs/Subscriber';
@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css',
  '../../../../../../../../node_modules/materialize-css/dist/css/materialize.min.css']
})
export class QuestionItemComponent implements OnInit, OnChanges {

  @Input() private question: Question;
  @Input() private index: string;
  @Output() private isEdit = new EventEmitter<boolean>();
  @Output() private isDelete = new EventEmitter<boolean>();
  private hasdata: boolean;
  private answers: Answer[] = new Array();
  private answers1: Answer[] = new Array();
  private paginate: Paginate = new Paginate();
  private ans: any[] = Array();
  @ViewChild('answer')
  answer: AnswerListComponent;
  subscription: Subscription;
  private i: number;

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) {
    this.question = new Question();
    this.i = 1;
  }

  ngOnInit() {
    this.answers = new Array();
    this.paginate = new Paginate();
    this.getAnswers();
    // this.answer.getAnswers();
  }

  ngOnChanges() {
    this.getAnswers();
  }

  onEdit() {
   localStorage.setItem('questionId', this.question.id);
   this.isEdit.emit(true);
   }

   getAnswers() {
     console.log('ANSWERS1:', this.answers);
     console.log('question.id:', this.question.id);
     this.conclusionService.getAnswer(this.question.id).subscribe(
       success => {
        //  this.paginate = success;
        //  this.answers = this.paginate.content;
         this.answers = success;
         this.i = 1;
         this.answers.forEach( el => {
          el.number = this.i ++;
        });
         console.log('ANSWERS2:', this.answers);
       },
       error => {
          console.log(error);
       }
     );
   }


  //  loadAnwser(ans: any[]) {
  //   this.ans = ans;
  //   console.log('ANSWERS1:', this.answers);
  //   (<HTMLButtonElement>document.getElementById('btnModal')).click();
  //  }

   loadAnwser(question: Question) {
     this.answers1 = new Array();
    localStorage.setItem('question1', question.id );
    console.log('question1:', localStorage.getItem('question1'));
    this.subscription = this.conclusionService.getAnswer(localStorage.getItem('question1')).subscribe(
      success => {
        this.answers1 = success;
        localStorage.removeItem('question1');
        console.log('ANSWERS2:', this.answers1);
      },
      error => {
         console.log(error);
      }
    );
   }

   close() {
    this.subscription.unsubscribe();
    this.answers1 = new Array();
    console.log('unsubscribe');
   }

   onDelete() {
     console.log('Delete!');
    this.conclusionService.deleteQuestion(this.question.id).subscribe(
      success => {
        this.toastService.toastMsg('Sucesso', 'Informações excluídas com sucesso');
        this.isDelete.emit(true);
      },
      error => console.log(error)
    );
   }

}
