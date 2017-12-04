import { Component, OnInit, Input } from '@angular/core';
import { TemplateItem } from '../../../models/templateItem';

@Component({
  selector: 'app-template-collect-data-item',
  templateUrl: './template-collect-data-item.component.html',
  styleUrls: ['./template-collect-data-item.component.css']
})
export class TemplateCollectDataItemComponent implements OnInit {

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
