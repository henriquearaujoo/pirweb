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
import { NgProgress } from 'ngx-progressbar';
import { Permissions, RuleState } from '../../helpers/permissions';

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
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private chapterItem: TemplateChapterItemComponent,
    private loaderService: LoaderService,
    private permissions: Permissions
  ) {
      this.page = 0;
      this.size = 10;
      this.size_active = 10;
      this.size_inactive = 10;
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;

  }

  ngOnInit() {
    this.permissions.canActivate('/template-chapter');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.hasdata = false;
    this.getChapters();
  }

  ngOnChanges() {  }

  getChapters() {
    this.loaderService.show();
    if ( this.filter.name == null) {
      this.filter.name = '';
    }
    this.chapterService.getChapters(this.filter.name, this.size).subscribe(
      s1 => {
        this.paginate = s1;
        this.chapters = this.paginate.content;
        this.hasdata = true;
        this.getChapterActive();
        this.getChapterInactive();
        const hash = {};
        this.chapters = this.chapters.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });
        setTimeout(() => {
          this.loaderService.hide();
        }, 500);
      },
      error => {
        console.log('ERROR', error);

        setTimeout(() => {
          this.loaderService.hide();
        }, 500);

        this.hasdata = false;
      }
    );
  }

  getChapterActive() {
    this.loaderService.show();
    this.chapterService.getChapterActive(this.filter.name, this.size_active).subscribe(
      s2 => {
        this.paginate_active = s2;
        this.chapters_active = this.paginate_active.content;
        // Remove duplicates chapters
        const hash = {};
        this.chapters_active = this.chapters_active.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });
        setTimeout(() => {
          this.loaderService.hide();
        }, 500);
      },
      error => {
        console.log('ERROR', error);
        setTimeout(() => {
          this.loaderService.hide();
        }, 500);
      }
    );
  }

  getChapterInactive() {
    this.loaderService.show();
    this.chapterService.getChapterInactive(this.filter.name, this.size_inactive).subscribe(
      s3 => {
        this.paginate_inactive = s3;
        this.chapters_inactive = this.paginate_inactive.content;
        // Remove duplicates chapters
        const hash = {};
        this.chapters_inactive = this.chapters_inactive.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });
        setTimeout(() => {
          this.loaderService.hide();
        }, 500);
      },
      error => {
        console.log('ERROR', error);
        setTimeout(() => {
          this.loaderService.hide();
        }, 500);
      }
    );
  }

  setPage() {
    this.size = this.size + 10 ;
    this.getChapters();
  }

  setPageChapterActive() {
    this.size_active = this.size_active + 10 ;
    this.getChapterActive();
  }

  setPageChapterInactive() {
    this.size_inactive = this.size_inactive + 10 ;
    this.getChapterInactive();
  }

  createNewChapter() {
    localStorage.removeItem('lastVersion');
    this.router.navigate(['chapter-dashboard']);
  }

  setChapter(chapter: Chapter) {
    this.chapterService.setChapter(chapter);
  }

  changeStatus(event) {
    this.getChapters();
    this.getChapterActive();
    this.getChapterInactive();
  }
}
