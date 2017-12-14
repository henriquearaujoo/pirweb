import { Chapter } from './../../models/chapter';
import { Router } from '@angular/router';
import { TemplateItem } from './../../models/templateItem';
import { Component, OnInit } from '@angular/core';
import { TemplateChapterItemComponent } from './template-chapter-item/template-chapter-item.component';
import { ChapterService } from '../../services/chapter/chapter.service';
import { error } from 'util';
import { Paginate } from '../../models/paginate';

@Component({
  selector: 'app-template-chapter',
  templateUrl: './template-chapter.component.html',
  styleUrls: ['./template-chapter.component.css']
})
export class TemplateChapterComponent implements OnInit {

  templates: TemplateItem[] = new Array();
  private paginate: Paginate = new Paginate();
  private paginate_active: Paginate = new Paginate();
  private paginate_inactive: Paginate = new Paginate();
  private chapters: Chapter[] = new Array();
  private chapters_active: Chapter[] = new Array();
  private chapters_inactive: Chapter[] = new Array();
  hasdata: boolean;
  filter: any = {name: ''};
  private page: number;
  private size: number;
  private size_active: number;
  private size_inactive: number;

  constructor(
    private router: Router,
    private chapterService: ChapterService
  ) {
      this.hasdata = false;
      this.page = 0;
      this.size = 1;
      this.size_active = 1;
      this.size_inactive = 1;

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
    this.getChapterActive();
    this.getChapterInactive();
  }

  getChapters() {
    if ( this.filter.name == null) {
      this.filter.name = '';
    }
    this.chapterService.getChapters(this.filter.name, this.size).subscribe(
      success => {
        this.paginate = success;
        console.log('Paginate:', this.paginate);
        this.chapters = this.paginate.content;
        this.hasdata = true;
        console.log('CHAPTERS', this.chapters);
      },
      error => {
        console.log('ERROR', error);
        this.hasdata = false;
      }
    );
  }

  getChapterActive() {
    this.chapterService.getChapterStatus(this.filter.name, true, this.size_active).subscribe(
      success => {
        this.paginate_active = success;
        this.chapters_active = this.paginate_active.content;
        this.hasdata = true;
        console.log('ACTIVES CHAPTERS', this.chapters_active);
      },
      error => {
        console.log('ERROR', error);
        this.hasdata = false;
      }
    );
  }

  getChapterInactive() {
    this.chapterService.getChapterStatus(this.filter.name, false, this.size_inactive).subscribe(
      success => {
        this.paginate_inactive = success;
        this.chapters_inactive = this.paginate_inactive.content;
        this.hasdata = true;
        console.log('INACTIVE CHAPTERS', this.chapters_inactive);
      },
      error => {
        console.log('ERROR', error);
        this.hasdata = false;
      }
    );
  }

  setPage() {
    // this.page++;
    this.size = this.size + 1 ;
    this.getChapters();
  }

  setPageChapterActive() {
    // this.page++;
    this.size_active = this.size_active + 1 ;
    this.getChapterActive();
  }

  setPageChapterInactive() {
    // this.page++;
    this.size_inactive = this.size_inactive + 1 ;
    this.getChapterInactive();
  }

  createNewChapter() {
    this.router.navigate(['chapter-dashboard']);
  }

  setChapter(chapter: Chapter) {
    this.chapterService.setChapter(chapter);
    // this.router.navigate(['chapter-details']);
  }
}
