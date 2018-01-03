import { Paginate } from './../../../../../../models/paginate';
import { Answer } from './../../../../../../models/answer';
import { ToastService } from './../../../../../../services/toast-notification/toast.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { Question } from '../../../../../../models/question';
import { ConclusionService } from '../../../../../../services/conclusion/conclusion.service';
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
  private paginate: Paginate = new Paginate();
  private ans: any[] = Array();

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) {
    this.question = new Question();
  }

  ngOnInit() {
    this.answers = new Array();
    this.paginate = new Paginate();
    this.getAnswers();
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
         this.paginate = success;
         this.answers = this.paginate.content;
         console.log('ANSWERS2:', this.answers);
       },
       error => {
          console.log(error);
       }
     );
   }


   loadAnwser(ans: any[]) {
    this.ans = ans;
    console.log('ANSWERS1:', this.answers);
    (<HTMLButtonElement>document.getElementById('btnModal')).click();
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
