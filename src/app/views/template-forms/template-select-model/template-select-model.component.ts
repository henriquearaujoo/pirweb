import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-select-model',
  templateUrl: './template-select-model.component.html',
  styleUrls: ['./template-select-model.component.css']
})
export class TemplateSelectModelComponent implements OnInit {

  constructor() { }
  @Input() value: boolean;
  template: number;

  ngOnInit() {
  }

}
