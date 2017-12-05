import { TemplateItem } from './../../../models/templateItem';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Chapter } from '../../../models/chapter';
import { Router } from '@angular/router';
import { ChapterService } from '../../../services/chapter/chapter.service';

@Component({
  selector: 'app-template-chapter-item',
  templateUrl: './template-chapter-item.component.html',
  styleUrls: ['./template-chapter-item.component.css']
})
export class TemplateChapterItemComponent implements OnInit {

  @Input() chapter: Chapter;

  constructor(
    private router: Router,
    private chapterService: ChapterService
  ) {
   }

  ngOnInit() {
   }

   public editChapter() {
     this.chapterService.setChapter(this.chapter);
      this.router.navigate(['chapter-edit']);
     // location.reload();
   }

   public disableTemplate() {
    console.log(this.chapter.id);
   }
   public removeTemplate() {
      console.log(this.chapter.id);
   }
}
