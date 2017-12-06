import { ToastService } from './../../../../services/toast-notification/toast.service';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Chapter } from '../../../../models/chapter';
import { ChapterService } from '../../../../services/chapter/chapter.service';

@Component({
  selector: 'app-chapter-information',
  templateUrl: './chapter-information.component.html',
  styleUrls: ['./chapter-information.component.css']
})
export class ChapterInformationComponent implements OnInit {

  private chapter: Chapter = new Chapter();
  private estimated_time: number;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private toastService: ToastService) {
  }

  ngOnInit() {
  }

  saveData() {
    this.chapter.family_tasks = 'test family tasks';
    this.chapter.estimated_time = this.estimated_time * 60000;
    this.chapter.time_next_visit = 86400000;
    console.log(this.chapter);
    this.chapterService.saveChapter(this.chapter).subscribe(
      success => {
        this.chapter = success;
        this.toastService.toastSuccess();
      }
    );
    // this.router.navigate(['/template-chapter-option']);
  }

  verifyValidSubmitted(form, field) {
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }
}
