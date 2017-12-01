import { Component, OnInit, Input } from '@angular/core';
import { TemplateItem } from '../../../models/templateItem';

@Component({
  selector: 'app-template-form-item',
  templateUrl: './template-form-item.component.html',
  styleUrls: ['./template-form-item.component.css']
})
export class TemplateFormItemComponent implements OnInit {

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
