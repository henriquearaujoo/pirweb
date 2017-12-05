import { Chapter } from './../../models/chapter';
import { Router } from '@angular/router';
import { TemplateItem } from './../../models/templateItem';
import { Component, OnInit } from '@angular/core';
import { TemplateChapterItemComponent } from './template-chapter-item/template-chapter-item.component';
import { ChapterService } from '../../services/chapter/chapter.service';
import { error } from 'util';

@Component({
  selector: 'app-template-chapter',
  templateUrl: './template-chapter.component.html',
  styleUrls: ['./template-chapter.component.css']
})
export class TemplateChapterComponent implements OnInit {

  templates: TemplateItem[] = new Array();
  chapters: Chapter[] = new Array();
  hasdata: boolean;

  constructor(
    private router: Router,
    private chapterService: ChapterService
  ) {
      this.hasdata = false;
  }

  ngOnInit() {
    for (let i = 0 ; i < 5 ; i++) {
      const t = new TemplateItem();
      t.description = 'description test:' + i;
      t.title = 'title test';
      t.content = 'content test';
      t.id = i;
      this.templates.push(t);
    }
    this.hasdata = false;
    this.getChapters();
  }

  getChapters() {
    this.chapterService.getChapters().subscribe(
      success => {
        this.chapters = success;
        this.hasdata = true;
        console.log(this.chapters);
      },
      error => {
        console.log(error);
        this.hasdata = false;
      }
    );

  }
  createNewChapter() {
    // this.router.navigate(['chapterInformation']);
  }

  setChapter(chapter: Chapter) {
    this.chapterService.setChapter(chapter);
    this.router.navigate(['chapter-details']);
  }
}
