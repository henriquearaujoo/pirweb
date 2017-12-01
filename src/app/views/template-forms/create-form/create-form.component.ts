import { Component, OnInit } from '@angular/core';
import { TemplateItem } from '../../../models/templateItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

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

  selectModel() {
    this.router.navigate(['selectModel']);
  }

}
