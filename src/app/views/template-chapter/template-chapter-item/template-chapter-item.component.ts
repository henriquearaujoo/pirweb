import { TemplateItem } from './../../../models/templateItem';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Chapter } from '../../../models/chapter';

@Component({
  selector: 'app-template-chapter-item',
  templateUrl: './template-chapter-item.component.html',
  styleUrls: ['./template-chapter-item.component.css']
})
export class TemplateChapterItemComponent implements OnInit {

  // @Input() templateItem: TemplateItem;
  @Input() chapter: Chapter;

  // id: number;
  // title: string;
  // describe: string;
  // subdescribe: string;
  // imgSource: string;

  constructor() {
    // this.imgSource = 'https://avatars2.githubusercontent.com/u/139426?s=400&v=4';
   }

  ngOnInit() {
    // this.id = this.templateItem.id;
    // this.title = this.templateItem.title;
    // this.describe = this.templateItem.description;
   }

   public updateTemplate() {
      console.log(this.chapter.id);
   }

   public disableTemplate() {
    console.log(this.chapter.id);
   }
   public removeTemplate() {
      console.log(this.chapter.id);
   }
}
