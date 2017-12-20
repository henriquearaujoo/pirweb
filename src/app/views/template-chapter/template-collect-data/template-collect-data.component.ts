import { Component, OnInit } from '@angular/core';
import { TemplateItem } from '../../../models/templateItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-collect-data',
  templateUrl: './template-collect-data.component.html',
  styleUrls: ['./template-collect-data.component.css']
})
export class TemplateCollectDataComponent implements OnInit {

  templates: TemplateItem[] = new Array();
  constructor( private router: Router ) { }

  ngOnInit() {
    for (let i = 0 ; i < 5 ; i++) {
      const t = new TemplateItem();
      t.description = 'Questao:' + i;
      t.title = 'title test';
      t.content = 'content test';
      t.id = i;
      this.templates.push(t);
    }
  }

  createNewQuestion() {
    this.router.navigate(['/question']);
  }

}
