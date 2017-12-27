import { Answer } from './../../../../../../models/answer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {

  private answer: Answer = new Answer();
  private answers: Answer[] = new Array();
  private tasks = new Array();

  constructor() {
      this.tasks = ['Resposta 1', 'Resposta 2', 'Resposta 3'];
  }

  ngOnInit() {
  }

}
