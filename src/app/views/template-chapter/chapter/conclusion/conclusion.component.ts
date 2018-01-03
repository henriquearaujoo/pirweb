import { Component, OnInit } from '@angular/core';
import { Conclusion } from '../../../../models/conclusion';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {

  constructor() { }
  private conclusion: Conclusion;
  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  ngOnInit() {
    this.conclusion = new Conclusion();
  }

}
