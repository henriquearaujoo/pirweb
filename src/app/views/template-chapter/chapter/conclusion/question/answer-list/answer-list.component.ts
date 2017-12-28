import { Answer } from './../../../../../../models/answer';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConclusionService } from '../../../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../../../services/toast-notification/toast.service';
import { Paginate } from '../../../../../../models/paginate';
import { Question } from '../../../../../../models/question';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {

  private paginate: Paginate = new Paginate();
  private answer: Answer = new Answer();
  private answers: Answer[] = new Array();
  private tasks = new Array();
  @Output() private cancel = new EventEmitter<boolean>();
  @Input() private question: Question;
  private btn_cancel: boolean;

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) {
      this.tasks = ['Resposta 1', 'Resposta 2', 'Resposta 3'];
  }

  ngOnInit() {
    this.btn_cancel = false;
  }

  getAnswers() {
    this.conclusionService.getAnswer().subscribe(
      success => {
        this.paginate = success;
        this.answers = this.paginate.content;
      },
      error => console.log(error)
    );
  }

  saveData() {
    this.answer.for_question = this.question.id;
    this.conclusionService.insertAnswer(this.answer).subscribe(
      success => {
        this.toastService.toastSuccess();
      },
      error => console.log(error)
    );
  }

  onCancel() {
    this.cancel.emit(true);
    this.btn_cancel = true;
  }
}
