import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {
    this.question = new Question();
  }

  ngOnInit() {
  }

}
