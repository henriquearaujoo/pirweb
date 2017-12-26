import { Component, OnInit } from '@angular/core';
import { Conclusion } from '../../../../models/conclusion';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {

  hasdata: boolean;

  private conclusion: Conclusion;
  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  constructor() {
    this.hasdata = false;
   }

  ngOnInit() {
    this.conclusion = new Conclusion();
  }

  createNewQuestion() {

  }
}
