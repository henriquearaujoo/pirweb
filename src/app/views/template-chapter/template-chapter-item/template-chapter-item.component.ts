import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { Chapter } from './../../../models/chapter';
import { Response } from '@angular/http';
import { TemplateItem } from './../../../models/templateItem';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChapterService } from '../../../services/chapter/chapter.service';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { TemplateChapterComponent } from '../template-chapter.component';
import { Paginate } from '../../../models/paginate';

@Component({
  selector: 'app-template-chapter-item',
  templateUrl: './template-chapter-item.component.html',
  styleUrls: ['./template-chapter-item.component.css',
              '../../../../../node_modules/materialize-css/dist/css/materialize.min.css']
})
export class TemplateChapterItemComponent implements OnInit, OnDestroy {

  @Input() chapter: Chapter;
  @Output() changeStatus = new EventEmitter<boolean>();
  private paginate: Paginate = new Paginate();
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private currentVersion: Chapter;
  private lastVersion: any;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private toastService: ToastService,
    private permissions: Permissions,
    private loaderService: LoaderService
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/chapter']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );

    this.currentVersion = new Chapter();
    this.getVersions();
   }

   getVersions() {
    this.chapterService.getVersionFromChapter(this.chapter.number).subscribe(
      s => {
        this.paginate = s;
        this.chapter.versions = this.paginate.content;
        for ( let i = 0 ; i < this.chapter.versions.length ; i ++) {
          if ( this.chapter.versions[i].status) {
            this.currentVersion = this.chapter.versions[i];
            break;
          }
          this.currentVersion = this.chapter.versions[i];
        }
        this.lastVersion = this.chapter.versions.length;
      }
    );
   }

   editChapter(chapter: Chapter) {
    localStorage.setItem('_chapterId', chapter.id );
    this.router.navigate(['chapter/chapter-dashboard']);
  }

   addVersion(chapter: Chapter) {
      localStorage.removeItem('_chapterId');
     if (chapter.percentage !== 100) {
       this.toastService.toastMsgWarn('Atenção', 'Você precisa concluir a versão atual do capítulo para adicionar outra versão!');
     } else {
      localStorage.setItem('chapterNumber', chapter.number.toString() );
      localStorage.setItem('lastVersion', this.lastVersion );
      this.router.navigate(['chapter/chapter-dashboard']);
     }
   }

   disableEnableVersion(chapter: Chapter) {
    chapter.thumbnails = [];
    if ( !chapter.status) {
      if (chapter.percentage === 100) {
          chapter.status = true;
          this.chapterService.update(chapter).subscribe(
          success => {
            this.getVersions();
            this.changeStatus.emit(true);
            this.toastService.toastSuccess();
          },
          error => {
            chapter.status = false;
            console.log(error);
          }
        );
      } else {
        this.toastService.toastErrorChangeStatus();
      }
    } else {
      chapter.status = false;
      this.chapterService.update(chapter).subscribe(
        success => {
          this.getVersions();
          this.changeStatus.emit(true);
          this.toastService.toastSuccess();
        },
        error => {
          chapter.status = true;
          console.log(error);
        }
      );
    }
   }

   ngOnDestroy() {
    // localStorage.removeItem('_chapterId');
   }
}
