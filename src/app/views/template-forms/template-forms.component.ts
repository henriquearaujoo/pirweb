import { Router } from '@angular/router';
import { TemplateItem } from './../../models/templateItem';
import { Component, OnInit } from '@angular/core';
import { TemplateItemComponent } from './template-item/template-item.component';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})
export class TemplateFormsComponent implements OnInit {

  templates: TemplateItem[] = new Array();

  constructor(private router: Router) { }

  ngOnInit() {
    for (let i = 0 ; i < 10 ; i++) {
      const t = new TemplateItem();
      t.description = 'title' + i;
      t.title = 'title test';
      t.content = 'content test';
      t.id = i;
      this.templates.push(t);
    }
  }

  createNewForm() {
    this.router.navigate(['selectModel']);
  }
}
