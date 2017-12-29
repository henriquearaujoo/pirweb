import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../../../models/question';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css',
  '../../../../../../../../node_modules/materialize-css/dist/css/materialize.min.css']
})
export class QuestionItemComponent implements OnInit {

  @Input() private question: Question;
  @Input() private index: string;
  @Output() private isEdit = new EventEmitter<boolean>();

  constructor() {
    this.question = new Question();
  }

  ngOnInit() {
  }

  onEdit() {
   localStorage.setItem('questionId', this.question.id);
   this.isEdit.emit(true);
   }

   onDelete() {
     console.log('Delete!');
   }

}
