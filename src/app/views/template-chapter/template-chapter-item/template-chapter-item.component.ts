import { TemplateItem } from './../../../models/templateItem';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Chapter } from '../../../models/chapter';

@Component({
  selector: 'app-template-chapter-item',
  templateUrl: './template-chapter-item.component.html',
  styleUrls: ['./template-chapter-item.component.css']
})
export class TemplateChapterItemComponent implements OnInit {

  @Input() chapter: Chapter;

  constructor() {
   }

  ngOnInit() {
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
