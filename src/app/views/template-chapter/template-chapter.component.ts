import { ModalWaitingAnswerComponent } from './../../components/modal-waiting-answer/modal-waiting-answer.component';
import { Chapter } from './../../models/chapter';
import { Router } from '@angular/router';
import { TemplateItem } from './../../models/templateItem';
import { Component, OnInit, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { TemplateChapterItemComponent } from './template-chapter-item/template-chapter-item.component';
import { ChapterService } from '../../services/chapter/chapter.service';
import { error } from 'util';
import { Paginate } from '../../models/paginate';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-template-chapter',
  templateUrl: './template-chapter.component.html',
  styleUrls: ['./template-chapter.component.css']
})
export class TemplateChapterComponent implements OnInit, OnChanges {

  templates: TemplateItem[] = new Array();
  private paginate: Paginate = new Paginate();
  private paginate_active: Paginate = new Paginate();
  private paginate_inactive: Paginate = new Paginate();
  private paginate_version: Paginate = new Paginate();
  private chapters: Chapter[] = new Array();
  private chapters_active: Chapter[] = new Array();
  private chapters_inactive: Chapter[] = new Array();
  hasdata: boolean;
  filter: any = {name: ''};
  private page: number;
  private size: number;
  private size_active: number;
  private size_inactive: number;

  // @ViewChild('resquestServer')
  // resquestServer: ModalWaitingAnswerComponent;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private chapterItem: TemplateChapterItemComponent,
    private loaderService: LoaderService
  ) {
      this.hasdata = false;
      this.page = 0;
      this.size = 10;
      this.size_active = 10;
      this.size_inactive = 10;

  }

  ngOnInit() {
    // this.loaderService.show();
    this.hasdata = false;
    this.getChapters();
    this.getChapterActive();
    this.getChapterInactive();
  }

  ngOnChanges() {  }

  getChapters() {
    // this.loaderService.show();
    if ( this.filter.name == null) {
      this.filter.name = '';
    }
    this.chapterService.getChapters(this.filter.name, this.size).subscribe(
      success => {
        this.paginate = success;
        this.chapters = this.paginate.content;
        this.hasdata = true;
        // this.loaderService.hide();

        const hash = {};
        this.chapters = this.chapters.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });
      },
      error => {
        console.log('ERROR', error);
        this.hasdata = false;
      }
    );
  }

  getChapterActive() {
    this.chapterService.getChapterActive(this.filter.name, this.size_active).subscribe(
      success => {
        this.paginate_active = success;
        this.chapters_active = this.paginate_active.content;
        this.hasdata = true;
        // Remove duplicates chapters
        const hash = {};
        this.chapters_active = this.chapters_active.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });
      },
      error => {
        console.log('ERROR', error);
        this.hasdata = false;
      }
    );
  }

  getChapterInactive() {
    this.chapterService.getChapterInactive(this.filter.name, this.size_inactive).subscribe(
      success => {
        this.paginate_inactive = success;
        this.chapters_inactive = this.paginate_inactive.content;
        this.hasdata = true;
        // Remove duplicates chapters
        const hash = {};
        this.chapters_inactive = this.chapters_inactive.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });
      },
      error => {
        console.log('ERROR', error);
        this.hasdata = false;
      }
    );
  }

  setPage() {
    // this.page++;
    this.size = this.size + 10 ;
    this.getChapters();
  }

  setPageChapterActive() {
    // this.page++;
    this.size_active = this.size_active + 10 ;
    this.getChapterActive();
  }

  setPageChapterInactive() {
    // this.page++;
    this.size_inactive = this.size_inactive + 10 ;
    this.getChapterInactive();
  }

  createNewChapter() {
    localStorage.removeItem('lastVersion');
    this.router.navigate(['chapter-dashboard']);
  }

  setChapter(chapter: Chapter) {
    this.chapterService.setChapter(chapter);
    // this.router.navigate(['chapter-details']);
  }

  changeStatus(event) {
    if (event) {
      this.getChapters();
      this.getChapterActive();
      this.getChapterInactive();
    }
  }
}
