import { TemplateItem } from './../../../models/templateItem';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.css']
})
export class TemplateItemComponent implements OnInit {

  @Input() templateItem: TemplateItem;

  id: number;
  title: string;
  describe: string;
  subdescribe: string;
  imgSource: string;

  constructor() {
    this.imgSource = 'https://avatars2.githubusercontent.com/u/139426?s=400&v=4';
   }

  ngOnInit() {
    this.id = this.templateItem.id;
    this.title = this.templateItem.title;
    this.describe = this.templateItem.description;
   }

   public updateTemplate() {
     console.log(this.id);
   }

   public removeTemplate() {
     console.log(this.id);
   }
}
