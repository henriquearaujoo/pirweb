import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.css']
})
export class NewTemplateComponent implements OnInit {

  @Input() value: boolean;
  template: number;
  constructor() { }

  ngOnInit() { }

}
