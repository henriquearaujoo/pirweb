import { Response } from '@angular/http';
import { TemplateItem } from './../../../models/templateItem';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Chapter } from '../../../models/chapter';
import { Router } from '@angular/router';
import { ChapterService } from '../../../services/chapter/chapter.service';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { TemplateChapterComponent } from '../template-chapter.component';

@Component({
  selector: 'app-template-chapter-item',
  templateUrl: './template-chapter-item.component.html',
  styleUrls: ['./template-chapter-item.component.css',
              '../../../../../node_modules/materialize-css/dist/css/materialize.css']
})
export class TemplateChapterItemComponent implements OnInit {

  @Input() chapter: Chapter;
  @Output() changeStatus = new EventEmitter<boolean>();
  private version: Chapter;
  private response: Response;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

  // @ViewChild('chapter')
  // templateChapter: TemplateChapterComponent;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private toastService: ToastService
  ) {
      this.version = new Chapter();
    }

  ngOnInit() {
    this.getVersions();
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

   getVersions() {
    this.chapterService.getVersionFromChapter(this.chapter.number).subscribe(
      s => {
        this.chapter.versions = s;
        console.log(this.chapter.versions);
      }
    );
   }

  //  changeVersion(chapter: Chapter) {
  //    this.version = chapter;
  //    console.log('Version: ', this.version);
  //  }

   disableAbleVersion(chapter: Chapter) {
    this.version = chapter;
    console.log('Version: ', this.version.status);
    if ( !this.version.status) {
      if (this.version.percentage === 100) {
        if (this.version.status === true) {
          this.version.status = false;
        } else {
          this.version.status = true;
        }
        this.chapterService.update(this.version).subscribe(
          success => {
            if (this.chapter.number === this.version.number) {
              this.chapter.status = this.version.status;
            }
            this.toastService.toastSuccess();
            console.log(success);
          },
          error => console.log(error)
        );
      } else {
        console.log('Version: ', this.version.status);
        this.toastService.toastErrorChangeStatus();
      }
    } else {
      this.chapterService.update(this.version).subscribe(
        success => {
          this.chapter.status = success.status;
          this.getVersions();
          this.toastService.toastSuccess();
        },
        error => console.log(error)
      );
    }


   }
}
